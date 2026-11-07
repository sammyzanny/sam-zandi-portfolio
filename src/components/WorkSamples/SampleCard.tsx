import type { WorkSample } from '../../types'
import { prettyBytes } from '../../lib/format'

import styles from './SampleCard.module.css'

interface Props {
  sample: WorkSample
  /** Render the remove control (management mode only). */
  editable: boolean
  onRemove: (id: string) => void
}

function extensionOf(fileName: string): string {
  const parts = fileName.split('.')
  const last = parts.length > 1 ? parts[parts.length - 1] : undefined
  return (last ?? 'link').toUpperCase()
}

function Meta({ sample, editable, onRemove }: Props) {
  return (
    <div className={styles.meta}>
      <span>{sample.added}</span>
      {sample.size ? <span>{prettyBytes(sample.size)}</span> : null}
      {sample.link ? (
        <a className={styles.mini} href={sample.link} target="_blank" rel="noopener noreferrer">
          Open ↗
        </a>
      ) : null}
      {sample.kind === 'file' && sample.data ? (
        <a className={styles.mini} href={sample.data} download={sample.fileName}>
          Download
        </a>
      ) : null}
      {editable ? (
        <button
          type="button"
          className={`${styles.mini} ${styles.danger}`}
          onClick={() => onRemove(sample.id)}
        >
          Remove
        </button>
      ) : null}
    </div>
  )
}

/** Full-width card: the whole screenshot beside its story. */
function FeaturedCard(props: Props) {
  const { sample } = props
  return (
    <article className={styles.feature}>
      <div className={styles.featureShotWrap}>
        {sample.data ? (
          <img className={styles.featureShot} src={sample.data} alt={sample.title} />
        ) : null}
      </div>
      <div className={styles.featureBody}>
        <div className={styles.featureEyebrow}>
          <span className={styles.flag}>My page</span>
          {sample.tag ? <span className={styles.tag}>{sample.tag}</span> : null}
        </div>
        <h3 className={styles.featureTitle}>{sample.title}</h3>
        {sample.note ? <p className={styles.featureNote}>{sample.note}</p> : null}
        {sample.story?.length ? (
          <div className={styles.story}>
            {sample.story.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        ) : null}
        <Meta {...props} />
      </div>
    </article>
  )
}

export function SampleCard(props: Props) {
  const { sample } = props
  if (sample.featured) return <FeaturedCard {...props} />

  const media =
    sample.kind === 'image' && sample.data ? (
      <img className={styles.shot} src={sample.data} alt={sample.title} loading="lazy" />
    ) : (
      <div className={styles.fileIcon} aria-hidden="true">
        {extensionOf(sample.fileName)}
      </div>
    )

  return (
    <article className={styles.card}>
      {media}
      <div className={styles.body}>
        {sample.tag ? <span className={styles.tag}>{sample.tag}</span> : null}
        <h3 className={styles.title}>{sample.title}</h3>
        {sample.note ? <p className={styles.note}>{sample.note}</p> : null}
        <Meta {...props} />
      </div>
    </article>
  )
}
