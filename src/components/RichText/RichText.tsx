import { Fragment } from 'react'

import type { RichText as RichTextValue } from '../../types'

/** Render a paragraph that may contain links, as authored in the data files. */
export function RichText({ value }: { value: RichTextValue }) {
  return (
    <>
      {value.map((part, index) =>
        typeof part === 'string' ? (
          <Fragment key={index}>{part}</Fragment>
        ) : (
          <a key={index} href={part.href} target="_blank" rel="noopener noreferrer">
            {part.text}
          </a>
        ),
      )}
    </>
  )
}
