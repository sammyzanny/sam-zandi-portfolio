export const IDENTITY = {
  /** The wordmark. Short form on purpose — it has to read at 100px. */
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
  'Five years on a loan application platform that thousands of people ' +
  'use to ask a bank for money. Java and Spring Boot behind it, Angular ' +
  'and TypeScript in front of it, and a physics degree underneath the ' +
  'whole thing. I am good at the unglamorous half of software: the test ' +
  'suite nobody wants to migrate, the production bug that will not ' +
  'reproduce, the new developer who needs four weeks of patience.'

/** Boot lines for the CRT panel in the hero. Kept short — the page
 *  underneath is fully rendered while this types. */
export const BOOT_LINES = [
  'VICE-OS 5.1  (C) 1986',
  'CPU ............ OK',
  'MEMORY ......... 640K OK',
  'DISPLAY ........ CRT / NEON',
  'MOUNTING /dev/sam ... OK',
] as const
