import type { FieldNote } from '../types'

/**
 * Opinion pieces. These are not on Sam's resume; they come from the work
 * behind it (the Jest migration, the Splunk triage, the physics degree,
 * the AI tooling on his skills line).
 *
 * A note with `draft: true` renders a badge on its card and a banner on
 * the section until it is reviewed. All three were approved on
 * 2026-11-07. Set the flag again on any note you rewrite.
 */
export const FIELD_NOTES: FieldNote[] = [
  {
    id: 'suite-migration',
    title: 'A test suite migration is a code review in disguise',
    dek: "What I learned from reading 150 components' worth of tests.",
    body: [
      "Moving a test suite from Karma to Jest sounds like find and replace. It isn't. To move a test you have to understand what it actually asserts, and a surprising number of tests just assert that the code does whatever it currently does.",
      "Copilot generated most of the conversions, and that part was quick. The slow part was reading each one and deciding whether the assertion was worth keeping. Some weren't. A few passed only because a mock returned undefined and the component happened to tolerate it.",
      "You don't find that from a coverage dashboard. You find it by going through the whole codebase with a reason to look closely. That's the real argument for doing a migration by hand rather than with a script.",
    ],
    draft: false,
  },
  {
    id: 'physics-debugging',
    title: 'Physics gave me a debugging habit',
    dek: 'Make a model, predict what it implies, check the logs.',
    body: [
      "An engineering physics degree doesn't teach you Spring Boot. It does teach you that when a system misbehaves, staring harder at it doesn't help.",
      "The habit: write down what you think is happening, figure out what that would look like in the logs, then go look. If the logs match, you've narrowed it down. If they don't, you've learned something more useful than a fix.",
      "That's why I'm fine in Splunk three hours into an incident. Each search is a hypothesis. Most of them are wrong, and that's okay as long as each wrong one rules something out.",
    ],
    draft: false,
  },
  {
    id: 'ai-tooling',
    title: 'The model writes the diff. You still own it.',
    dek: 'Using Copilot, Devin and Claude in a regulated codebase.',
    body: [
      "I use AI tools every day and I wouldn't go back. On the Jest migration they turned weeks of mechanical typing into days of reading, which is a better use of a person.",
      "But financial software gets audited, and \"the assistant generated it\" isn't an explanation anyone accepts. Everything I merge I can explain line by line. If I can't, it doesn't merge, no matter how confident the suggestion looked.",
      "The failure I watch for isn't bad code. It's plausible code: a diff that reads fine, passes the tests, and quietly changes behavior nobody asked to change.",
    ],
    draft: false,
  },
]
