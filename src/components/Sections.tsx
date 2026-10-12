import type { CSSProperties, ReactNode } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  achievements, aiEngineering, education, experience, profile, projects, services, skills,
} from '../data/profile'
import type { Project } from '../data/profile'
import { useCopy, useCountUp, useInView, usePrefersReducedMotion, useReveal } from '../lib/hooks'
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
            {/* The marker the spine runs through. */}
            <span className="job-dot" aria-hidden="true" />

            <div className="job-top">
              <h3 className="job-role">{job.role}</h3>
              <span className="job-company">{job.company}</span>
              <span className="job-when">{job.period}</span>
            </div>
            <p className="job-place">{job.location}</p>
            <p className="job-summary"><Mark text={job.summary} /></p>
            <ul className="job-points">
              {job.points.map((p, i) => (
                // Six bullets arriving at once read as a wall; they arrive in
                // sequence instead.
                <li key={i} style={{ '--pt-i': Math.min(i, 7) } as CSSProperties}>
                  <Mark text={p} />
                </li>
              ))}
            </ul>
            <Chips items={job.stack} />
          </article>
        ))}
      </div>
    </Band>
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
  // The four personal projects are deployed, so each gets real screens of the
  // app running. The work systems are internal — nothing to show — so they
  // stay as compact rows below.
  const mine = projects.filter(p => p.tags.includes('Personal'))
  const work = projects.filter(p => p.tags.includes('Work'))

  return (
    <Band id="projects">
      <Head
        eyebrow="Selected work"
        title="Four products you can open right now"
        lead="Every one is deployed with a demo login. The screens below are the real apps running, not mockups."
      />

      <div className="cases">
        {mine.map((p, i) => <CaseStudy key={p.slug} p={p} index={i} />)}
      </div>

      <ProjectGroup
        index="05"
        title="Systems I own at Infinite Locus"
        note="Internal platforms, so there is nothing public to link. Open a row for the design and the trade-offs."
        badge="In production"
      >
        <div className="project-rows">
          {work.map(p => <ProjectRow key={p.slug} p={p} />)}
        </div>
      </ProjectGroup>
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

/** A labelled band inside the projects section. */
function ProjectGroup({
  index, title, note, badge, children,
}: {
  index: string
  title: string
  note: string
  badge: string
  children: ReactNode
}) {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div className="pgroup reveal" ref={ref}>
      <div className="pgroup-head">
        <span className="pgroup-index">{index}</span>
        <div className="pgroup-text">
          <h3>{title}</h3>
          <p>{note}</p>
        </div>
        <span className="pgroup-badge">{badge}</span>
      </div>
      {children}
    </div>
  )
}

/**
 * Demo credentials, one click to copy. A live link nobody can sign in to is
 * not much of a demo.
 */
function ProjectRow({ p }: { p: Project }) {
  const [open, setOpen] = useState(false)

  return (
    <article className={open ? 'project-row open' : 'project-row'}>
      <button className="project-row-head" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        <span className="project-row-main">
          <strong>{p.title}</strong>
          <span className="project-row-blurb"><Mark text={p.blurb} /></span>
        </span>
        <span className="project-row-meta">
          {p.period && <em>{p.period}</em>}
          <Chevron size={15} />
        </span>
      </button>

      {(p.problem || p.metrics?.length) && (
        <div className="project-row-summary">
          {p.problem && (
            <dl className="prob-how">
              <div><dt>Problem</dt><dd>{p.problem}</dd></div>
              {p.approach && <div><dt>How</dt><dd>{p.approach}</dd></div>}
            </dl>
          )}
          {p.metrics && p.metrics.length > 0 && (
            <ul className="row-metrics" aria-label="Results">
              {p.metrics.map(m => (
                <li key={m.label}><b>{m.value}</b><span>{m.label}</span></li>
              ))}
            </ul>
          )}
          {!open && (
            <button type="button" className="row-more" onClick={() => setOpen(true)} aria-expanded={false}>
              Read the full design <Chevron size={13} />
            </button>
          )}
        </div>
      )}

      {open && (
        <div className="project-row-body">
          {p.description.map((d, i) => <p key={i}><Mark text={d} /></p>)}
          <Chips items={p.stack} />
          {p.demo && <DemoLogin demo={p.demo} />}
          <div className="project-foot">
            {p.links?.map(l => (
              <a
                className={l.label === 'Live demo' ? 'link-live' : 'link-inline'}
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
              >
                {l.label === 'Live demo' && <span className="live-dot" aria-hidden="true" />}
                {l.label} <External size={14} />
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

/* ------------------------------------------------------------------ skills */
export function Skills() {
  return (
    <Band id="skills">
      <Head
        eyebrow="Skills"
        title="The toolkit"
        lead="Grouped by the layer they belong to rather than by how confident I feel about them."
      />
      <div className="skill-grid">
        {skills.map((s, i) => (
          <div
            className={s.items.length > 12 ? 'skill-card skill-card-wide' : 'skill-card'}
            key={s.group}
            style={{ '--card-i': i } as CSSProperties}
          >
            <h3>{s.group}<span>{String(i + 1).padStart(2, '0')}</span></h3>
            <ul className="pills">
              {s.items.map((item, j) => (
                <li
                  className="pill"
                  key={item}
                  // Capped: a 20-item group should not still be dealing itself
                  // out half a second after the card arrived.
                  style={{ '--pill-i': Math.min(j, 9) } as CSSProperties}
                >
                  <Logo label={item} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Band>
  )
}

/* ---------------------------------------------------------- AI engineering */
export function AIEngineering() {
  return (
    <Band id="ai">
      <Head
        eyebrow="AI Engineering"
        title={aiEngineering.heading}
        lead={aiEngineering.lead}
      />

      <ul className="pills pills-lead">
        {aiEngineering.stack.map(t => (
          <li className="pill pill-solid" key={t}>
            <Logo label={t} /><span>{t}</span>
          </li>
        ))}
      </ul>

      <div className="ai-grid">
        {aiEngineering.groups.map((g, i) => (
          <article className="ai-card" key={g.title}>
            <header>
              <span className="ai-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{g.title}</h3>
            </header>
            <p><Mark text={g.body} /></p>
            <p className="service-proof"><Check size={14} /> <Mark text={g.proof} /></p>
          </article>
        ))}
      </div>
    </Band>
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
