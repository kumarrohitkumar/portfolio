import { useEffect, useState } from 'react'
import { nav, profile } from '../data/profile'
import { useActiveSection, useScrolledPast } from '../lib/hooks'
import { Close, Menu, Moon, Sun } from '../lib/icons'

type Props = { theme: 'dark' | 'light'; onToggleTheme: () => void }

export function Header({ theme, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false)
  const stuck = useScrolledPast(8)
  const active = useActiveSection(nav.map(n => n.id), true)

  // Close the drawer if the window grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 941px)')
    const onChange = () => mq.matches && setOpen(false)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const initials = profile.name.split(' ').map(w => w[0]).join('')

  return (
    <header className="header" data-stuck={stuck}>
      <div className="wrap header-inner">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark" aria-hidden="true">{initials}</span>
          <span>
            {profile.name}
            <span className="brand-sub">{profile.role}</span>
          </span>
        </a>

        <nav className="nav" aria-label="Sections">
          {nav.map(n => (
            <a key={n.id} href={`#${n.id}`} aria-current={active === n.id}>{n.label}</a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="btn btn-ghost"
            href={profile.resume}
            download
            style={{ padding: '9px 15px' }}
          >
            Resume
          </a>
          <button
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="drawer">
          {nav.map(n => (
            <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
        </div>
      )}
    </header>
  )
}
