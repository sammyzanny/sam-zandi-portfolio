import type { WorkSample } from '../types'

import exported from './samples.json'

import welcome from '../assets/samples/01-welcome.jpg'
import personalInformation from '../assets/samples/02-personal-information.jpg'
import loanTuner from '../assets/samples/03-loan-tuner.jpg'

/**
 * Curated work samples: the Citi Personal Loan application, screen by
 * screen, in the order an applicant sees it.
 *
 * THE SWITCH. `PUBLIC_SAFE` decides how much of the flow ships as
 * screenshots.
 *
 *   true   Only screens a visitor to the public Citi URL can reach
 *          without an account (Welcome, Personal information) plus the
 *          loan tuner — the centrepiece — appear as images. The rest of
 *          the flow is described in words in a panel below them, and
 *          those images are not referenced, so a production build does
 *          not bundle them.
 *
 *   false  All twelve screens appear as images — provided the nine
 *          withheld ones are present in `src/assets/samples/withheld/`.
 *          That folder is git-ignored; keep the files locally.
 *
 * Flip it, rebuild, redeploy. Nothing else changes.
 *
 * Images live in `src/assets/samples` and are imported so Vite handles
 * them — hashed files in a normal build, inlined in the single-file
 * build. Anything the page's own upload control adds and exports lands
 * in `samples.json`; the store appends it after these.
 */
export const PUBLIC_SAFE = true

const CITI = 'Citi® Personal Loan'
const ADDED = '2026-11-07'

interface Step {
  step: string
  title: string
  note: string
  fileName: string
  /** Reachable on the public Citi URL without an account. */
  public: boolean
}

/**
 * Screenshots for the public steps are imported above and always
 * bundled. Screenshots for the withheld steps live in
 * `src/assets/samples/withheld/` — a folder that is git-ignored, so the
 * public repository never contains them — and are picked up by the glob
 * below only when PUBLIC_SAFE is off. With the flag on, this folds to an
 * empty object at build time and nothing from that folder is bundled.
 * Files are matched to steps by their two-digit prefix (`07-*.jpg`).
 */
const WITHHELD: Record<string, string> = PUBLIC_SAFE
  ? {}
  : Object.fromEntries(
      Object.entries(
        import.meta.glob<string>('../assets/samples/withheld/*.jpg', {
          eager: true,
          import: 'default',
        }),
      ).map(([path, url]) => [path.split('/').pop()?.slice(0, 2) ?? '', url]),
    )

const IMAGES: Record<string, string> = {
  '01': welcome,
  '02': personalInformation,
  ...WITHHELD,
}

const STEPS: Step[] = [
  {
    step: '01',
    title: 'Welcome',
    note: 'Invitation code or application ID plus the last four of the SSN. The only two things we ask for before showing an offer.',
    fileName: '01-welcome.jpg',
    public: true,
  },
  {
    step: '02',
    title: 'Personal information',
    note: 'Name, SSN and date of birth, with inline validation. Part of the Pre-Login Experience work: nothing here requires an account.',
    fileName: '02-personal-information.jpg',
    public: true,
  },
  {
    step: '04',
    title: 'Contact information',
    note: 'Email, phones and address, including the P.O. Box path and the "no mobile number" fallback.',
    fileName: '04-contact-information.jpg',
    public: false,
  },
  {
    step: '05',
    title: 'Financial information',
    note: 'Annual income, non-taxable income and housing payment — the three inputs underwriting actually needs.',
    fileName: '05-financial-information.jpg',
    public: false,
  },
  {
    step: '06',
    title: 'Citizenship',
    note: 'Residency status. One field, its own step, because the branching behind it is not small.',
    fileName: '06-citizenship.jpg',
    public: false,
  },
  {
    step: '07',
    title: 'Review and apply',
    note: 'The chosen terms restated, the full disclosure set, and the two consents that have to be checked before Apply goes live.',
    fileName: '07-review-and-apply.jpg',
    public: false,
  },
  {
    step: '08',
    title: 'Approved',
    note: 'The decision screen. Link a bank account for the fastest funding, or take a check by mail.',
    fileName: '08-approved.jpg',
    public: false,
  },
  {
    step: '09',
    title: 'AutoPay setup',
    note: 'The 0.5% discount applied live in the summary bar when the enrollment box is checked.',
    fileName: '09-autopay.jpg',
    public: false,
  },
  {
    step: '10',
    title: 'Loan note summary',
    note: 'Truth-in-lending figures beside an embedded preview of the note itself. Accept stays disabled until the confirmation is checked.',
    fileName: '10-loan-note.jpg',
    public: false,
  },
  {
    step: '11',
    title: 'Online access',
    note: 'User ID and password creation with the rules shown up front rather than as errors afterward.',
    fileName: '11-online-access.jpg',
    public: false,
  },
  {
    step: '12',
    title: 'All set',
    note: 'Confirmation with the funding method, the mailing address, and what to do if the check does not arrive.',
    fileName: '12-all-set.jpg',
    public: false,
  },
]

