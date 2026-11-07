import { EDUCATION, ROLES, SKILLS } from '../../data/record'
import { SectionHead } from '../SectionHead/SectionHead'

import styles from './Record.module.css'

/**
 * The chronological record, roles, education, and the skills list.
 *
 * Placed last on purpose. The dossiers make the case; this is the
 * receipt a recruiter checks it against.
 */
export function Record() {
  return (
    <section id="record">
      <SectionHead
        eyebrow="REC 108.1"
        title="The record"
        note="Dates, titles and the full stack list, for anyone who needs the conventional version."
      />

      <div className={styles.rows}>
        {ROLES.map((role) => (
          <div className={styles.row} key={`${role.org}-${role.start}`}>
            <span className={styles.when}>
              {role.start} – {role.end}
            </span>
            <div>
              <h3 className={styles.title}>{role.title}</h3>
              <span className={styles.org}>
                {role.org} · {role.place}
              </span>
              <p className={styles.summary}>{role.summary}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.skillGrid}>
        {SKILLS.map((group) => (
          <div className={styles.skillCell} key={group.group}>
            <h3>{group.group}</h3>
            <div className={styles.tags}>
              {group.items.map((item) => (
                <span className={styles.tag} key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footRow}>
        <article className={styles.panel}>
          <h3>{EDUCATION.degree}</h3>
          <span className={styles.org}>{EDUCATION.school}</span>
          <p>
            GPA {EDUCATION.gpa} · {EDUCATION.place} · {EDUCATION.conferred}
          </p>
        </article>

        <article className={styles.panel}>
          <h3>Research</h3>
          <span className={styles.org}>Professor: {EDUCATION.research.professor}</span>
          <p>
            {EDUCATION.research.line}{' '}
            <a href={EDUCATION.research.href} target="_blank" rel="noopener noreferrer">
              {EDUCATION.research.label}
            </a>
            .
          </p>
        </article>
      </div>
    </section>
  )
}
