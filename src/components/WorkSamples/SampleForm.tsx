import type { WorkSample } from '../../types'
import { dataUrlBytes, prettyBytes } from '../../lib/format'

import styles from './SampleForm.module.css'

interface Props {
  sample: WorkSample
  saving: boolean
  onChange: (sample: WorkSample) => void
  onSubmit: () => void
  onCancel: () => void
}

/** Caption a processed file before it joins the collection. */
export function SampleForm({ sample, saving, onChange, onSubmit, onCancel }: Props) {
  const set = <K extends keyof WorkSample>(key: K, value: WorkSample[K]) =>
    onChange({ ...sample, [key]: value })

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      {sample.kind === 'image' && sample.data ? (
        <img className={styles.preview} src={sample.data} alt="" />
      ) : null}

      <div className={styles.field}>
        <label htmlFor="sample-title">Title</label>
        <input
          id="sample-title"
          value={sample.title}
          onChange={(event) => set('title', event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="sample-note">What it shows</label>
        <textarea
          id="sample-note"
          value={sample.note}
          placeholder="One or two lines a recruiter can read at a glance."
          onChange={(event) => set('note', event.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="sample-link">Link (optional)</label>
        <input
          id="sample-link"
          value={sample.link}
          placeholder="https://github.com/sammyzanny/…"
          onChange={(event) => set('link', event.target.value)}
        />
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.primary} disabled={saving}>
          {saving ? 'Saving…' : 'Add to portfolio'}
        </button>
        <button type="button" className={styles.secondary} onClick={onCancel}>
          Cancel
        </button>
        <span className={styles.size}>
          {sample.kind === 'link'
            ? 'Stored as a link'
            : `${prettyBytes(dataUrlBytes(sample.data))} embedded`}
        </span>
      </div>
    </form>
  )
}
