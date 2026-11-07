import type { WorkSample } from '../types'

import { dataUrlBytes, isoDate, makeId, prettyBytes, titleFromFileName } from './format'

/** Embedded images are downscaled until they fit this. */
export const MAX_IMAGE_BYTES = 380 * 1024
/** Non-image files above this are stored as a link instead. */
export const MAX_FILE_BYTES = 520 * 1024
/** Ceiling for the whole collection, so a published page stays servable. */
export const MAX_TOTAL_BYTES = 6.5 * 1024 * 1024

export function readAsDataUrl(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('That file could not be read.'))
    reader.readAsDataURL(file)
  })
}

interface CompressedImage {
  dataUrl: string
  width: number
  height: number
}

/**
 * Downscale and re-encode an image until it fits `MAX_IMAGE_BYTES`.
 *
 * Quality drops first (it costs less visually than losing pixels); once
 * quality bottoms out at 0.5 the canvas shrinks instead. Returns null if
 * the browser cannot decode the file at all.
 */
export async function compressImage(file: Blob): Promise<CompressedImage | null> {
  const sourceUrl = await readAsDataUrl(file)

  const image = await new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = sourceUrl
  })

  if (!image) return null

  const maxDimension = 1500
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height))
  let width = Math.max(1, Math.round(image.width * scale))
  let height = Math.max(1, Math.round(image.height * scale))
  let quality = 0.84
  let dataUrl = sourceUrl

  for (let pass = 0; pass < 7; pass += 1) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) break

    // Flatten transparency onto the page ground so PNGs with alpha do
    // not become black rectangles once re-encoded as JPEG.
    context.fillStyle = '#0a0416'
    context.fillRect(0, 0, width, height)
    context.drawImage(image, 0, 0, width, height)

    dataUrl = canvas.toDataURL('image/jpeg', quality)
    if (dataUrlBytes(dataUrl) <= MAX_IMAGE_BYTES) break

    if (quality > 0.5) {
      quality -= 0.12
    } else {
      width = Math.round(width * 0.8)
      height = Math.round(height * 0.8)
    }
  }

  return { dataUrl, width, height }
}

/**
 * Turn a dropped file into a sample.
 *
 * Images are compressed and embedded. Other files are embedded whole if
 * they are small enough. Anything larger becomes a link-only sample, and
 * says so in its note.
 */
export async function sampleFromFile(file: File): Promise<WorkSample> {
  const base = {
    id: makeId(),
    title: titleFromFileName(file.name),
    note: '',
    link: '',
    fileName: file.name,
    mime: file.type || 'application/octet-stream',
    size: file.size,
    added: isoDate(),
  }

  if (file.type.startsWith('image/')) {
    const compressed = await compressImage(file)
    if (compressed) {
      return { ...base, kind: 'image', data: compressed.dataUrl }
    }
    return {
      ...base,
      kind: 'link',
      data: null,
      note: 'This image could not be decoded in the browser — add a link to it instead.',
    }
  }

  if (file.size <= MAX_FILE_BYTES) {
    return { ...base, kind: 'file', data: await readAsDataUrl(file) }
  }

  return {
    ...base,
    kind: 'link',
    data: null,
    note: `Too large to store in the page (${prettyBytes(file.size)}) — add a link to it instead.`,
  }
}

/** Serialized size of the collection. */
export function collectionBytes(samples: readonly WorkSample[]): number {
  const json = JSON.stringify(samples)
  return typeof Blob === 'undefined' ? json.length : new Blob([json]).size
}

/** Would adding this sample blow the budget? */
export function exceedsBudget(samples: readonly WorkSample[], next: WorkSample): boolean {
  return collectionBytes([next, ...samples]) > MAX_TOTAL_BYTES
}
