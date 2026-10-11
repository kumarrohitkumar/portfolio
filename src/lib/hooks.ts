import type { RefObject } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

/** Dark by default. The choice is remembered per browser. */
export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'light' || saved === 'dark') return saved
    } catch {
      /* private mode, blocked storage — fall through to the default */
    }
    return 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('theme', theme) } catch { /* ignore */ }
  }, [theme])

  return { theme, toggle: () => setTheme(t => (t === 'dark' ? 'light' : 'dark')) }
}

/** Adds .in to an element the first time it scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/** Which section is currently on screen, for the nav highlight. */
export function useActiveSection(ids: string[], enabled: boolean) {
  const [active, setActive] = useState('')
  useEffect(() => {
    if (!enabled || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids, enabled])
  return active
}

/** True once the page has scrolled past `after` pixels. */
export function useScrolledPast(after: number) {
  const [past, setPast] = useState(false)
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > after)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [after])
  return past
}

/** Copy to clipboard with a short "Copied" confirmation. */
export function useCopy() {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* clipboard blocked — the mailto link still works */ }
  }, [])
  return { copied, copy }
}

/**
 * Lights a card under the cursor by writing --mx/--my on the hovered element.
 * One listener on the document rather than one per card.
 */
export function useCardGlow() {
  useEffect(() => {
    const SELECTOR = '.project, .service, .ai-card, .skill-card'

    function onMove(event: PointerEvent) {
      const card = (event.target as HTMLElement | null)?.closest<HTMLElement>(SELECTOR)
      if (!card) return

      const rect = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`)
      card.style.setProperty('--my', `${event.clientY - rect.top}px`)
    }

    // Skip on touch devices: there is no cursor, and it would fire on every tap.
    if (!window.matchMedia('(hover: hover)').matches) return undefined

    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])
}

/**
 * Counts from 0 to `target` the first time the element scrolls into view.
 * Shows the final number straight away for reduced-motion users and old browsers.
 */
export function useCountUp<T extends HTMLElement>(target: number, durationMs = 1200) {
  const ref = useRef<T>(null)
  const [value, setValue] = useState(0)
  useEffect(() => {
    const el = ref.current
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (!el || reduce || !('IntersectionObserver' in window)) { setValue(target); return }
    let frame = 0
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs)
        setValue(Math.round(target * (1 - Math.pow(1 - t, 3))))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }, { threshold: 0.4 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(frame) }
  }, [target, durationMs])
  return { ref, value }
}

/** True while the element is on screen. Used to pause off-screen animation. */
export function useInView<T extends HTMLElement>(ref: RefObject<T | null>, margin = '0px') {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin, threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, margin])

  return inView
}

/** Honours the system setting, and keeps honouring it if the user changes it. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

/**
 * How far down the page the reader is, 0 to 1. Driven by scroll rather than
 * an observer because it needs a continuous value, not a threshold.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const read = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0)
    }
    // Coalesce scroll events into one read per frame.
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(read) }

    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return progress
}
