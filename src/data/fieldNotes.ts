import type { FieldNote } from '../types'

/**
 * Opinion pieces. These are NOT on Sam's resume.
 *
 * They were drafted from his actual work — the Jest migration, the
 * Splunk triage, the physics degree, the AI tooling on his skills line —
 * and written in first person so they read as his. Every one ships with
 * `draft: true`, which renders a visible badge on the card and a banner
 * on the section. Sam edits or deletes each note and flips the flag;
 * nothing here should go in front of a recruiter unread.
 *
 * To publish one: edit the body, set `draft: false`.
 * To cut one: delete the object.
 */
export const FIELD_NOTES: FieldNote[] = [
  {
    id: 'suite-migration',
    title: 'A test suite migration is a code review in disguise',
    dek: 'What 150 components tell you when you are forced to read all of them.',
    body: [
      'Converting a test suite from Karma to Jest sounds like a find-and-replace with extra steps. It is not. To move a test you have to understand what it was actually asserting, and a surprising number of tests assert that the code does what it does rather than what it should.',
      'Copilot drafted most of my conversions. That part was fast. The slow part — the valuable part — was reading each one and deciding whether the assertion deserved to survive the trip. Some did not. A few tests were passing because a mock returned undefined and the component happened to tolerate it.',
      'You cannot get that from a dashboard. You get it from being forced to walk the whole codebase with a reason to look closely, which is the real argument for doing a migration by hand instead of by script.',
    ],
    draft: true,
  },
  {
    id: 'physics-debugging',
    title: 'Physics gave me a debugging habit',
    dek: 'Form a model, predict what it produces, go check. Repeat.',
    body: [
      'An engineering physics degree does not teach you Spring Boot. It teaches you that when a system misbehaves, staring at it harder is not a technique.',
      'The habit is: write down what you believe is happening, work out what that belief predicts you would see in the logs, then go look. If the prediction holds you have narrowed it. If it does not, you have learned something more useful than a fix.',
      'This is why I am comfortable in Splunk at hour three of an incident. The search query is a hypothesis. Most of them are wrong, and that is fine, as long as each one is wrong in a way that eliminates something.',
    ],
    draft: true,
  },
  {
    id: 'ai-tooling',
    title: 'The model writes the diff. You still own it.',
    dek: 'On using Copilot, Devin and Claude in a regulated codebase.',
    body: [
      'I use AI tooling daily and I would not give it up. On the Jest migration it turned a month of mechanical typing into a week of reading, which is a much better use of a person.',
      'But financial software has an auditor at the end of it, and "the assistant generated it" is not a defence anyone has ever accepted. Everything I merge, I can explain line by line. If I cannot, it does not merge, however confident the suggestion looked.',
      'The failure mode I watch for is not bad code. It is plausible code — a diff that reads correctly, passes the tests, and quietly changes a behaviour nobody asked to change.',
    ],
    draft: true,
  },
]
