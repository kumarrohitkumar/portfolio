import * as si from 'simple-icons'

type Icon = { title: string; hex: string; path: string }

/**
 * Skill label -> brand icon. The key is matched against the label with
 * punctuation and anything in brackets removed, so "Go (Gin)", "Redis (locks,
 * Pub/Sub, caching)" and plain "Redis" all resolve without extra data entry.
 */
const MAP: Record<string, Icon | undefined> = {
  codeforces: si.siCodeforces,
  leetcode: si.siLeetcode,
  geeksforgeeks: si.siGeeksforgeeks,
  go: si.siGo,
  golang: si.siGo,
  python: si.siPython,
  javascript: si.siJavascript,
  typescript: si.siTypescript,
  c: si.siCplusplus,
  gin: si.siGo,
  nodejs: si.siNodedotjs,
  node: si.siNodedotjs,
  expressjs: si.siExpress,
  express: si.siExpress,
  fastapi: si.siFastapi,
  flask: si.siFlask,
  sqlalchemy: si.siSqlalchemy,
  react: si.siReact,
  vite: si.siVite,
  tailwindcss: si.siTailwindcss,
  shadcnui: si.siShadcnui,
  socketio: si.siSocketdotio,
  websockets: si.siSocketdotio,
  mysql: si.siMysql,
  postgresql: si.siPostgresql,
  postgres: si.siPostgresql,
  mongodb: si.siMongodb,
  redis: si.siRedis,
  kafka: si.siApachekafka,
  docker: si.siDocker,
  git: si.siGit,
  github: si.siGithub,
  kubernetes: si.siKubernetes,
  nginx: si.siNginx,
  firebase: si.siFirebase,
  firebasefcm: si.siFirebase,
  jwt: si.siJsonwebtokens,
  swagger: si.siSwagger,
  postman: si.siPostman,
  linux: si.siLinux,
  googlegemini: si.siGooglegemini,
  gemini: si.siGooglegemini,
  huggingface: si.siHuggingface,
  langchain: si.siLangchain,
  pandas: si.siPandas,
  githubactions: si.siGithubactions,
  daisyui: si.siDaisyui,
  reactrouter: si.siReactrouter,
  socketioclient: si.siSocketdotio,
  nextjs: si.siNextdotjs,
  zod: si.siZod,
  vitest: si.siVitest,
  vercel: si.siVercel,
  grafana: si.siGrafana,
  prometheus: si.siPrometheus,
  k6: si.siK6,
}

/**
 * Concepts have no brand, so they get a drawn glyph instead: one line-art
 * symbol per idea, in the same monoline style as src/lib/icons.tsx.
 */
type Glyph = { hex: string; body: JSX.Element }

// Four families, one colour each, so a glance at a card groups the ideas.
// The values are CSS tokens because they have to darken in the light theme.
const AI = 'var(--g-ai)'           // agents, models, prompting
const DATA = 'var(--g-data)'       // vectors, retrieval, storage
const SAFE = 'var(--g-safe)'       // guardrails, evaluation, correctness
const NEUTRAL = 'var(--g-neutral)' // plumbing and fundamentals
const FRONT = 'var(--g-front)'     // interface and layout

const bars = (
  <>
    <path d="M3.5 20.5V4M3.5 20.5H21" />
    <path d="M7.5 17V12M12 17V7.5M16.5 17v-7" />
  </>
)
const cylinder = (
  <>
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
    <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
  </>
)
const brackets = <path d="M8.5 4 5.5 12l3 8M15.5 4l3 8-3 8M13.5 8l-3 8" />

