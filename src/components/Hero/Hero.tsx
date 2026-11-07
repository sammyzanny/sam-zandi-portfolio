import { BOOT_LINES, IDENTITY, PITCH } from '../../data/identity'
import { useTypedLines } from '../../hooks/useTypedLines'

import styles from './Hero.module.css'

interface Chip {
  label: string
  href?: string
}

const CHIPS: Chip[] = [
  { label: IDENTITY.city },
  { label: IDENTITY.phone, href: IDENTITY.phoneHref },
  { label: IDENTITY.email, href: `mailto:${IDENTITY.email}` },
  { label: 'GitHub', href: IDENTITY.github },
  { label: 'Writing', href: IDENTITY.blog },
  { label: 'LinkedIn', href: IDENTITY.linkedin },
]

export function Hero() {
  const booted = useTypedLines(BOOT_LINES)

  return (
    <header className={styles.hero} id="top">
      <h1 className={styles.wordmark}>{IDENTITY.wordmark}</h1>
      <p className={styles.role}>{IDENTITY.role}</p>
      <div className={styles.rule} />

      <div className={styles.body}>
        {/* Decorative boot panel. The pitch beside it is readable from
            the first frame, so nothing here gates the content. */}
        <div className={styles.boot} aria-hidden="true">
          {booted.map((line) => (
            <span className={styles.bootLine} key={line}>
              {line}
            </span>
          ))}
          <span className={styles.bootLine}>
            {'> '}
            <span className={styles.caret} />
          </span>
        </div>

        <div className={styles.pitch}>
          <p>{PITCH}</p>
        </div>
      </div>

      <div className={styles.contact}>
        {CHIPS.map((chip) =>
          chip.href ? (
            <a
              key={chip.label}
              className={styles.chip}
              href={chip.href}
              target={chip.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
            >
              <span className={styles.dot} aria-hidden="true" />
              {chip.label}
            </a>
          ) : (
            <span key={chip.label} className={styles.chip}>
              <span className={styles.dot} aria-hidden="true" />
              {chip.label}
            </span>
          ),
        )}
      </div>
    </header>
  )
}
