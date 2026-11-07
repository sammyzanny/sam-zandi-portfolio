import { DOSSIERS } from '../../data/dossiers'
import { RichText } from '../RichText/RichText'
import { SectionHead } from '../SectionHead/SectionHead'

import styles from './Dossiers.module.css'

/**
 * The argument of the page: four things Sam does, in his own words, each
 * paired with the resume lines the prose is built from. The claims and
 * their evidence sit side by side on purpose, a reader who distrusts
 * portfolio prose can check it without leaving the card.
 */
export function Dossiers() {
  return (
    <section id="dossiers">
      <SectionHead
        eyebrow="WRK 88.1"
        title="What I actually do"
        note="Four files. On the left, how I'd describe the work. On the right, the same work as it appears on my resume, unedited."
      />

      <div className={styles.list}>
        {DOSSIERS.map((dossier) => (
          <article className={styles.card} key={dossier.id}>
            <div className={styles.main}>
              <span className={styles.fileNo}>FILE {dossier.id}</span>
              <h3 className={styles.title}>{dossier.title}</h3>
              <p className={styles.standfirst}>{dossier.standfirst}</p>
              <div className={styles.body}>
                {dossier.body.map((paragraph, index) => (
                  <p key={index}>
                    <RichText value={paragraph} />
                  </p>
                ))}
              </div>
            </div>

            <aside className={styles.aside}>
              <span className={styles.asideLabel}>From the record</span>
              <ul className={styles.evidence}>
                {dossier.evidence.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <span className={styles.asideLabel}>Ran on</span>
              <div className={styles.stack}>
                {dossier.stack.map((tool) => (
                  <span className={styles.stackItem} key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </aside>
          </article>
        ))}
      </div>
    </section>
  )
}
