import { FIELD_NOTES } from '../../data/fieldNotes'
import { SectionHead } from '../SectionHead/SectionHead'

import styles from './FieldNotes.module.css'

/**
 * Opinion pieces that are not on the resume.
 *
 * Anything still flagged `draft` renders a badge, and the section shows
 * a banner while any draft remains. Both disappear on their own once
 * every note in `src/data/fieldNotes.ts` has `draft: false`.
 */
export function FieldNotes() {
  const hasDrafts = FIELD_NOTES.some((note) => note.draft)

  return (
    <section id="notes">
      <SectionHead
        eyebrow="NTS 96.3"
        title="Field notes"
        note="Three opinions about building software, from work I've actually done."
      />

      {hasDrafts ? (
        <p className={styles.banner}>
          <strong>DRAFTS, not yet approved by Sam.</strong> These were written from his work rather
          than copied off his resume. Edit or delete each one in <code>src/data/fieldNotes.ts</code>
          , then set <code>draft: false</code> to clear this banner.
        </p>
      ) : null}

      <div className={styles.grid}>
        {FIELD_NOTES.map((note) => (
          <article className={styles.note} key={note.id}>
            {note.draft ? <span className={styles.badge}>Draft</span> : null}
            <h3 className={styles.title}>{note.title}</h3>
            <p className={styles.dek}>{note.dek}</p>
            <div className={styles.body}>
              {note.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
