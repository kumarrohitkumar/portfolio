import { useEffect, useRef, useState } from 'react'
import { liveDemos, profile } from '../data/profile'
import { useCountUp, useInView, usePrefersReducedMotion } from '../lib/hooks'
import { Logo } from '../lib/logos'
import { Arrow, Download, External, Github, Linkedin, Mail, Pin } from '../lib/icons'

/**
 * Headline numbers. Each is split so it can count up — the achievements
 * section already does this, and a static number beside a counting one looks
 * like a bug.
 */
const metrics = [
  { to: 15, suffix: '+', label: 'bots in production' },
  { to: 70, suffix: '%', label: 'lower API latency' },
  { to: 32, suffix: 'M+', label: 'records migrated' },
  { to: 95, suffix: '%+', label: 'production success' },
]

/**
 * A short, fixed transcript rather than a live shell. It says what I work on
 * faster than a paragraph would, and it is the one visual that belongs on a
 * backend engineer's page.
 */
const transcript: { prompt?: boolean; parts: { text: string; tone?: string }[] }[] = [
  { prompt: true, parts: [{ text: 'whoami' }] },
  { parts: [{ text: 'SDE I · Infinite Locus · Gurugram', tone: 'dim' }] },
  { prompt: true, parts: [{ text: 'stack --primary' }] },
  {
    parts: [
      { text: 'Go', tone: 'b' }, { text: ' · ', tone: 'dim' },
      { text: 'Python', tone: 'b' }, { text: ' · ', tone: 'dim' },
      { text: 'Node', tone: 'b' }, { text: ' · ', tone: 'dim' },
      { text: 'React', tone: 'b' }, { text: ' · Kafka · Redis · AWS', tone: 'dim' },
    ],
  },
  { prompt: true, parts: [{ text: 'ls ~/shipped' }] },
  {
    parts: [
      { text: '8', tone: 'w' }, { text: ' systems · ', tone: 'dim' },
      { text: '4', tone: 'w' }, { text: ' live, open to anyone', tone: 'dim' },
    ],
  },
]

export function Hero() {
  const [photoOk, setPhotoOk] = useState(true)
  const initials = profile.name.split(' ').map(w => w[0]).join('')
  const hasLinkedin = !profile.linkedin.includes('REPLACE-ME')

  return (
    <section className="hero" id="top">
      <div className="hero-aurora" aria-hidden="true" />

      <div className="wrap hero-inner">
        <div className="hero-copy">
          <span className="status">
            <span className="dot" aria-hidden="true" />
            {profile.availability}
          </span>

          <h1 className="hero-title">
            I build systems that
            <br />
            <span className="gradient-text">never lose your data</span>
          </h1>

          <p className="hero-intro">{profile.intro}</p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              See the work <Arrow size={16} />
            </a>
            <a className="btn" href={profile.resume} download>
              <Download size={16} /> Resume
            </a>
            <a className="btn btn-icon" href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github size={17} />
            </a>
            {hasLinkedin && (
              <a className="btn btn-icon" href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Linkedin size={17} />
              </a>
            )}
          </div>

          <div className="hero-meta">
            <span><Pin size={14} /> {profile.location}</span>
            <a href={`mailto:${profile.email}`}><Mail size={14} /> {profile.email}</a>
          </div>
        </div>

        <div className="hero-aside">
          <div className="terminal" aria-hidden="true">
            <div className="terminal-bar">
              <i style={{ background: '#ff5f57' }} />
              <i style={{ background: '#febc2e' }} />
              <i style={{ background: '#28c840' }} />
              <span>rohit@infinite-locus ~</span>
            </div>
            <Typewriter lines={transcript} />
          </div>

          {/* The photo rides under the terminal so the column is not just a box. */}
          <div className="hero-face">
            {photoOk ? (
              <picture>
                <source srcSet={profile.photoWebp} type="image/webp" />
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  width={124}
                  height={124}
                  onError={() => setPhotoOk(false)}
                />
              </picture>
            ) : (
              <span>{initials}</span>
            )}
            <div>
              <strong>{profile.name}</strong>
              <small>{profile.roleSub}</small>
              <SchoolLine />
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="metrics">
          {metrics.map((m, i) => <Metric key={m.label} {...m} delay={0.5 + i * 0.09} />)}
        </div>
      </div>

      <div className="wrap">
        <LiveStrip />
      </div>

      <Marquee />
    </section>
  )
}

/**
 * The degree, on the card rather than in a section of its own. The emblem
 * falls back to plain text, so a missing file costs the line nothing.
 */
function SchoolLine() {
  const [ok, setOk] = useState(true)
  const { degree, institute, logo } = profile.school

  return (
    <span className="hero-school">
      {ok && (
        <img
          src={logo}
          alt=""
          width={22}
          height={22}
          loading="lazy"
          decoding="async"
          onError={() => setOk(false)}
        />
      )}
      <span>
        {degree} · <b>{institute}</b>
      </span>
    </span>
  )
}

