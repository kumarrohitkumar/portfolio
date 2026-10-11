import type { ReactNode } from 'react'
import { useReveal } from '../lib/hooks'
import { Logo } from '../lib/logos'

/** A page section that fades in the first time it is scrolled to. */
export function Band({ id, children }: { id?: string; children: ReactNode }) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="band" id={id}>
      <div className="wrap reveal" ref={ref}>{children}</div>
    </section>
  )
}

export function Head({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <header className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {lead && <p>{lead}</p>}
    </header>
  )
}

/**
 * A row of technology pills. Each one shows the brand logo when there is one,
 * and a small dot when the label is a concept rather than a product.
 */
export function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="pills">
      {items.map(i => (
        <li className="pill pill-sm" key={i}>
          <Logo label={i} size={14} />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  )
}

/**
 * Renders **key phrases** in bold so a recruiter scanning the page catches the
 * numbers and the technology without reading every sentence. Only `**` pairs
 * are treated as markup — everything else is printed as written.
 */
/**
 * The two pieces of markdown the copy actually uses: `**bold**` for the line
 * worth remembering, and `` `code` `` for an identifier. One split handles
 * both, so neither can be left rendering as literal asterisks or backticks.
 */
export function Mark({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong className="hl" key={i}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return <code className="ic" key={i}>{part.slice(1, -1)}</code>
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}
