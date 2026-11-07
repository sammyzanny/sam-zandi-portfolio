import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { IDENTITY } from '../../data/identity'

import { Terminal } from './Terminal'

describe('<Terminal />', () => {
  it('greets without needing input', () => {
    render(<Terminal />)
    expect(screen.getByRole('log')).toHaveTextContent('interactive resume shell')
  })

  it('runs a typed command and echoes it back', async () => {
    const user = userEvent.setup()
    render(<Terminal />)

    await user.type(screen.getByLabelText('Terminal input'), 'whoami{Enter}')

    const log = screen.getByRole('log')
    expect(log).toHaveTextContent('> whoami')
    expect(log).toHaveTextContent(IDENTITY.legalName)
  })

  it('completes a command with Tab', async () => {
    const user = userEvent.setup()
    render(<Terminal />)

    const input = screen.getByLabelText<HTMLInputElement>('Terminal input')
    await user.type(input, 'hir')
    await user.tab()

    expect(input).toHaveValue('hire')
  })

  it('recalls the previous command with ArrowUp', async () => {
    const user = userEvent.setup()
    render(<Terminal />)

    const input = screen.getByLabelText<HTMLInputElement>('Terminal input')
    await user.type(input, 'stack{Enter}')
    expect(input).toHaveValue('')

    await user.type(input, '{ArrowUp}')
    expect(input).toHaveValue('stack')
  })

  it('empties the screen on clear', async () => {
    const user = userEvent.setup()
    render(<Terminal />)

    const input = screen.getByLabelText('Terminal input')
    await user.type(input, 'clear{Enter}')

    expect(screen.getByRole('log')).not.toHaveTextContent('interactive resume shell')
  })

  it('runs a shortcut button without typing', async () => {
    const user = userEvent.setup()
    render(<Terminal />)

    await user.click(screen.getByRole('button', { name: 'contact' }))

    expect(screen.getByRole('log')).toHaveTextContent(IDENTITY.email)
  })
})
