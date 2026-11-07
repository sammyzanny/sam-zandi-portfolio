import { useRef, useState, type DragEvent } from 'react'

import type { WorkSample } from '../../types'
import { CURATED_IDS, DESCRIBED_STEPS } from '../../data/samples'
import { useSamples } from '../../hooks/useSamples'
import { sampleFromFile } from '../../lib/samples'
import { uploadedOnly } from '../../lib/sampleStore'
import { SectionHead } from '../SectionHead/SectionHead'

import { SampleCard } from './SampleCard'
import { SampleForm } from './SampleForm'
import styles from './WorkSamples.module.css'

/**
 * Evidence locker: the Citi Personal Loan application screen by screen,
 * with the loan tuner featured, plus anything dropped in later.
 *
 * Where uploads persist depends on the host, see `useSamples` and
 * `src/lib/sampleStore.ts`. This component only cares about the file
 * going in and the card coming out.
 */
export function WorkSamples() {
  const { samples, status, saving, storeKind, canEdit, add, remove, setStatus } = useSamples()
  const [managing, setManaging] = useState(false)
  const [pending, setPending] = useState<WorkSample | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)

  const featured = samples.filter((sample) => sample.featured)
  const rest = samples.filter((sample) => !sample.featured)

  /** Curated samples are removed in source, not from the page. */
  const removable = (sample: WorkSample) => managing && canEdit && !CURATED_IDS.has(sample.id)

  async function takeFiles(files: FileList | null) {
    const file = files?.[0]
    if (!file) return

    setStatus({ tone: 'info', text: `Processing ${file.name}…` })
    try {
      setPending(await sampleFromFile(file))
      setStatus(
        files.length > 1
          ? {
              tone: 'info',
              text: 'Took the first file. Drop the rest one at a time so each keeps its own caption.',
            }
          : null,
      )
    } catch (error) {
      setStatus({
        tone: 'error',
        text: error instanceof Error ? error.message : 'That file could not be read.',
      })
    }
  }

  function onDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault()
    setDragOver(false)
    void takeFiles(event.dataTransfer.files)
  }

  async function commitPending() {
    if (!pending) return
    const cleaned: WorkSample = {
      ...pending,
      title: pending.title.trim() || 'Untitled sample',
      note: pending.note.trim(),
      link: pending.link.trim(),
    }
    setPending(null)
    await add(cleaned)
  }

  /** Only uploads are exported, the curated set lives in source. */
  function exportJson() {
    const text = JSON.stringify(uploadedOnly(samples), null, 2)
    const blob = new Blob([text], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'work-samples.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const uploadedCount = uploadedOnly(samples).length

  return (
    <section id="samples">
      <SectionHead
        eyebrow="EVD 100.7"
        title="Work samples"
        note={
          DESCRIBED_STEPS.length > 0
            ? 'The Citi® Personal Loan application in the order an applicant sees it. The loan tuner is first because it was my page. Screens that only appear inside an application are described rather than shown.'
            : 'The Citi® Personal Loan application, screen by screen, in the order an applicant sees it. The loan tuner is first because it was my page.'
        }
      />

      <div className={styles.bar}>
        <span className={styles.count}>
          {samples.length} {samples.length === 1 ? 'sample' : 'samples'}
        </span>
        {canEdit ? (
          <button
            type="button"
            className={styles.ghost}
            aria-pressed={managing}
            onClick={() => {
              setManaging(!managing)
              setStatus(null)
            }}
          >
            {managing ? 'Done' : '+ Add sample'}
          </button>
        ) : null}
        {uploadedCount > 0 ? (
          <button type="button" className={styles.ghost} onClick={exportJson}>
            Export JSON
          </button>
        ) : null}
      </div>

      {managing ? (
        <>
          <button
            type="button"
            className={`${styles.drop} ${dragOver ? styles.over : ''}`}
            onDragOver={(event) => {
              event.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileInput.current?.click()}
          >
            <span className={styles.dropTitle}>Drop a file here, or click to choose one</span>
            <span className={styles.dropSub}>
              Images are resized and embedded. Other files under 520 KB are embedded too.
              <br />
              Anything larger becomes a link card.
              {storeKind === 'session' ? (
                <>
                  <br />
                  On this host uploads last for the session. Export JSON to keep them.
                </>
              ) : null}
            </span>
          </button>
          <input
            ref={fileInput}
            type="file"
            className="visually-hidden"
            onChange={(event) => {
              void takeFiles(event.target.files)
              event.target.value = ''
            }}
          />
        </>
      ) : null}

      {pending ? (
        <SampleForm
          sample={pending}
          saving={saving}
          onChange={setPending}
          onSubmit={() => void commitPending()}
          onCancel={() => {
            setPending(null)
            setStatus(null)
          }}
        />
      ) : null}

      {status ? (
        <p
          className={`${styles.status} ${
            status.tone === 'ok' ? styles.ok : status.tone === 'error' ? styles.error : ''
          }`}
          role="status"
        >
          {status.text}
        </p>
      ) : null}

      {featured.length > 0 ? (
        <div className={styles.featured}>
          {featured.map((sample) => (
            <SampleCard
              key={sample.id}
              sample={sample}
              editable={removable(sample)}
              onRemove={(id) => void remove(id)}
            />
          ))}
        </div>
      ) : null}

      {rest.length > 0 ? (
        <>
          {featured.length > 0 ? <p className={styles.gridLabel}>The rest of the flow</p> : null}
          <div className={styles.grid}>
            {rest.map((sample) => (
              <SampleCard
                key={sample.id}
                sample={sample}
                editable={removable(sample)}
                onRemove={(id) => void remove(id)}
              />
            ))}
          </div>
        </>
      ) : null}

      {DESCRIBED_STEPS.length > 0 ? (
        <aside className={styles.described} aria-labelledby="described-heading">
          <p id="described-heading" className={styles.describedHead}>
            Steps {DESCRIBED_STEPS[0]?.step}–{DESCRIBED_STEPS[DESCRIBED_STEPS.length - 1]?.step}, in
            words
          </p>
          <p className={styles.describedWhy}>
            These screens only appear inside an application, so they're described here rather than
            shown.
          </p>
          <ol className={styles.describedList}>
            {DESCRIBED_STEPS.map((step) => (
              <li key={step.step}>
                <span className={styles.describedStep}>{step.step}</span>
                <span>
                  <strong>{step.title}</strong>: {step.note}
                </span>
              </li>
            ))}
          </ol>
        </aside>
      ) : null}

      {samples.length === 0 ? (
        <p className={styles.empty}>
          Nothing filed yet. Screenshots, design files and short write-ups go here.
        </p>
      ) : null}
    </section>
  )
}
