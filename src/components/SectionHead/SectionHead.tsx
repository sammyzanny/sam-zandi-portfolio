import type { ReactNode } from 'react'

import styles from './SectionHead.module.css'

interface Props {
  /** Short label above the rule, a station call sign, or a file number. */
  eyebrow: string
  title: string
  /** Optional line of context under the heading. */
  note?: ReactNode
}

export function SectionHead({ eyebrow, title, note }: Props) {
  return (
    <>
      <div className={styles.head}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.line} aria-hidden="true" />
      </div>
      {note ? <p className={styles.note}>{note}</p> : null}
    </>
  )
}
