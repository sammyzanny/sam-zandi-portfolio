import type { TerminalCommand } from '../types'

import { IDENTITY } from './identity'
import { PROJECTS, ROLES, SKILLS } from './record'

const pad = (label: string, width = 14) => label.padEnd(width, ' ')

/**
 * Commands for the in-page terminal.
 *
 * Every response is generated from the same data the rest of the page
 * renders, so the terminal cannot drift out of sync with the sections
 * above it. Add a command by adding an object here; `help` and the
 * tab-completion list both derive from this array.
 */
export const COMMANDS: TerminalCommand[] = [
  {
    name: 'help',
    summary: 'list what this thing understands',
    run: () => [
      'Available commands:',
      '',
      ...COMMANDS.filter((c) => !c.secret).map((c) => `  ${pad(c.name)}${c.summary}`),
      '',
      'Tab completes. Up and Down walk your history.',
    ],
  },
  {
    name: 'whoami',
    summary: 'the short version',
    run: () => [
      `${IDENTITY.legalName}, ${IDENTITY.role}`,
      `${IDENTITY.city}`,
      '',
      'Five years on financial applications at Citi. Java and Spring Boot',
      'on the backend, Angular and TypeScript on the frontend, and an',
      'engineering physics degree before that.',
    ],
  },
  {
    name: 'stack',
    summary: 'what I work in',
    run: () =>
      SKILLS.flatMap((group) => [
        `${group.group.toUpperCase()}`,
        `  ${group.items.join(', ')}`,
        '',
      ]),
  },
  {
    name: 'work',
    summary: 'where I have been',
    run: () =>
      ROLES.flatMap((role) => [
        `${role.start} – ${role.end}   ${role.title}`,
        `                    ${role.org}, ${role.place}`,
        '',
      ]),
  },
  {
    name: 'projects',
    summary: 'things I built',
    run: () =>
      PROJECTS.flatMap((project) => [
        `${project.name} (${project.context})`,
        `  ${project.blurb}`,
        `  ${project.links.map((l) => l.href).join('  ')}`,
        '',
      ]),
  },
  {
    name: 'contact',
    summary: 'how to reach me',
    run: () => [
      `${pad('email')}${IDENTITY.email}`,
      `${pad('phone')}${IDENTITY.phone}`,
      `${pad('github')}${IDENTITY.github}`,
      `${pad('linkedin')}${IDENTITY.linkedin}`,
      `${pad('writing')}${IDENTITY.blog}`,
    ],
  },
  {
    name: 'hire',
    summary: 'what I am looking for',
    run: () => [
      'Open to full stack software engineering roles.',
      '',
      "What I'm looking for: a system I can own end to end, API through",
      'UI through deploy, a team that does real code review, and room to',
      'fix the unglamorous things.',
      '',
      `Start here → ${IDENTITY.email}`,
    ],
  },
  {
    name: 'echo',
    summary: 'say something back',
    run: (args) => [args || ''],
  },
  {
    name: 'clear',
    summary: 'wipe the screen',
    run: () => [],
  },
  {
    name: 'sudo',
    summary: 'do not',
    secret: true,
    run: () => [
      'Nice try. This user is not in the sudoers file.',
      'The incident has been reported.',
    ],
  },
  {
    name: 'vice',
    summary: 'set the mood',
    secret: true,
    run: () => [
      '  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄',
      '   the sun is going down',
      '   the grid goes on forever',
      '   ship something',
      '  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄',
    ],
  },
]

export const COMMAND_NAMES = COMMANDS.map((c) => c.name)

/** Resolve one input line to output lines. Returns null for `clear`. */
export function runCommand(input: string): string[] | null {
  const trimmed = input.trim()
  if (!trimmed) return []

  const [head = '', ...rest] = trimmed.split(/\s+/)
  const name = head.toLowerCase()
  const command = COMMANDS.find((c) => c.name === name)

  if (!command) {
    return [`${name}: command not found. Try \`help\`.`]
  }
  if (command.name === 'clear') {
    return null
  }
  return command.run(rest.join(' '))
}

/** Longest common completion for a partial command, or null. */
export function completeCommand(partial: string): string | null {
  const value = partial.trim().toLowerCase()
  if (!value) return null
  const matches = COMMAND_NAMES.filter((n) => n.startsWith(value))
  const first = matches[0]
  if (!first) return null
  if (matches.length === 1) return first

  let prefix = first
  for (const match of matches) {
    while (!match.startsWith(prefix)) {
      prefix = prefix.slice(0, -1)
    }
  }
  return prefix.length > value.length ? prefix : null
}
