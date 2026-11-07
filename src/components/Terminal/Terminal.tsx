import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'

import { completeCommand, runCommand } from '../../data/terminal'
import { SectionHead } from '../SectionHead/SectionHead'

import styles from './Terminal.module.css'

interface Line {
  id: number
  text: string
  tone: 'out' | 'echo' | 'error'
}

const GREETING: string[] = [
  'VICE-OS 5.1 — interactive resume shell',
  '',
  'Type `help` for the command list, or use a shortcut below.',
]

const QUICK_COMMANDS = ['whoami', 'stack', 'work', 'projects', 'hire', 'contact']

let nextId = 0
const line = (text: string, tone: Line['tone'] = 'out'): Line => ({ id: nextId++, text, tone })

/**
 * A working shell over the same data the page renders.
 *
 * Command definitions live in `src/data/terminal.ts`; this component
 * only handles input, history and painting. Adding a command therefore
 * never means touching this file.
 */
export function Terminal() {
  const [lines, setLines] = useState<Line[]>(() => GREETING.map((text) => line(text)))
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const screenRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const screen = screenRef.current
    if (screen) screen.scrollTop = screen.scrollHeight
  }, [lines])

  const submit = useCallback((raw: string) => {
    const entry = raw.trim()
    const output = runCommand(entry)

    if (output === null) {
      setLines([])
    } else {
      const printed: Line[] = [
        line(`> ${entry}`, 'echo'),
        ...output.map((text) => line(text, text.includes('command not found') ? 'error' : 'out')),
      ]
      setLines((current) => [...current, ...printed])
    }

    if (entry) setHistory((current) => [entry, ...current].slice(0, 40))
    setHistoryIndex(null)
    setValue('')
  }, [])

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      submit(value)
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const completion = completeCommand(value)
      if (completion) setValue(completion)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (history.length === 0) return
      const next = historyIndex === null ? 0 : Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(next)
      setValue(history[next] ?? '')
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (historyIndex === null) return
      const next = historyIndex - 1
      if (next < 0) {
        setHistoryIndex(null)
        setValue('')
      } else {
        setHistoryIndex(next)
        setValue(history[next] ?? '')
      }
    }
  }

  return (
    <section id="terminal">
      <SectionHead
        eyebrow="TRM 92.5"
        title="Ask it yourself"
        note="A real shell over the same data this page is built from — so it cannot tell you anything the sections above contradict. Try `hire`."
      />

      <div className={styles.shell}>
        <div className={styles.titleBar}>
          <span className={styles.lamps} aria-hidden="true">
            <span className={styles.lamp} />
            <span className={styles.lamp} />
            <span className={styles.lamp} />
          </span>
          <span>sam@vice-city:~</span>
          <span className={styles.hint}>Tab completes · ↑ ↓ history</span>
        </div>

        {/* Clicking anywhere on the screen focuses the input; the input
            itself is the real focus target, so this only saves a click. */}
        <div className={styles.screen} ref={screenRef} onClick={() => inputRef.current?.focus()}>
          <div role="log" aria-live="polite" aria-label="Terminal output">
            {lines.map((entry) => (
              <p
                key={entry.id}
                className={`${styles.line} ${
                  entry.tone === 'echo' ? styles.echo : entry.tone === 'error' ? styles.error : ''
                }`}
              >
                {entry.text || ' '}
              </p>
            ))}
          </div>

          <div className={styles.prompt}>
            <span className={styles.sigil} aria-hidden="true">
              &gt;
            </span>
            <input
              ref={inputRef}
              className={styles.input}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal input"
              placeholder="help"
            />
          </div>
        </div>
      </div>

      <div className={styles.quickRow}>
        {QUICK_COMMANDS.map((command) => (
          <button
            key={command}
            type="button"
            className={styles.quick}
            onClick={() => {
              submit(command)
              inputRef.current?.focus()
            }}
          >
            {command}
          </button>
        ))}
      </div>
    </section>
  )
}
