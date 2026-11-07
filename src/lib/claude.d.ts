/**
 * Minimal typings for the Claude artifact runtime.
 *
 * When this page is published as a Claude Artifact, the host injects
 * `window.claude`. `use('artifact')` resolves a namespace whose
 * `publish(html)` replaces the live page with a new version, which is
 * how work samples persist there.
 *
 * On any other host (Vercel, Netlify, GitHub Pages, `npm run dev`)
 * `window.claude` is simply absent, and the sample store falls back to
 * session-local storage. See `src/lib/sampleStore.ts`.
 */
export interface ArtifactNamespace {
  publish(html: string): Promise<{ version: string }>
}

export interface DownloadsNamespace {
  save(request: { filename: string; data: string | Blob }): Promise<{ status: string }>
}

export interface ClaudeRuntime {
  use(name: 'artifact'): Promise<ArtifactNamespace | null>
  use(name: 'downloads'): Promise<DownloadsNamespace | null>
  use(name: string): Promise<unknown | null>
}

declare global {
  interface Window {
    claude?: ClaudeRuntime
  }
}
