import { useEffect, useState } from 'react'

import { useReducedMotion } from './useReducedMotion'

/**
 * Reveal `lines` one at a time.
 *
 * Used by the hero's boot panel. The rest of the page is fully rendered
 * while this runs — the effect is decoration inside one small panel, not
 * a splash screen gating the content — and it is skipped entirely when
 * the visitor prefers reduced motion.
 */
export function useTypedLines(lines: readonly string[], msPerLine = 220): string[] {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(() => (reduced ? lines.length : 0))

  useEffect(() => {
    if (reduced) {
      setCount(lines.length)
      return
    }

    setCount(0)
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setCount(index)
      if (index >= lines.length) window.clearInterval(timer)
    }, msPerLine)

    return () => window.clearInterval(timer)
  }, [lines, msPerLine, reduced])

  return lines.slice(0, count)
}
