import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { WorkSample } from '../types'
import { exceedsBudget, MAX_TOTAL_BYTES } from '../lib/samples'
import { prettyBytes } from '../lib/format'
import { createSampleStore, loadSamples, type SampleStore, type StoreKind } from '../lib/sampleStore'

export type StatusTone = 'info' | 'ok' | 'error'

export interface Status {
  tone: StatusTone
  text: string
}

export interface UseSamples {
  samples: WorkSample[]
  status: Status | null
  saving: boolean
  storeKind: StoreKind | 'pending'
  canEdit: boolean
  add: (sample: WorkSample) => Promise<void>
  remove: (id: string) => Promise<void>
  setStatus: (status: Status | null) => void
}

/**
 * Owns the work-sample list and everything that persists it.
 *
 * Components stay unaware of where samples live; they call `add` and
 * `remove` and read `status`. The store is resolved once on mount —
 * see `src/lib/sampleStore.ts` for what "persist" means per host.
 */
export function useSamples(): UseSamples {
  const [samples, setSamples] = useState<WorkSample[]>(loadSamples)
  const [status, setStatus] = useState<Status | null>(null)
  const [saving, setSaving] = useState(false)
  const [storeKind, setStoreKind] = useState<StoreKind | 'pending'>('pending')
  const storeRef = useRef<SampleStore | null>(null)

  useEffect(() => {
    let cancelled = false
    void createSampleStore().then((store) => {
      if (cancelled) return
      storeRef.current = store
      setStoreKind(store.kind)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const commit = useCallback(async (next: WorkSample[], done: string) => {
    setSamples(next)
    const store = storeRef.current
    if (!store) {
      setStatus({ tone: 'ok', text: done })
      return
    }

    setSaving(true)
    setStatus({ tone: 'info', text: 'Saving…' })
    const outcome = await store.save(next)
    setSaving(false)
    setStatus({
      tone: outcome.persisted ? 'ok' : store.kind === 'session' ? 'info' : 'error',
      text: `${done} ${outcome.message}`.trim(),
    })
  }, [])

  const add = useCallback(
    async (sample: WorkSample) => {
      if (exceedsBudget(samples, sample)) {
        setStatus({
          tone: 'error',
          text: `That would push the collection past ${prettyBytes(
            MAX_TOTAL_BYTES,
          )}. Remove one first, or add it as a link instead of a file.`,
        })
        return
      }
      await commit([sample, ...samples], `“${sample.title}” added.`)
    },
    [commit, samples],
  )

  const remove = useCallback(
    async (id: string) => {
      const gone = samples.find((sample) => sample.id === id)
      await commit(
        samples.filter((sample) => sample.id !== id),
        `“${gone?.title ?? 'Sample'}” removed.`,
      )
    },
    [commit, samples],
  )

  const canEdit = useMemo(() => storeRef.current?.canEdit ?? storeKind !== 'pending', [storeKind])

  return { samples, status, saving, storeKind, canEdit, add, remove, setStatus }
}
