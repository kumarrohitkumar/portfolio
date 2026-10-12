import type { CSSProperties } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  achievements, education, experience, profile, projects, services, skills,
} from '../data/profile'
import type { Project } from '../data/profile'
import { useCopy, useCountUp, useInView, usePrefersReducedMotion } from '../lib/hooks'
import {
  Arrow, Check, Chevron, External, Github, Linkedin, Mail, Star,
} from '../lib/icons'
import { Crest } from '../lib/crests'
import { Logo } from '../lib/logos'
import { Band, Chips, Head, Mark } from './Common'

/* ------------------------------------------------------------------- about */
export function About() {
  return (
    <Band id="about">
      <Head eyebrow="About" title="What I work on, and how I work" />
      <div className="about-grid">
        <div className="about-copy">
          {profile.about.map((p, i) => <p key={i}><Mark text={p} /></p>)}
        </div>
        <aside className="card">
          <ul className="fact-list">
            <li><span className="k">Role</span><span className="v">SDE I, Infinite Locus</span></li>
            <li><span className="k">Based in</span><span className="v">{profile.location}</span></li>
            <li><span className="k">From</span><span className="v">{profile.hometown}</span></li>
            <li><span className="k">Degree</span><span className="v">B.Tech, IIT (BHU) Varanasi</span></li>
            <li><span className="k">Focus</span><span className="v">Backend, distributed systems</span></li>
            <li><span className="k">Main stack</span><span className="v">Go · Python · Node · Kafka</span></li>
          </ul>
          <a className="btn" href="#contact" style={{ width: '100%', marginTop: 18 }}>
            Get in touch <Arrow size={16} />
          </a>
        </aside>
      </div>
    </Band>
  )
}

/* -------------------------------------------------------------- experience */
export function Experience() {
  // The four systems live in `projects` tagged 'Work'. They used to be
  // written out again as bullets here, which meant the same four systems
  // appeared twice on the page saying the same things.
  const work = projects.filter(p => p.tags.includes('Work'))

  return (
    <Band id="experience">
      <Head
        eyebrow="Experience"
        title="Where I have built things"
        lead="Systems that move orders, stock and money between companies — where a duplicate or a dropped record is somebody's reconciliation problem, not just a bug."
      />
      <div className="timeline">
        {experience.map((job, j) => (
          <article className="job" key={job.company} style={{ '--job-i': j } as CSSProperties}>
            <span className="job-dot" aria-hidden="true" />

            <div className="job-top">
              <h3 className="job-role">{job.role}</h3>
              <span className="job-company">{job.company}</span>
              <span className="job-when">{job.period}</span>
            </div>
            <p className="job-place">{job.location}</p>
            <p className="job-summary"><Mark text={job.summary} /></p>

            {'points' in job && (
              <ul className="job-points">
                {job.points.map((point, i) => (
                  <li key={i} style={{ '--pt-i': Math.min(i, 7) } as CSSProperties}>
                    <Mark text={point} />
                  </li>
                ))}
              </ul>
            )}

            {/* The systems owned in this role, each as problem → how → result. */}
            {j === 0 && work.length > 0 && (
              <div className="systems">
                <h4 className="systems-head">
                  What I own here
                  <span>{work.length} systems</span>
                </h4>
                {work.map((system, i) => <SystemStep key={system.slug} p={system} index={i} />)}
              </div>
            )}

            {'alsoShipped' in job && (
              <p className="job-also"><Mark text={job.alsoShipped} /></p>
            )}

            <Chips items={job.stack} />
          </article>
        ))}
      </div>
    </Band>
  )
}

/**
 * One system, read as a process: what was wrong, what I did, what changed.
 * The full design is a click away rather than on the page by default — the
 * three lines are what a reader scanning the section actually needs.
 */
