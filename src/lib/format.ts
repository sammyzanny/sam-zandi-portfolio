/** Human-readable byte count. Whole KB, one decimal MB. */
export function prettyBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Byte length of a data URL's payload, ignoring the header. */
export function dataUrlBytes(dataUrl: string | null): number {
  if (!dataUrl) return 0
  const comma = dataUrl.indexOf(',')
  const payload = comma === -1 ? dataUrl : dataUrl.slice(comma + 1)
  return Math.round(payload.length * 0.75)
}

/** Today as YYYY-MM-DD. */
export function isoDate(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10)
}

/** Turn "annual-report_v2.final.png" into "annual report v2.final". */
export function titleFromFileName(fileName: string): string {
  const withoutExtension = fileName.replace(/\.[^.]+$/, '')
  const spaced = withoutExtension.replace(/[-_]+/g, ' ').trim()
  return spaced || fileName
}

/** Short, collision-resistant enough for a client-side list. */
export function makeId(prefix = 's'): string {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`
}