const toSample = (s: Step): WorkSample => ({
  id: `citi-${s.fileName.replace(/\.jpg$/, '')}`,
  title: s.title,
  note: s.note,
  link: '',
  kind: 'image',
  fileName: s.fileName,
  mime: 'image/jpeg',
  size: 0,
  data: IMAGES[s.step] ?? null,
  added: ADDED,
  tag: `${CITI} · Step ${s.step}`,
})

const LOAN_TUNER: WorkSample = {
  id: 'citi-03-loan-tuner',
  title: 'The loan tuner',
  note: 'The page where an applicant picks an amount, a term, and whether to enroll in AutoPay — and sees the exact monthly payment for each combination.',
  link: '',
  kind: 'image',
  fileName: '03-loan-tuner.jpg',
  mime: 'image/jpeg',
  size: 0,
  data: loanTuner,
  added: ADDED,
  tag: `${CITI} · Step 03`,
  featured: true,
  story: [
    'This was my page. Earlier in my career at Citi, the loan tuner was the screen I owned — the one place in the application where the applicant is actually making a financial decision rather than filling in a form, so every number on it has to be right.',
    'For a long time the numbers were almost right. The frontend calculated the monthly payment for each term on its own, and the backend calculated it again when the application was submitted. The two did not always agree. A rounding difference, a rate-discount edge case, a term the frontend math handled slightly differently — small gaps, but on a loan offer a small gap is a wrong number.',
    'The ALS project fixed that at the root. Instead of computing payments in the browser, the page now calls the backend every time the loan amount changes and gets back the exact monthly payment for every available term, from the same code that will eventually book the loan. The frontend displays; it no longer calculates.',
    'That meant wiring up the new backend call, but it also meant the loan-term data arrived in a completely different shape than the page had been built around. So the ALS work became a full redesign and cleanup of the tuner: new data model, new component structure, the AutoPay toggle and the term cards rebuilt to render straight from the server response. What shipped is the page in this screenshot.',
  ],
}

/** Steps shown as screenshots. */
export const CURATED_SAMPLES: WorkSample[] = [
  LOAN_TUNER,
  ...STEPS.filter((s) => !PUBLIC_SAFE || s.public).map(toSample),
]

/** A step shown in words instead of a screenshot. */
export interface DescribedStep {
  step: string
  title: string
  note: string
}

/** Steps withheld as images under PUBLIC_SAFE, described instead. */
export const DESCRIBED_STEPS: DescribedStep[] = PUBLIC_SAFE
  ? STEPS.filter((s) => !s.public).map(({ step, title, note }) => ({ step, title, note }))
  : []

/** Samples added through the page's upload control and committed back. */
export const EXPORTED_SAMPLES = exported as WorkSample[]

/** Ids of the curated set — never written back to the data block. */
export const CURATED_IDS = new Set(CURATED_SAMPLES.map((sample) => sample.id))
