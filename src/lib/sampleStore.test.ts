import { describe, expect, it } from 'vitest'

import type { WorkSample } from '../types'
import { CURATED_SAMPLES, DESCRIBED_STEPS, PUBLIC_SAFE } from '../data/samples'

import { loadSamples, uploadedOnly, withSamples } from './sampleStore'

const sample: WorkSample = {
  id: 's1',
  title: 'Loan dashboard',
  note: 'Angular rewrite of the applicant summary.',
  link: '',
  kind: 'image',
  fileName: 'dashboard.png',
  mime: 'image/png',
  size: 12345,
  data: 'data:image/jpeg;base64,AAAA',
  added: '2026-09-03',
}

const page = (body: string) => `<!doctype html><html><body>${body}</body></html>`

describe('withSamples', () => {
  it('replaces the inline data block', () => {
    const html = page('<script id="samples-data" type="application/json">[]</script>')
    const next = withSamples(html, [sample])

    expect(next).not.toBeNull()
    expect(next).toContain('Loan dashboard')
    expect(next).toContain('<script id="samples-data" type="application/json">')
    expect(next).toContain('</script></body>')
  })

  it('escapes angle brackets so the payload cannot close its own tag', () => {
    const hostile: WorkSample = {
      ...sample,
      note: '</script><script>alert(1)</script>',
    }
    const html = page('<script id="samples-data" type="application/json">[]</script>')

    const next = withSamples(html, [hostile])

    expect(next).toContain('\\u003c/script')
    expect(next?.match(/<script/g)).toHaveLength(1)
  })

  it('returns null when the page has no data block to write into', () => {
    expect(withSamples(page('<p>nothing here</p>'), [sample])).toBeNull()
  })

  it('round-trips through JSON.parse', () => {
    const html = page('<script id="samples-data" type="application/json">[]</script>')
    const next = withSamples(html, [sample]) ?? ''
    const json = next.slice(next.indexOf('json">') + 6, next.indexOf('</script>'))

    expect(JSON.parse(json)).toEqual([sample])
  })
})

describe('curated vs uploaded', () => {
  it('ships the curated set first, with the loan tuner featured at the top', () => {
    const list = loadSamples()
    expect(list.length).toBeGreaterThanOrEqual(CURATED_SAMPLES.length)
    expect(list[0]?.featured).toBe(true)
    expect(list[0]?.title).toBe('The loan tuner')
  })

  it('under PUBLIC_SAFE, withholds every non-public screen and describes it instead', () => {
    if (!PUBLIC_SAFE) return
    const shown = CURATED_SAMPLES.map((s) => s.tag ?? '')
    expect(shown.some((t) => t.includes('Step 01'))).toBe(true)
    expect(shown.some((t) => t.includes('Step 02'))).toBe(true)
    expect(shown.some((t) => t.includes('Step 03'))).toBe(true)
    expect(shown.some((t) => t.includes('Step 07'))).toBe(false)
    expect(DESCRIBED_STEPS.map((d) => d.step)).toEqual([
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ])
  })

  it('every curated sample that claims an image actually has one', () => {
    for (const sample of CURATED_SAMPLES) {
      if (sample.kind === 'image') expect(sample.data).toBeTruthy()
    }
  })

  it('never writes curated samples back to the data block', () => {
    const mixed = [...CURATED_SAMPLES, sample]
    expect(uploadedOnly(mixed)).toEqual([sample])
  })
})
