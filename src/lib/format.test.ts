import { describe, expect, it } from 'vitest'

import { dataUrlBytes, isoDate, prettyBytes, titleFromFileName } from './format'

describe('prettyBytes', () => {
  it('keeps small values in bytes', () => {
    expect(prettyBytes(0)).toBe('0 B')
    expect(prettyBytes(1023)).toBe('1023 B')
  })

  it('rounds kilobytes and gives megabytes one decimal', () => {
    expect(prettyBytes(1024)).toBe('1 KB')
    expect(prettyBytes(1536)).toBe('2 KB')
    expect(prettyBytes(1024 * 1024)).toBe('1.0 MB')
    expect(prettyBytes(2.6 * 1024 * 1024)).toBe('2.6 MB')
  })

  it('returns an empty string rather than NaN for bad input', () => {
    expect(prettyBytes(Number.NaN)).toBe('')
    expect(prettyBytes(-1)).toBe('')
  })
})

describe('dataUrlBytes', () => {
  it('measures the payload, not the header', () => {
    // "hello" base64-encodes to 8 characters -> 6 bytes at 0.75.
    expect(dataUrlBytes('data:text/plain;base64,aGVsbG8=')).toBe(6)
  })

  it('treats a missing value as zero', () => {
    expect(dataUrlBytes(null)).toBe(0)
  })
})

describe('titleFromFileName', () => {
  it('drops the extension and unpicks separators', () => {
    expect(titleFromFileName('loan-app_dashboard.v2.png')).toBe('loan app dashboard.v2')
  })

  it('falls back to the raw name when nothing is left', () => {
    expect(titleFromFileName('.gitignore')).toBe('.gitignore')
  })
})

describe('isoDate', () => {
  it('formats as YYYY-MM-DD', () => {
    expect(isoDate(new Date('2026-09-03T18:20:00Z'))).toBe('2026-09-03')
  })
})