const GLYPHS: Record<string, Glyph> = {
  // --- agents, models, prompting -----------------------------------------
  llmagents: {
    hex: AI,
    body: <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6zM18.4 15.4l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z" />,
  },
  agenticworkflows: {
    hex: AI,
    body: (
      <>
        <circle cx="12" cy="4.5" r="2" />
        <circle cx="6.5" cy="15.5" r="2" />
        <circle cx="17.5" cy="15.5" r="2" />
        <path d="M12 6.5v4M12 10.5H6.5v3M12 10.5h5.5v3" />
      </>
    ),
  },
  toolfunctioncalling: {
    hex: AI,
    body: <path d="M9.5 4H8a2 2 0 0 0-2 2v3.2a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 6 14.2V18a2 2 0 0 0 2 2h1.5M14.5 4H16a2 2 0 0 1 2 2v3.2a2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0-2.5 2.5V18a2 2 0 0 1-2 2h-1.5" />,
  },
  promptengineering: {
    hex: AI,
    body: (
      <>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="m7 9.5 2.5 2.5L7 14.5M12.5 15.5H17" />
      </>
    ),
  },
  contextmanagement: {
    hex: AI,
    body: <path d="m12 3.5 8.5 4-8.5 4-8.5-4zM3.5 12l8.5 4 8.5-4M3.5 16.5l8.5 4 8.5-4" />,
  },
  tokencostoptimisation: {
    hex: AI,
    body: (
      <>
        <circle cx="10" cy="9" r="5.5" />
        <path d="M17 13v8M17 21l-3-3M17 21l3-3" />
      </>
    ),
  },
  streamingresponses: {
    hex: AI,
    body: (
      <>
        <path d="M4 8.5h11M4 12.5h13M4 16.5h7" />
        <circle cx="19.5" cy="16.5" r="1.6" />
      </>
    ),
  },

  // --- retrieval and vectors ---------------------------------------------
  rag: {
    hex: DATA,
    body: (
      <>
        <path d="M13.5 3.5H7a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h4M8.5 8h6M8.5 11.5h3" />
        <circle cx="16.5" cy="15.5" r="3.5" />
        <path d="m19.2 18.2 2.3 2.3" />
      </>
    ),
  },
  vectordatabases: { hex: DATA, body: cylinder },
  pgvector: { hex: DATA, body: cylinder },
  embeddings: {
    hex: DATA,
    body: (
      <>
        <path d="M3.5 20.5V4M3.5 20.5H21" />
        <circle cx="8" cy="15" r="1.5" />
        <circle cx="12" cy="9" r="1.5" />
        <circle cx="16.5" cy="13" r="1.5" />
        <circle cx="18.5" cy="7" r="1.5" />
      </>
    ),
  },
  semanticsearch: {
    hex: DATA,
    body: (
      <>
        <circle cx="10.5" cy="10.5" r="7" />
        <path d="m17 17 3.5 3.5M7.5 10h6M7.5 13h4" />
      </>
    ),
  },
  chunkingstrategies: {
    hex: DATA,
    body: (
      <>
        <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
        <path d="M12 4v16M4 12h16" />
      </>
    ),
  },

  // --- correctness and safety --------------------------------------------
  guardrails: {
    hex: SAFE,
    body: <path d="M12 2.8 4.5 6v6.1c0 4.4 3.1 7.7 7.5 9.1 4.4-1.4 7.5-4.7 7.5-9.1V6zM9 12l2.2 2.2L15.2 10" />,
  },
  llmevals: { hex: SAFE, body: bars },
  evals: { hex: SAFE, body: bars },
  hallucinationtesting: {
    hex: SAFE,
    body: (
      <>
        <path d="M12 3.5 1.8 20.5h20.4zM12 10v4" />
        <circle cx="12" cy="17.3" r="0.9" />
      </>
    ),
  },

  // --- plumbing -----------------------------------------------------------
  microservices: {
    hex: NEUTRAL,
    body: (
      <>
        <rect x="8.5" y="2.5" width="7" height="5.5" rx="1.5" />
        <rect x="1.5" y="17.5" width="6" height="4.5" rx="1.5" />
        <rect x="9" y="17.5" width="6" height="4.5" rx="1.5" />
        <rect x="16.5" y="17.5" width="6" height="4.5" rx="1.5" />
        <path d="M12 8v3M4.5 17.5V14h15v3.5M12 14v-3" />
      </>
    ),
  },
  cloudwatch: {
    hex: '#E7157B',
    body: <path d="M6.5 17.5a4 4 0 0 1-.5-8 5.5 5.5 0 0 1 10.6 1.1 3.5 3.5 0 0 1-.6 6.9M7 13.5h2L10.5 10l2 7 1.5-3.5h2" />,
  },
  eventbridge: {
    hex: '#E7157B',
    body: (
      <>
        <circle cx="12" cy="5.5" r="2.2" />
        <circle cx="12" cy="18.5" r="2.2" />
        <circle cx="4.5" cy="12" r="2.2" />
        <circle cx="19.5" cy="12" r="2.2" />
        <path d="M10.5 7.2 6 10.3M13.5 7.2 18 10.3M6 13.7l4.5 3.1M18 13.7l-4.5 3.1" />
      </>
    ),
  },
  playwright: {
    hex: '#2EAD33',
    body: (
      <>
        <rect x="3" y="3.5" width="18" height="17" rx="2.5" />
        <path d="M3 8.5h18M6.2 6h.01M8.7 6h.01M11.2 6h.01" />
        <path d="m11 11.5 6.5 2.5-2.7 1.1-1.1 2.7z" />
      </>
    ),
  },
  restapis: { hex: NEUTRAL, body: brackets },
  openaicompatibleapis: { hex: '#10A37F', body: brackets },
  zustand: {
    hex: AI,
    body: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2.5v3.5M12 18v3.5M2.5 12H6M18 12h3.5" />
        <path d="M5.6 5.6 8 8M16 16l2.4 2.4M18.4 5.6 16 8M8 16l-2.4 2.4" />
      </>
    ),
  },
  responsivelayout: {
    hex: FRONT,
    body: (
      <>
        <rect x="1.5" y="4" width="14" height="11" rx="1.8" />
        <rect x="17" y="8.5" width="5.5" height="11.5" rx="1.5" />
        <path d="M5 18h6" />
      </>
    ),
  },
  accessibility: {
    hex: SAFE,
    body: (
      <>
        <circle cx="12" cy="12" r="9.3" />
        <circle cx="12" cy="7" r="1.3" />
        <path d="M5.5 10.2c4.3 1.4 8.7 1.4 13 0M12 10.5V14m0 0-2.6 5m2.6-5 2.6 5" />
      </>
    ),
  },
  testingci: {
    hex: SAFE,
    body: (
      <>
        <path d="M9.5 2.5v6.1L4.2 18a2 2 0 0 0 1.7 3h12.2a2 2 0 0 0 1.7-3l-5.3-9.4V2.5" />
        <path d="M8 2.5h8M8.2 13.5h7.6" />
      </>
    ),
  },
  groq: {
    hex: '#F55036',
    body: (
      <>
        <circle cx="12" cy="12" r="8.6" />
        <path d="M12 7.4a4.6 4.6 0 1 0 4.6 4.6v-1.5h-3.4" />
        <path d="M16.6 12v4.4" />
      </>
    ),
  },
  smtp: {
    hex: NEUTRAL,
    body: (
      <>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
        <path d="m3.5 7 8.5 6 8.5-6" />
      </>
    ),
  },

  // --- engineering fundamentals ------------------------------------------
  distributedsystems: {
    hex: NEUTRAL,
    body: (
      <>
        <circle cx="12" cy="4.6" r="2.3" />
        <circle cx="4.8" cy="17.2" r="2.3" />
        <circle cx="19.2" cy="17.2" r="2.3" />
        <path d="M10.9 6.6 5.9 15.2M13.1 6.6l5 8.6M7.1 17.2h9.8" />
      </>
    ),
  },
  systemdesign: {
    hex: NEUTRAL,
    body: (
      <>
        <rect x="2.5" y="3.5" width="19" height="17" rx="2.5" />
        <path d="M2.5 9h19M9.5 9v11.5" />
      </>
    ),
  },
  idempotencyexactlyonce: {
    hex: NEUTRAL,
    body: (
      <>
        <path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1" />
        <path d="M20.7 3.5v4.2h-4.2M8.8 12l2.3 2.3 4.3-4.6" />
      </>
    ),
  },
  sagacompensatingrollback: {
    hex: NEUTRAL,
    body: (
      <>
        <path d="M3.5 12a8.5 8.5 0 1 0 2.6-6.1" />
        <path d="M3.3 3.5v4.2h4.2" />
        <path d="M12 8v4.4l3 1.8" />
      </>
    ),
  },
  datamigrations: {
    hex: NEUTRAL,
    body: (
      <>
        <ellipse cx="5.5" cy="6" rx="3.5" ry="1.8" />
        <path d="M2 6v6c0 1 1.6 1.8 3.5 1.8S9 13 9 12V6" />
        <ellipse cx="18.5" cy="10.5" rx="3.5" ry="1.8" />
        <path d="M15 10.5v6c0 1 1.6 1.8 3.5 1.8s3.5-.8 3.5-1.8v-6" />
        <path d="M10.5 16h3M12 14.5 13.8 16 12 17.5" />
      </>
    ),
  },
  batchedmigrations: {
    hex: NEUTRAL,
    body: (
      <>
        <rect x="2.5" y="4" width="8" height="5" rx="1.5" />
        <rect x="2.5" y="15" width="8" height="5" rx="1.5" />
        <path d="M13 6.5h8M18.5 4l2.5 2.5-2.5 2.5M13 17.5h8M18.5 15l2.5 2.5-2.5 2.5" />
      </>
    ),
  },
  auditlogging: {
    hex: NEUTRAL,
    body: (
      <>
        <path d="M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V6A1.5 1.5 0 0 1 5 4.5z" />
        <path d="M7 9h10M7 12.5h6M7 16h4" />
      </>
    ),
  },
  oop: {
    hex: NEUTRAL,
    body: (
      <>
        <path d="m12 2.5 8.5 4.8v9.4L12 21.5 3.5 16.7V7.3z" />
        <path d="m3.7 7.2 8.3 4.7 8.3-4.7M12 11.9v9.6" />
      </>
    ),
  },
  dbms: { hex: NEUTRAL, body: cylinder },
  computernetworks: {
    hex: NEUTRAL,
    body: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.4 3.5 8.5S14.3 18.1 12 20.5c-2.3-2.4-3.5-5.4-3.5-8.5S9.7 5.9 12 3.5z" />
      </>
    ),
  },
  dsa: {
    hex: NEUTRAL,
    body: (
      <>
        <circle cx="12" cy="4.5" r="2" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="12" r="2" />
        <circle cx="6" cy="19.5" r="2" />
        <circle cx="18" cy="19.5" r="2" />
        <path d="m10.7 6.1-3.4 4.3M13.3 6.1l3.4 4.3M6 14v3.5M18 14v3.5" />
      </>
    ),
  },
}

