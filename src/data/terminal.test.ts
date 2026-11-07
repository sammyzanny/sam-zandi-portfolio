import { describe, expect, it } from 'vitest'

import { COMMAND_NAMES, completeCommand, runCommand } from './terminal'
import { IDENTITY } from './identity'

describe('runCommand', () => {
  it('returns nothing for an empty line', () => {
    expect(runCommand('   ')).toEqual([])
  })

  it('signals a clear with null rather than empty output', () => {
    expect(runCommand('clear')).toBeNull()
  })

  it('is case-insensitive on the command name', () => {
    expect(runCommand('WhoAmI')?.[0]).toContain(IDENTITY.legalName)
  })

  it('passes arguments through to the command', () => {
    expect(runCommand('echo ship it')).toEqual(['ship it'])
  })

  it('reports unknown commands without throwing', () => {
    expect(runCommand('deploy --prod')?.[0]).toContain('command not found')
  })

  it('builds contact output from the identity data, not a literal', () => {
    const output = runCommand('contact')?.join('\n') ?? ''
    expect(output).toContain(IDENTITY.email)
    expect(output).toContain(IDENTITY.github)
  })

  it('lists every non-secret command in help', () => {
    const help = runCommand('help')?.join('\n') ?? ''
    expect(help).toContain('whoami')
    expect(help).not.toContain('sudo')
  })

  it('includes the ALS project in projects', () => {
    expect(runCommand('projects')?.join('\n')).toContain('ALS')
  })
})

describe('completeCommand', () => {
  it('completes a unique prefix', () => {
    expect(completeCommand('who')).toBe('whoami')
  })

  it('returns null when several match and share nothing further', () => {
    // Both `contact` and `clear` start with "c".
    expect(completeCommand('c')).toBeNull()
  })

  it('returns null for an empty or unmatched prefix', () => {
    expect(completeCommand('')).toBeNull()
    expect(completeCommand('zzz')).toBeNull()
  })

  it('never suggests a name that is not a real command', () => {
    const completion = completeCommand('pro')
    expect(completion === null || COMMAND_NAMES.includes(completion)).toBe(true)
  })
})
