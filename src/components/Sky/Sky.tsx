import styles from './Sky.module.css'

/** One palm, drawn as a silhouette. Trunk plus seven fronds. */
function Palm({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 220 420" fill="none" aria-hidden="true">
      <path
        d="M104 420C104 330 100 260 92 196c-3-24-8-44-14-62 12 14 21 34 27 58 7 28 11 66 13 112"
        fill="currentColor"
      />
      <g fill="currentColor">
        <path d="M78 132c-26-30-52-44-78-42 26-14 56-4 84 30z" />
        <path d="M76 126c-8-38-26-64-52-78 30 2 52 26 62 72z" />
        <path d="M84 122c10-38 32-62 64-72-22 18-38 44-50 80z" />
        <path d="M90 130c30-30 62-42 94-36-30 2-58 16-84 44z" />
        <path d="M92 142c34-14 66-12 94 8-30-8-60-6-88 6z" />
        <path d="M74 144c-30-8-58-4-82 14 20-24 48-32 84-24z" />
        <path d="M82 116c-2-40 6-70 26-90-8 26-12 56-12 92z" />
      </g>
      <circle cx="83" cy="134" r="7" fill="currentColor" />
    </svg>
  )
}

/**
 * The fixed backdrop. Purely decorative, so the whole thing is hidden
 * from assistive technology and sits behind every interactive layer.
 */
export function Sky() {
  return (
    <>
      <div className={styles.sky} aria-hidden="true">
        <div className={styles.sun} />
        <div className={styles.horizon} />
        <div className={styles.floor} />
        <Palm className={`${styles.palm} ${styles.palmLeft}`} />
        <Palm className={`${styles.palm} ${styles.palmRight}`} />
      </div>
      <div className={styles.scanlines} aria-hidden="true" />
    </>
  )
}
