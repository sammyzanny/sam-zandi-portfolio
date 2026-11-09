import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DESCRIBED_STEPS } from '../../data/samples'

import { WorkSamples } from './WorkSamples'

/** The section resolves its store on mount; wait for that before asserting. */
async function renderSettled() {
  render(<WorkSamples />)
  await screen.findByRole('button', { name: '+ Add sample' })
}

describe('<WorkSamples />', () => {
  it('features the loan tuner above the rest of the flow', async () => {
    await renderSettled()

    const headings = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(headings[0]).toBe('The loan tuner')
    expect(screen.getByText('My page')).toBeInTheDocument()
    expect(screen.getByText(/ALS project/)).toBeInTheDocument()
  })

  it('shows the application flow in step order after the feature', async () => {
    await renderSettled()

    const tags = screen.getAllByText(/Step \d\d/).map((node) => node.textContent ?? '')
    const steps = tags.map((tag) => tag.match(/Step (\d\d)/)?.[1] ?? '')
    // Step 03 is the featured card and comes first; the rest are ascending.
    expect(steps[0]).toBe('03')
    expect(steps.slice(1)).toEqual([...steps.slice(1)].sort())
  })

  it('describes withheld steps in words under PUBLIC_SAFE', async () => {
    await renderSettled()
    if (DESCRIBED_STEPS.length === 0) return
    expect(screen.getByText(/in words/)).toBeInTheDocument()
    expect(screen.getByText('Loan note summary')).toBeInTheDocument()
    expect(screen.queryByAltText('Loan note summary')).not.toBeInTheDocument()
    expect(screen.getByAltText('Review and apply')).toBeInTheDocument()
  })

  it('offers no remove control on curated samples', async () => {
    await renderSettled()
    expect(screen.queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument()
  })
})