/**
 * Types the transcript out the way a shell would: commands character by
 * character, their output all at once a beat later, then a resting cursor.
 *
 * It does not start until the terminal is on screen, and it renders every
 * line from the first frame — hidden, not absent — so the hero never grows
 * underneath the reader.
 */
function Typewriter({ lines }: { lines: typeof transcript }) {
  const ref = useRef<HTMLDivElement>(null)
  const visible = useInView(ref)
  const reduced = usePrefersReducedMotion()

  // How many lines are done, and how far into the line being typed.
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(0)
  const done = line >= lines.length

  useEffect(() => {
    if (reduced) { setLine(lines.length); return undefined }
    if (!visible) return undefined

    // Finished: rest on the prompt for a moment, then run the session again.
    if (done) {
      const id = setTimeout(() => { setLine(0); setChars(0) }, 2600)
      return () => clearTimeout(id)
    }

    const current = lines[line]
    const text = current.parts.map(part => part.text).join('')

    // Output lines are not typed — a command returns its result at once.
    if (!current.prompt) {
      const id = setTimeout(() => { setLine(n => n + 1); setChars(0) }, 260)
      return () => clearTimeout(id)
    }

    if (chars >= text.length) {
      const id = setTimeout(() => { setLine(n => n + 1); setChars(0) }, 330)
      return () => clearTimeout(id)
    }

    const id = setTimeout(() => setChars(n => n + 1), 42)
    return () => clearTimeout(id)
  }, [visible, reduced, line, chars, lines, done])

  return (
    <div className="terminal-body" ref={ref}>
      {lines.map((row, i) => {
        const typing = i === line
        const shown = i < line || done
        if (!typing && !shown) {
          // Reserve the row so the panel keeps its height from the start.
          return <div key={i} className="tw-row" aria-hidden="true">&nbsp;</div>
        }

        return (
          <div key={i} className="tw-row">
            {row.prompt && <span className="t-acc">$ </span>}
            {renderParts(row.parts, typing && row.prompt ? chars : Infinity)}
            {typing && row.prompt && <span className="caret" />}
          </div>
        )
      })}

      <div className="tw-row">
        {done && <><span className="t-acc">$ </span><span className="caret" /></>}
        {!done && <>&nbsp;</>}
      </div>
    </div>
  )
}

/** Reveals the first `budget` characters across a line's coloured parts. */
function renderParts(parts: { text: string; tone?: string }[], budget: number) {
  let left = budget
  return parts.map((part, j) => {
    if (left <= 0) return null
    const slice = part.text.slice(0, left)
    left -= part.text.length
    return (
      <span key={j} className={part.tone ? `t-${part.tone}` : undefined}>
        {slice}
      </span>
    )
  })
}

/**
 * Three deployments a visitor can open immediately. A recruiter who clicks one
 * has seen more in ten seconds than any paragraph would have told them.
 */
function LiveStrip() {
  return (
    <div className="live-strip">
      <span className="live-strip-label">
        <span className="live-dot" aria-hidden="true" />
        Live right now
      </span>

      <div className="live-strip-items">
        {liveDemos.map((d, i) => (
          <a
            key={d.href}
            className="live-chip"
            href={d.href}
            target="_blank"
            rel="noreferrer"
            style={{ animationDelay: `${0.8 + i * 0.1}s` }}
          >
            <strong>{d.name}</strong>
            <span>{d.what}</span>
            <External size={14} />
          </a>
        ))}
      </div>
    </div>
  )
}

function Metric({ to, suffix, label, delay }: {
  to: number; suffix: string; label: string; delay: number
}) {
  const { ref, value } = useCountUp<HTMLSpanElement>(to, 1100)

  return (
    <div className="metric" style={{ animationDelay: `${delay}s` }}>
      <span className="metric-value" ref={ref}>{value}{suffix}</span>
      <span className="metric-label">{label}</span>
    </div>
  )
}

const TECH = [
  'Go', 'Kafka', 'Redis', 'PostgreSQL', 'AWS ECS', 'Docker', 'React', 'TypeScript',
  'Socket.IO', 'Idempotency', 'Saga rollback', 'pgvector', 'RAG', 'LLM agents',
]

/**
 * The stack, drifting past. Each name carries its own mark — the same icon
 * resolver the skills section uses — so the strip reads as a row of tools
 * rather than a line of shouting text. Duplicated once so the loop has no
 * visible seam.
 */
function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map(copy => (
          <span key={copy} className="marquee-run">
            {TECH.map(t => (
              <span className="marquee-item" key={t}>
                <Logo label={t} size={15} />
                {t}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
