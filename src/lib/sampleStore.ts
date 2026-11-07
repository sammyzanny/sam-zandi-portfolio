import type { WorkSample } from '../types'

import { CURATED_IDS, CURATED_SAMPLES, EXPORTED_SAMPLES } from '../data/samples'

/** Where the page keeps the sample list between visits. */
export type StoreKind =
  /** Published as a Claude Artifact: saving republishes the page. */
  | 'artifact'
  /** Anywhere else: saving lives for this browsing session only. */
  | 'session'

export interface SaveOutcome {
  persisted: boolean
  message: string
}

export interface SampleStore {
  kind: StoreKind
  /** Whether this visitor is allowed to change the list at all. */
  canEdit: boolean
  save(samples: readonly WorkSample[]): Promise<SaveOutcome>
}

const DATA_SCRIPT_ID = 'samples-data'

/** Only uploads are persisted; the curated set ships with the code. */
export function uploadedOnly(samples: readonly WorkSample[]): WorkSample[] {
  return samples.filter((sample) => !CURATED_IDS.has(sample.id))
}

/**
 * The list for a fresh page load: the curated samples, then whatever
 * the page has saved.
 *
 * Saved samples come from the inline `#samples-data` block first — that
 * is what the artifact store rewrites when it republishes — and fall
 * back to the committed `src/data/samples.json`, which is how uploads
 * get into a statically hosted build.
 */
export function loadSamples(): WorkSample[] {
  let saved: WorkSample[] = EXPORTED_SAMPLES

  if (typeof document !== 'undefined') {
    const node = document.getElementById(DATA_SCRIPT_ID)
    if (node?.textContent) {
      try {
        const parsed: unknown = JSON.parse(node.textContent)
        if (Array.isArray(parsed) && parsed.length > 0) {
          saved = parsed as WorkSample[]
        }
      } catch {
        // Malformed inline data should never take the page down; the
        // committed seed is used instead.
      }
    }
  }

  return [...CURATED_SAMPLES, ...uploadedOnly(saved)]
}

/** Swap the inline data block inside a full HTML document. */
export function withSamples(html: string, samples: readonly WorkSample[]): string | null {
  const json = JSON.stringify(samples).replace(/</g, '\\u003c')
  const pattern = new RegExp(
    `(<script id="${DATA_SCRIPT_ID}" type="application/json">)[\\s\\S]*?(</script>)`,
  )
  if (!pattern.test(html)) return null
  return html.replace(pattern, (_match, open: string, close: string) => open + json + close)
}

/**
 * Fetch the document this page was served as.
 *
 * The live DOM is not usable here — it carries React's output and the
 * host's injected scripts — so we re-request the served HTML instead.
 */
async function servedDocument(): Promise<string> {
  const response = await fetch(window.location.href, { cache: 'no-store' })
  if (!response.ok) throw new Error('Could not re-read the page source.')
  const text = await response.text()
  if (!/<html[\s>]/i.test(text)) throw new Error('That response was not a document.')
  return text
}

const SAVE_ERRORS: Record<string, string> = {
  not_writer: 'You are viewing a read-only copy, so samples cannot be saved here.',
  conflict: 'Someone published a newer version. Reload the page and add it again.',
  rate_limited: 'Too many saves in a row. Give it a few seconds.',
  too_large: 'The page would be too large to publish with that file attached.',
}

function sessionStore(): SampleStore {
  return {
    kind: 'session',
    canEdit: true,
    save: async () => ({
      persisted: false,
      message:
        'Kept for this browsing session. Use Export JSON and commit it to src/data/samples.json to keep it.',
    }),
  }
}

/**
 * Pick a store for this environment.
 *
 * On a Claude Artifact the runtime hands us a `publish` call, so saving
 * writes a new version of the page and every open viewer reloads to it.
 * Everywhere else — dev server, Vercel, Netlify, Pages — there is no
 * backend to write to, so edits are session-local by design.
 */
export async function createSampleStore(): Promise<SampleStore> {
  const runtime = typeof window === 'undefined' ? undefined : window.claude
  if (!runtime?.use) return sessionStore()

  const artifact = await runtime.use('artifact').catch(() => null)
  if (!artifact) return sessionStore()

  return {
    kind: 'artifact',
    canEdit: true,
    async save(samples) {
      try {
        const source = await servedDocument()
        const next = withSamples(source, uploadedOnly(samples))
        if (!next) {
          throw new Error('Could not find the sample data block in the page source.')
        }
        await artifact.publish(next)
        return { persisted: true, message: 'Saved. The page is reloading to the new version.' }
      } catch (error: unknown) {
        const code =
          typeof error === 'object' && error !== null && 'code' in error
            ? String((error as { code: unknown }).code)
            : ''
        const fallback = error instanceof Error ? error.message : 'Saving failed.'
        return { persisted: false, message: SAVE_ERRORS[code] ?? fallback }
      }
    },
  }
}
