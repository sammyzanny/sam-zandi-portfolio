export const IDENTITY = {
  /** The wordmark. Short form on purpose, it has to read at 100px. */
  wordmark: 'SAM ZANDI',
  legalName: 'Samuel C. Zandi',
  role: 'Full Stack Software Engineer',
  city: 'Steger, Illinois 60475',
  phone: '(708) 979-7968',
  phoneHref: 'tel:+17089797968',
  email: 'samuelczandi@gmail.com',
  github: 'https://github.com/sammyzanny',
  blog: 'https://medium.com/@samuelczandi',
  linkedin: 'https://www.linkedin.com/in/samuel-zandi/',
} as const

/** The one-paragraph version, written to be read out loud. */
export const PITCH =
  "I spent five years on Citi's loan application platform. Java and " +
  'Spring Boot on the backend, Angular and TypeScript on the frontend, ' +
  "and a physics degree before any of it. I'm comfortable with the parts " +
  "of the job that don't demo well: migrating a test suite, chasing a " +
  "production bug that won't reproduce locally, getting a new developer " +
  'up to speed.'

/** Boot lines for the CRT panel in the hero. Kept short, the page
 *  underneath is fully rendered while this types. */
export const BOOT_LINES = [
  'VICE-OS 5.1  (C) 1986',
  'CPU ............ OK',
  'MEMORY ......... 640K OK',
  'DISPLAY ........ CRT / NEON',
  'MOUNTING /dev/sam ... OK',
] as const
