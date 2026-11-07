/** A link rendered inline inside prose. */
export interface InlineLink {
  text: string
  href: string
}

/** Prose that may contain links. Strings render as text; objects as anchors. */
export type RichText = ReadonlyArray<string | InlineLink>

/** One of the four things Sam actually does, told as a short story. */
export interface Dossier {
  /** Two-digit file number, shown as an eyebrow. */
  id: string
  /** The claim, in his words. */
  title: string
  /** One line that says what the claim costs or is worth. */
  standfirst: string
  /** The story. Paragraphs, some carrying links. */
  body: RichText[]
  /** Hard evidence, revealed beside the prose. Each traces to the resume. */
  evidence: string[]
  /** Tools this work actually ran on. */
  stack: string[]
}

/** A row in the compact chronological record. */
export interface Role {
  title: string
  org: string
  place: string
  start: string
  end: string
  /** One line. The record is a reference, not the argument. */
  summary: string
}

export interface Project {
  name: string
  context: string
  blurb: string
  points: string[]
  links: { label: string; href: string }[]
}

export interface SkillGroup {
  group: string
  items: string[]
}

/** An opinion piece. Written from Sam's work, but not on his resume —
 *  every one ships flagged as a draft until he edits or cuts it. */
export interface FieldNote {
  id: string
  title: string
  dek: string
  body: string[]
  draft: boolean
}

/** Terminal command contract. */
export interface TerminalCommand {
  name: string
  summary: string
  /** Lines to print. `run` receives the raw argument string. */
  run: (args: string) => string[]
  /** Hidden from `help`, but still runnable. */
  secret?: boolean
}

/** How a work sample is stored. */
export type SampleKind =
  /** Image, downscaled and embedded in the page. */
  | 'image'
  /** Small non-image file, embedded as a data URL. */
  | 'file'
  /** Too big to embed — the sample is the link. */
  | 'link'

export interface WorkSample {
  id: string
  title: string
  note: string
  link: string
  kind: SampleKind
  fileName: string
  mime: string
  /** Original file size in bytes, before any downscaling. 0 = unknown. */
  size: number
  /** Image source — a data URL for uploads, a bundled asset URL for
   *  curated samples — or null for a link-only sample. */
  data: string | null
  /** ISO date, YYYY-MM-DD. */
  added: string
  /** Render full-width, above the grid, with `story` beside the image. */
  featured?: boolean
  /** Paragraphs for a featured sample. Ignored otherwise. */
  story?: string[]
  /** Short label shown as an eyebrow — a step number, a product name. */
  tag?: string
}