function SystemStep({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="system" style={{ '--sys-i': index } as CSSProperties}>
      <span className="system-num">{String(index + 1).padStart(2, '0')}</span>

      <div className="system-body">
        <div className="system-top">
          <h5>{p.title}</h5>
          {/* The period carries the employer for the projects list; inside
              the role card that is the card's own heading, so it goes. */}
          {p.period && (
            <span className="system-when">{p.period.split('·')[0].trim()}</span>
          )}
        </div>

        {p.problem && (
          <p className="system-line">
            <span className="system-tag">Problem</span>
            <span><Mark text={p.problem} /></span>
          </p>
        )}
        {p.approach && (
          <p className="system-line">
            <span className="system-tag">How</span>
            <span><Mark text={p.approach} /></span>
          </p>
        )}

        {p.metrics && (
          <div className="system-metrics">
            {p.metrics.map(m => (
              <span key={m.label}><b>{m.value}</b>{m.label}</span>
            ))}
          </div>
        )}

        <button className="row-more" onClick={() => setOpen(o => !o)} aria-expanded={open}>
          {open ? 'Show less' : 'Read the full design'} <Chevron size={13} />
        </button>

        {open && (
          <div className="system-detail">
            {p.description.map((d, i) => <p key={i}><Mark text={d} /></p>)}
            <Chips items={p.stack} />
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- projects */
/**
 * Demo credentials, one click to copy. A live link nobody can sign in to is
 * not much of a demo.
 */
function DemoLogin({ demo }: { demo: { label: string; value: string } }) {
  const { copied, copy } = useCopy()

  return (
    <button
      className="demo-login"
      onClick={() => copy(demo.value)}
      title="Copy to clipboard"
    >
      <span className="demo-label">{demo.label}</span>
      <code>{demo.value}</code>
      <span className="demo-copy">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  )
}

export function Projects() {
  // Work systems are told once, in Experience, where the role gives them
  // their context. This section is only what I built on my own.
  const mine = projects.filter(p => p.tags.includes('Personal'))

  return (
    <Band id="projects">
      <Head
        eyebrow="Selected work"
        title="Five things I built on my own"
        lead="Four are deployed with a demo login, and the payments ledger runs with one command. The screens below are the real thing running, not mockups."
      />

      <div className="cases">
        {mine.map((p, i) => <CaseStudy key={p.slug} p={p} index={i} />)}
      </div>
    </Band>
  )
}

/**
 * One project told as a case study: the running app on one side, what it does
 * on the other. Sides alternate down the page.
 */
function CaseStudy({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false)
  const live = p.links?.find(l => l.label === 'Live demo')?.href

  return (
    <article className={index % 2 ? 'case case-flip' : 'case'}>
      <div className="case-text">
        <span className="case-num">{String(index + 1).padStart(2, '0')}</span>
        <h3>{p.title}</h3>
        <p className="case-blurb"><Mark text={p.blurb} /></p>

        {p.metrics && (
          <div className="case-stats">
            {p.metrics.map(m => (
              <div key={m.label}><b>{m.value}</b><span>{m.label}</span></div>
            ))}
          </div>
        )}

        <Chips items={p.stack.slice(0, 5)} />

        <div className="case-links">
          {p.links?.map(l => (
            <a
              key={l.href}
              className={l.label === 'Live demo' ? 'cl cl-live' : 'cl'}
              href={l.href}
              target="_blank"
              rel="noreferrer"
            >
              {l.label === 'Live demo' && <span className="live-dot" aria-hidden="true" />}
              {l.label === 'Live demo' ? 'Open live' : l.label}
              <External size={13} />
            </a>
          ))}
        </div>

        {p.demo && <DemoLogin demo={p.demo} />}

        <button className="disclose" onClick={() => setOpen(o => !o)} aria-expanded={open}>
          {open ? 'Show less' : 'How it works'} <Chevron size={15} />
        </button>

        {open && (
          <div className="case-body">
            {p.description.map((d, i) => <p key={i}><Mark text={d} /></p>)}
          </div>
        )}
      </div>

      {p.shots && p.shots.length > 0 && (
        <ScreenCycler shots={p.shots} href={live} eager={index === 0} title={p.title} />
      )}
    </article>
  )
}

/** How long each screen is held before the deck advances. */
const SCREEN_HOLD_MS = 2000

/**
 * Cycles through a project's screens so the card shows the app working rather
 * than one frozen frame. Pauses on hover and when the section is off screen,
 * and the labels are buttons so it can be driven by hand or by keyboard.
 */
function ScreenCycler({
  shots, href, eager, title,
}: {
  shots: NonNullable<Project['shots']>
  href?: string
  eager: boolean
  title: string
}) {
  const [i, setI] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  // Which way the deck moved, so the outgoing screen leaves the side the new
  // one came from rather than always sliding the same way.
  const [dir, setDir] = useState<1 | -1>(1)
  const [paused, setPaused] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)
  const visible = useInView(frameRef)
  const reduced = usePrefersReducedMotion()

  const goTo = useCallback((next: number, direction: 1 | -1) => {
    setI(current => {
      if (next === current) return current
      setPrev(current)
      setDir(direction)
      return next
    })
  }, [])

  // The interval would close over a stale `i`, so it reads this instead and
  // never has to be torn down and rebuilt on every tick.
  const iRef = useRef(i)
  useEffect(() => { iRef.current = i }, [i])

  useEffect(() => {
    if (paused || !visible || reduced || shots.length < 2) return undefined
    const id = setInterval(() => goTo((iRef.current + 1) % shots.length, 1), SCREEN_HOLD_MS)
    return () => clearInterval(id)
  }, [paused, visible, reduced, shots.length, goTo])

  // Clear the outgoing frame once its animation is done, so only one image
  // is painted at rest.
  useEffect(() => {
    if (prev === null) return undefined
    const t = setTimeout(() => setPrev(null), 600)
    return () => clearTimeout(t)
  }, [prev, i])

  return (
    <div
      className="case-shot"
      ref={frameRef}
      style={{ '--hold': `${SCREEN_HOLD_MS}ms` } as CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="shot-frame">
        <span className="shot-bar" aria-hidden="true"><i /><i /><i /></span>

        {/* `sweeping` is only on while a change is in flight, so the edge
            line runs exactly once per transition. */}
        <div
          className={[
            'shot-stage',
            dir === 1 ? 'fwd' : 'back',
            prev !== null ? 'sweeping' : '',
          ].filter(Boolean).join(' ')}
        >
          {shots.map((shot, n) => {
            const state = n === i ? 'enter' : n === prev ? 'exit' : undefined
            return (
              <img
                key={shot.src}
                src={shot.src}
                alt={n === i ? shot.alt : ''}
                aria-hidden={n === i ? undefined : true}
                className={state}
                loading={eager && n === 0 ? 'eager' : 'lazy'}
                decoding="async"
                width={1300}
                height={762}
              />
            )
          })}
        </div>

        {href && (
          <a className="shot-open" href={href} target="_blank" rel="noreferrer">
            Open {title} <External size={13} />
          </a>
        )}
      </div>

      {shots.length > 1 && (
        <div className="shot-tabs" role="tablist" aria-label={`${title} screens`}>
          {shots.map((shot, n) => (
            <button
              key={shot.src}
              role="tab"
              aria-selected={n === i}
              className={n === i ? 'on' : undefined}
              onClick={() => { goTo(n, n > i ? 1 : -1); setPaused(true) }}
            >
              {shot.label}
              {n === i && !paused && !reduced && <span className="tab-fill" key={`${i}-${paused}`} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ skills */
export function Skills() {
  return (
    <Band id="skills">
      <Head
        eyebrow="Skills"
        title="The toolkit"
        lead="Grouped by the layer it belongs to rather than by how confident I feel about it. Scroll sideways, or use the arrows."
      />
      <SkillRail />
    </Band>
  )
}

const RAIL_COPIES = 3

/**
 * The eight groups as a rail that never ends. Three copies are rendered and
 * the view sits on the middle one; when the reader scrolls past a copy
 * boundary the position jumps back by exactly one set. The jump is the same
 * pixels as the content, so it cannot be seen — the rail just keeps going.
 *
 * Movement is always "scroll to this card's left edge", never "scroll by a
 * guessed width", because a guess drifts a little each time and the cards end up
 * sitting half out of frame.
 */
function SkillRail() {
  const railRef = useRef<HTMLDivElement>(null)
  const setWidthRef = useRef(0)
  const [active, setActive] = useState(0)
  const reduced = usePrefersReducedMotion()

  const cards = () =>
    Array.from(railRef.current?.querySelectorAll<HTMLElement>('.skill-card') ?? [])

  const measure = useCallback(() => {
    const el = railRef.current
    if (!el) return 0
    // scrollWidth / 3 is a few pixels out: 24 cards have 23 gaps, not 24.
    // The distance to a card's twin one set later is exact.
    const all = cards()
    const twin = all[skills.length]
    const width = twin ? twin.offsetLeft - all[0].offsetLeft : el.scrollWidth / RAIL_COPIES
    setWidthRef.current = width
    return width
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return undefined

    const place = () => {
      const width = measure()
      if (!width) return
      const previous = el.style.scrollBehavior
      el.style.scrollBehavior = 'auto'
      el.scrollLeft = width
      el.style.scrollBehavior = previous
      indexRef.current = skills.length
    }

    place()
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [measure])

  /** The card closest to the left edge, as an index into `skills`. */
  const nearest = useCallback(() => {
    const el = railRef.current
    const all = cards()
    if (!el || !all.length) return { index: 0, group: 0 }

    let best = 0
    let bestGap = Infinity
    all.forEach((card, i) => {
      const gap = Math.abs(card.offsetLeft - el.scrollLeft)
      if (gap < bestGap) { bestGap = gap; best = i }
    })
    return { index: best, group: best % skills.length }
  }, [])

  /**
   * Where we are heading. Reading the live scroll position instead would
   * sample a smooth scroll mid-flight, so two quick presses on the arrow
   * would both aim at the same card and the rail would end up misaligned.
   */
  const indexRef = useRef(skills.length)
  const settleRef = useRef<number | undefined>(undefined)

  /** Keep the reader inside the middle copy, invisibly, and track the group. */
  const onScroll = useCallback(() => {
    const el = railRef.current
    const width = setWidthRef.current || measure()
    if (!el || !width) return

    setActive(nearest().group)

    // Once the scroll has stopped, trust the position again — this is what
    // picks up a swipe or a trackpad scroll the arrows knew nothing about.
    window.clearTimeout(settleRef.current)
    settleRef.current = window.setTimeout(() => {
      indexRef.current = nearest().index
    }, 140)

    let shift = 0
    if (el.scrollLeft < width * 0.5) shift = width
    else if (el.scrollLeft > width * 1.5) shift = -width
    if (!shift) return

    // Snapping fights an instant jump, so it is off for that one frame.
    const snap = el.style.scrollSnapType
    const behavior = el.style.scrollBehavior
    el.style.scrollSnapType = 'none'
    el.style.scrollBehavior = 'auto'
    el.scrollLeft += shift
    el.style.scrollSnapType = snap
    el.style.scrollBehavior = behavior
    // The jump moved us a whole set, so the index we are heading to moved too.
    indexRef.current += shift > 0 ? skills.length : -skills.length
  }, [measure, nearest])

  useEffect(() => () => window.clearTimeout(settleRef.current), [])

  /** Scroll to an exact card, so nothing ever lands half out of frame. */
  const scrollToCard = (index: number) => {
    const el = railRef.current
    const all = cards()
    const clamped = Math.max(0, Math.min(all.length - 1, index))
    const card = all[clamped]
    if (!el || !card) return
    indexRef.current = clamped
    el.scrollTo({ left: card.offsetLeft, behavior: reduced ? 'auto' : 'smooth' })
  }

  const nudge = (direction: 1 | -1) => scrollToCard(indexRef.current + direction)

  /** Jump to a group in whichever copy is nearest, so the move stays short. */
  const goToGroup = (group: number) => {
    const here = indexRef.current
    const copy = Math.floor(here / skills.length)
    const candidates = [copy - 1, copy, copy + 1]
      .filter(c => c >= 0 && c < RAIL_COPIES)
      .map(c => c * skills.length + group)
    const target = candidates.reduce((a, b) =>
      Math.abs(b - here) < Math.abs(a - here) ? b : a)
    scrollToCard(target)
  }

  return (
    <div className="rail-wrap">
      <div className="rail-head">
        <span className="rail-hint">
          <b>{String(active + 1).padStart(2, '0')}</b> / {String(skills.length).padStart(2, '0')}
          <em>{skills[active].group}</em>
        </span>
        <div className="rail-nav">
          <button onClick={() => nudge(-1)} aria-label="Previous group">
            <Chevron size={16} />
          </button>
          <button onClick={() => nudge(1)} aria-label="Next group">
            <Chevron size={16} />
          </button>
        </div>
      </div>

      <div
        className="skill-rail"
        ref={railRef}
        onScroll={onScroll}
        tabIndex={0}
        role="group"
        aria-label="Skills, scrollable sideways"
      >
        {Array.from({ length: RAIL_COPIES }).flatMap((_, copy) =>
          skills.map((s, i) => (
            <div
              className="skill-card"
              key={`${copy}-${s.group}`}
              style={{ '--card-i': i } as CSSProperties}
              // Only the middle copy is announced; the other two exist to make
              // the loop seamless, not to be read out three times.
              aria-hidden={copy === 1 ? undefined : true}
            >
              <h3>{s.group}<span>{String(i + 1).padStart(2, '0')}</span></h3>
              <ul className="pills">
                {s.items.map((item, j) => (
                  <li
                    className="pill"
                    key={item}
                    style={{ '--pill-i': Math.min(j, 9) } as CSSProperties}
                  >
                    <Logo label={item} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )),
        )}
      </div>

      {/* One mark per group, so the rail says how much there is and where
          you are — an endless rail needs that more than a finite one. */}
      <div className="rail-dots" role="tablist" aria-label="Skill groups">
        {skills.map((s, i) => (
          <button
            key={s.group}
            role="tab"
            aria-selected={i === active}
            aria-label={s.group}
            className={i === active ? 'on' : undefined}
            onClick={() => goToGroup(i)}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- services */
export function Services() {
  return (
    <Band id="services">
      <Head
        eyebrow="Services"
        title="What I can build for you"
        lead="Freelance and contract work alongside my full-time role. Tell me the problem, not the technology — the stack is my job to pick."
      />
      <div className="service-grid">
        {services.map((s, i) => (
          <div className="service" key={s.title} style={{ '--card-i': i } as CSSProperties}>
            <div className="service-num">{String(i + 1).padStart(2, '0')}</div>
            <h3>{s.title}</h3>
            <p><Mark text={s.body} /></p>
            <p className="service-proof"><Check size={14} /> <Mark text={s.proof} /></p>
          </div>
        ))}
      </div>
    </Band>
  )
}

/* ------------------------------------------------ education + achievements */
export function Background() {
  return (
    <Band>
      <div className="two-col">
        <div>
          <Head eyebrow="Education" title="Where I studied" />
          <div className="edu">
            {education.map((e, i) => (
              <div
                className="edu-item"
                key={e.school}
                style={{ '--card-i': i } as CSSProperties}
              >
                <EduLogo entry={e} />
                <div className="edu-body">
                  <h3>
                    {e.school}
                    <span className="edu-short">{e.short}</span>
                  </h3>
                  <p className="q">{e.qualification}</p>
                  <p className="m">{e.period} · {e.place}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Head eyebrow="Achievements" title="Problem solving" />
          <div className="ach">
            {achievements.map((a, i) => (
              <AchievementCard key={a.title} a={a} i={i} />
            ))}
          </div>
        </div>
      </div>
    </Band>
  )
}

/** One achievement: brand marks, the claim, and a number that counts up as it appears. */
function AchievementCard({ a, i }: { a: (typeof achievements)[number]; i: number }) {
  const { ref, value } = useCountUp<HTMLSpanElement>(a.stat?.value ?? 0)
  return (
    <div className="ach-item" style={{ '--card-i': i } as CSSProperties}>
      <span className={`ach-marks${a.logos.length > 1 ? ' stack' : ''}`} aria-hidden="true">
        {a.logos.length ? (
          a.logos.map(l => (
            <span className="ach-mark" key={l}>
              <Logo label={l} size={a.logos.length > 1 ? 15 : 20} />
            </span>
          ))
        ) : (
          <span className="ach-mark"><Star size={18} /></span>
        )}
      </span>
      <div className="ach-text">
        <strong>{a.title}</strong>
        <span>{a.detail}</span>
      </div>
      {a.stat && (
        <span className="ach-stat" ref={ref} aria-label={`${a.stat.value}${a.stat.suffix ?? ''} ${a.stat.label}`}>
          <b>{value.toLocaleString('en-IN')}{value === a.stat.value ? a.stat.suffix ?? '' : ''}</b>
          <small>{a.stat.label}</small>
        </span>
      )}
    </div>
  )
}

/**
 * The institution's own emblem, with the drawn crest as a fallback so a
 * missing file never leaves an empty square.
 */
function EduLogo({ entry }: { entry: { logo: string; mark: 'iitbhu' | 'jnv'; school: string } }) {
  const [failed, setFailed] = useState(false)

  return (
    <span className="edu-crest">
      {failed ? (
        <Crest mark={entry.mark} size={40} />
      ) : (
        <img
          src={entry.logo}
          alt={`${entry.school} emblem`}
          width={40}
          height={40}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  )
}

/* ----------------------------------------------------------------- contact */
export function Contact() {
  const { copied, copy } = useCopy()
  const hasLinkedin = !profile.linkedin.includes('REPLACE-ME')

  return (
    <Band id="contact">
      <Head eyebrow="Contact" title="Let us talk" />
      <div className="contact-grid">
        <div>
          <p className="contact-lead">
            Hiring for a software engineering role, or need a service, a pipeline
            or a migration built properly? Send a short note about the problem —
            not the technology — and I will reply.
          </p>

          <div className="contact-links">
            <a className="contact-row" style={{ '--card-i': 0 } as CSSProperties} href={`mailto:${profile.email}`}>
              <span className="ic"><Mail /></span>
              <span>
                <span className="k" style={{ display: 'block' }}>Email</span>
                <span className="v">{profile.email}</span>
              </span>
              <span className="go"><Arrow size={16} /></span>
            </a>

            <a className="contact-row" style={{ '--card-i': 1 } as CSSProperties} href={profile.github} target="_blank" rel="noreferrer">
              <span className="ic"><Github /></span>
              <span>
                <span className="k" style={{ display: 'block' }}>GitHub</span>
                <span className="v">{profile.github.replace('https://', '')}</span>
              </span>
              <span className="go"><External size={15} /></span>
            </a>

            {hasLinkedin && (
              <a className="contact-row" style={{ '--card-i': 2 } as CSSProperties} href={profile.linkedin} target="_blank" rel="noreferrer">
                <span className="ic"><Linkedin /></span>
                <span>
                  <span className="k" style={{ display: 'block' }}>LinkedIn</span>
                  <span className="v">{profile.linkedin.replace('https://www.', '')}</span>
                </span>
                <span className="go"><External size={15} /></span>
              </a>
            )}
          </div>

          <button className="btn" style={{ marginTop: 14 }} onClick={() => copy(profile.email)}>
            {copied ? <><Check size={16} /> Copied</> : 'Copy email address'}
          </button>
        </div>

        <ContactForm />
      </div>
    </Band>
  )
}

function ContactForm() {
  const endpoint = profile.formEndpoint

  if (!endpoint) {
    // No form service configured, so open the user's mail client instead of
    // showing inputs that would silently go nowhere.
    return (
      <div className="card">
        <h3 style={{ marginBottom: 10 }}>Prefer to write now?</h3>
        <p className="dim" style={{ fontSize: '.95rem', marginBottom: 18 }}>
          This opens your mail app with the subject already filled in. Tell me what
          you are building and roughly when you need it.
        </p>
        <a
          className="btn btn-primary"
          style={{ width: '100%' }}
          href={`mailto:${profile.email}?subject=${encodeURIComponent('Work enquiry for Rohit')}`}
        >
          <Mail size={16} /> Write an email
        </a>
      </div>
    )
  }

  return (
    <form className="card form" action={endpoint} method="POST">
      <div className="field">
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" name="name" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="cf-msg">What do you need built?</label>
        <textarea id="cf-msg" name="message" required />
      </div>
      <button className="btn btn-primary" type="submit">Send message <Arrow size={16} /></button>
      <p className="form-note">Your message goes straight to {profile.email}.</p>
    </form>
  )
}

/* ------------------------------------------------------------------ footer */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <nav aria-label="Footer">
          <a href="#top">Top</a>
          <a href={profile.resume} download>Resume</a>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  )
}