/** Brands with no icon in simple-icons, where the letters ARE the name. */
const LETTERS: Record<string, { text: string; hex: string }> = {
  aws: { text: 'aws', hex: '#FF9900' },
  awsec2: { text: 'EC2', hex: '#FF9900' },
  awsecs: { text: 'ECS', hex: '#FF9900' },
  awsecr: { text: 'ECR', hex: '#FF9900' },
  awslambda: { text: 'λ', hex: '#FF9900' },
  awss3: { text: 'S3', hex: '#569A31' },
  awssns: { text: 'SNS', hex: '#FF4F8B' },
  awssqs: { text: 'SQS', hex: '#FF4F8B' },
  awssnssqs: { text: 'SQS', hex: '#FF4F8B' },
  sql: { text: 'SQL', hex: '#4169E1' },
  cicd: { text: 'CI', hex: '#2088FF' },
  openai: { text: 'AI', hex: '#10A37F' },
}

function key(label: string) {
  return label
    .replace(/\(.*?\)/g, '')      // drop the bracketed detail
    .replace(/[^a-z0-9]/gi, '')
    .toLowerCase()
}

/** Very dark brand colours vanish on a dark page — use the text colour instead. */
function isTooDark(hex: string) {
  const h = hex.replace('#', '')
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16)
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255]
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.24
}

export function Logo({ label, size = 15 }: { label: string; size?: number }) {
  const k = key(label)
  const icon = MAP[k]

  if (icon) {
    const color = isTooDark(icon.hex) ? 'currentColor' : `#${icon.hex}`
    return (
      <svg
        className="logo"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        aria-hidden="true"
        focusable="false"
      >
        <path d={icon.path} />
      </svg>
    )
  }

  const glyph = GLYPHS[k]
  if (glyph) {
    return (
      <svg
        className="logo"
        width={size + 2}
        height={size + 2}
        viewBox="0 0 24 24"
        fill="none"
        stroke={glyph.hex}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        {glyph.body}
      </svg>
    )
  }

  const letters = LETTERS[k]
  if (letters) {
    return (
      <span className="logo logo-text" style={{ color: letters.hex }} aria-hidden="true">
        {letters.text}
      </span>
    )
  }

  // Nothing matched — a small dot keeps every pill the same shape.
  return <span className="logo logo-dot" aria-hidden="true" />
}
