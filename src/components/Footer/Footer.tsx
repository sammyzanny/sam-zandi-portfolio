import { IDENTITY } from '../../data/identity'

import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.sign}>{IDENTITY.wordmark}</span>
      <p className={styles.line}>
        <a href={`mailto:${IDENTITY.email}`}>{IDENTITY.email}</a> ·{' '}
        <a href={IDENTITY.phoneHref}>{IDENTITY.phone}</a> ·{' '}
        <a href={IDENTITY.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>{' '}
        ·{' '}
        <a href={IDENTITY.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </p>
      <p className={styles.colophon}>
        React 18, TypeScript and Vite. CSS Modules over a single token file, no UI framework, no
        utility classes. Monoton, Archivo and JetBrains Mono. Readable on a phone.
      </p>
    </footer>
  )
}
