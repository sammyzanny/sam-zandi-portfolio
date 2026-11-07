import { useEffect, useState } from 'react'

import { STATIONS } from '../../data/sections'

import styles from './RadioNav.module.css'

/**
 * The nav, dressed as a car radio.
 *
 * Highlights whichever section is currently crossing the top third of
 * the viewport. Falls back to no highlight where IntersectionObserver is
 * unavailable, the links still work.
 */
export function RadioNav() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    )

    for (const station of STATIONS) {
      const node = document.getElementById(station.id)
      if (node) observer.observe(node)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <nav className={styles.bar} aria-label="Sections">
      <div className={styles.inner}>
        <a className={styles.mark} href="#top">
          ◉ S. ZANDI FM
        </a>
        <div className={styles.dial}>
          {STATIONS.map((station) => (
            <a
              key={station.id}
              className={`${styles.station} ${active === station.id ? styles.active : ''}`}
              href={`#${station.id}`}
              aria-current={active === station.id ? 'true' : undefined}
            >
              <span className={styles.callSign}>{station.callSign}</span>
              <span className={styles.frequency}>{station.frequency}</span>
              <span className="visually-hidden">{station.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
