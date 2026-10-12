import { useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import {
  Background, Contact, Experience, Footer, Projects, Skills,
} from './components/Sections'
import { useCardGlow, useScrollProgress, useScrolledPast, useTheme } from './lib/hooks'
import { ArrowUp } from './lib/icons'
import { profile } from './data/profile'

export default function App() {
  const { theme, toggle } = useTheme()
  useCardGlow()

  useEffect(() => {
    document.title = `${profile.name} — ${profile.role}`
  }, [])

  return (
    <div className="shell">
      <ReadingProgress />
      <Header theme={theme} onToggleTheme={toggle} />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Background />
        <Contact />
      </main>
      <Footer />
      <ToTop />
    </div>
  )
}

/** A hairline at the very top. The page is long; this says how long. */
function ReadingProgress() {
  const progress = useScrollProgress()
  return (
    <div className="progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${progress})` }} />
    </div>
  )
}

function ToTop() {
  const show = useScrolledPast(700)
  return (
    <button
      className={show ? 'to-top show' : 'to-top'}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={18} />
    </button>
  )
}
