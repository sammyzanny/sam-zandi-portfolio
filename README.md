# Sam Zandi portfolio

A single-page portfolio, built as a Vice City night drive. React 18, TypeScript, Vite, CSS
Modules. No UI framework, no utility-class library, no state management library, the page is
small enough not to need them, and saying so is part of the point.

**Live:** https://sammyzanny.github.io/sam-zandi-portfolio/

---

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
```

| Script                 | What it does                                       |
| ---------------------- | -------------------------------------------------- |
| `npm run dev`          | Dev server with HMR                                 |
| `npm run build`        | Type-check, then build a static site into `dist/`   |
| `npm run build:single` | Same, inlined into one `dist-single/index.html`     |
| `npm run preview`      | Serve the last `dist/` build                        |
| `npm run typecheck`    | `tsc -b --noEmit`                                   |
| `npm run lint`         | ESLint over `src` and the config files              |
| `npm test`             | Vitest, once                                        |
| `npm run test:watch`   | Vitest, watching                                    |

## How it is put together

```
src/
  data/          Everything that is content. Edit here, not in components.
    identity.ts    Name, contact links, the pitch paragraph, boot lines
    dossiers.ts    The four "what I actually do" files, with their evidence
    fieldNotes.ts  Opinion pieces, each with a draft flag
    record.ts      Roles, projects (TownCert first), skills (resume groups, verbatim), education
    samples.ts     Curated work samples: the Citi loan flow, screen by screen
    samples.json   Uploads exported from the page and committed back
    terminal.ts    Terminal commands
    sections.ts    Nav stations
  assets/samples/  The screenshots behind samples.ts (JPEG, ≤1500px, ≤380 KB)
  components/    One folder per component: Component.tsx + Component.module.css
  hooks/         useSamples, useReducedMotion, useTypedLines
  lib/           Pure helpers, formatting, image compression, the sample store
  styles/        tokens.css (every colour and type decision) + global.css
```

Two rules keep this legible:

1. **Content lives in `src/data`.** No component holds a hard-coded fact about Sam. The terminal
   builds its answers from the same objects the sections render, so the two cannot drift apart.
2. **Colour lives in `src/styles/tokens.css`.** No component file contains a hex value. Change the
   palette in one place and the whole page follows.

## The page argues, then proves

Section order is deliberate. The dossiers say what Sam does in his own words and put the matching
resume lines in a column beside them, so a sceptical reader can check the prose against the
record without leaving the card. The chronological job history sits near the bottom, where a
reference belongs.

## Field notes

`src/data/fieldNotes.ts` holds three short opinion pieces written from Sam's work rather than
copied off his resume. Each has a `draft` flag: while it is `true`, the card shows a badge and
the section shows a banner, so an unreviewed note never goes in front of a reader quietly. All
three are currently approved. Flip the flag back on while rewriting one.

## Work samples

Two kinds live in the same section.

**The switch.** `PUBLIC_SAFE` at the top of `src/data/samples.ts` decides how much of the Citi
flow ships as screenshots. The line is the credit check. `true` (the default) shows the
pre-decision flow, steps 01 through 07 ending at Review and apply, and describes the five
post-approval screens in a text panel; `false` shows all twelve. With the flag on, the withheld
images are not referenced anywhere, and a small plugin in `vite.config.ts` prunes unreferenced
images from the build, so they do not ship to a static host either, even as orphan files. Flip
it, rebuild, redeploy.

**Curated** samples are code: `src/data/samples.ts` imports each screenshot from
`src/assets/samples/` and pairs it with a title, a caption and (for the loan tuner) a longer
story. They render first, the featured one full-width. To change the set, edit that file. Vite
hashes the images in a normal build and inlines them in the single-file build, so the same
source works on both hosts. Curated samples cannot be removed from the page, only from source.

**Uploaded** samples come from the **+ Add sample** control. A dropped image is downscaled until
it fits 380 KB; non-images under 520 KB embed as-is; anything larger becomes a link card. Where
an upload *persists* depends on where the page runs:

| Host                                     | Behaviour                                                                                   |
| ---------------------------------------- | ------------------------------------------------------------------------------------------- |
| Published as a Claude Artifact           | Saving republishes the page with the upload embedded. Everyone with the link sees it.         |
| Vercel / Netlify / Pages / `npm run dev` | Uploads live for the browsing session. Use **Export JSON** and commit the file (see below).  |

To make uploads permanent on a static host, click **Export JSON**, replace
`src/data/samples.json` with the download, and redeploy. The export never includes the curated
set, so the file stays small. Budgets are in `src/lib/samples.ts`.

## Deploying

**Vercel / Netlify**, build command `npm run build`, publish directory `dist`. Nothing else.

**GitHub Pages**, set `base` in `vite.config.ts` to `'/<repo-name>/'`, then publish `dist`.

**As a Claude Artifact**, `npm run build:single`, then publish `dist-single/index.html`. That
build inlines the CSS, JS and images into one document, which is what makes the self-republishing
upload store work.

## Tests

```bash
npm test
```

Covers the formatting helpers, the terminal's command routing and tab completion, the HTML
rewrite that persists uploads (including that a caption cannot break out of its own `<script>`
tag), the curated/uploaded split, the Work Samples section's ordering, and the Terminal component
end to end, typing, history, completion, `clear`.

## Fonts

Monoton for the wordmark, Archivo for everything readable, JetBrains Mono for anything that
behaves like data. Loaded from Google Fonts in `index.html`, each with a real fallback stack.
