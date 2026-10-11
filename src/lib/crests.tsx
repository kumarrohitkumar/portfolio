/**
 * Institution marks, drawn rather than linked.
 *
 * Official crests are trademarked and a hotlinked image is one dead URL away
 * from an empty box, so these are simple original marks in each institution's
 * colours — recognisable as a badge without pretending to be the real crest.
 */
type Props = { size?: number }

export function IITBHUMark({ size = 44 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Indian Institute of Technology (BHU), Varanasi"
    >
      <defs>
        <linearGradient id="iitbhu-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d4ed8" />
          <stop offset="1" stopColor="#0e7490" />
        </linearGradient>
      </defs>

      {/* A shield, the shape every Indian institute crest shares. */}
      <path
        d="M24 3 42 9v16c0 9.4-7 17-18 20C13 42 6 34.4 6 25V9z"
        fill="url(#iitbhu-g)"
      />
      <path
        d="M24 7.2 38 12v13c0 7.6-5.6 13.9-14 16.5C15.6 38.9 10 32.6 10 25V12z"
        fill="none"
        stroke="rgba(255,255,255,.34)"
        strokeWidth="1.1"
      />

      {/* An open book over a gear tooth ring: engineering, taught. */}
      <path
        d="M14.5 21.5c3.4-1.5 6.3-1.5 9.5 0 3.2-1.5 6.1-1.5 9.5 0v9c-3.4-1.5-6.3-1.5-9.5 0-3.2-1.5-6.1-1.5-9.5 0z"
        fill="#fff"
        opacity=".95"
      />
      <path d="M24 21.5v9" stroke="#1d4ed8" strokeWidth="1.1" />
      <circle cx="24" cy="15.5" r="2.4" fill="#fff" opacity=".9" />
    </svg>
  )
}

export function JNVMark({ size = 44 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Jawahar Navodaya Vidyalaya"
    >
      <defs>
        <linearGradient id="jnv-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#15803d" />
          <stop offset="1" stopColor="#ca8a04" />
        </linearGradient>
      </defs>

      <circle cx="24" cy="24" r="20" fill="url(#jnv-g)" />
      <circle cx="24" cy="24" r="16.2" fill="none" stroke="rgba(255,255,255,.32)" strokeWidth="1.1" />

      {/* A rising sun over a book — the Navodaya idea, plainly. */}
      <path d="M13 27h22" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity=".95" />
      <path
        d="M16.5 27a7.5 7.5 0 0 1 15 0"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        opacity=".95"
      />
      <path d="M24 13.5v3M17 15.6l1.6 2.4M31 15.6l-1.6 2.4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" opacity=".8" />
      <path
        d="M15.5 30c2.8-1.1 5.6-1.1 8.5 0 2.9-1.1 5.7-1.1 8.5 0v4c-2.8-1.1-5.6-1.1-8.5 0-2.9-1.1-5.7-1.1-8.5 0z"
        fill="#fff"
        opacity=".95"
      />
    </svg>
  )
}

const MARKS = { iitbhu: IITBHUMark, jnv: JNVMark }

export function Crest({ mark, size }: { mark: keyof typeof MARKS; size?: number }) {
  const Component = MARKS[mark]
  return <Component size={size} />
}
