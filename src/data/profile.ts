/**
 * THE ONLY FILE YOU NEED TO EDIT.
 *
 * Every word, link, number and project on the website comes from here.
 * Change something, save, and the page updates. No database, no admin panel.
 *
 * Items marked  // TODO  are the three things I could not find on your machine.
 */

export type Project = {
  slug: string
  title: string
  blurb: string
  description: string[]
  stack: string[]
  tags: string[]
  metrics?: { value: string; label: string }[]
  links?: { label: string; href: string }[]
  /** Work projects: the problem and the approach in one line each, shown without opening the card. */
  problem?: string
  approach?: string
  /** Shown as a copyable line so a visitor can sign in to the live demo. */
  demo?: { label: string; value: string }
  /** Screens of the app actually running; the case study cycles through them. */
  shots?: { src: string; alt: string; label: string }[]
  featured?: boolean
  period?: string
}

export const profile = {
  // ---------------------------------------------------------------- identity
  name: 'Rohit Kumar',
  role: 'Software Engineer',
  /** The strength, said once, without narrowing the role itself. */
  roleSub: 'Backend & distributed systems · full-stack when it helps',
  roleLine: 'Software Development Engineer I at Infinite Locus',
  tagline: 'I build systems that do not lose your data.',
  intro:
    'Payment flows, order pipelines and cross-platform sync — the parts of a ' +
    'product that are expensive to get wrong. Go, Python and Node underneath; ' +
    'React and TypeScript on top when the work needs a screen too.',

  location: 'Gurugram, India',
  hometown: 'Bharatpur, Rajasthan',
  availability: 'Open to software engineering roles and selected freelance work',

  // ------------------------------------------------------------------- links
  email: 'rk8091267@gmail.com',
  phone: '+91 8003133605',
  /** wa.me wants the number with no +, spaces or dashes. */
  get whatsapp() {
    return `https://wa.me/${this.phone.replace(/\D/g, '')}`
  },
  github: 'https://github.com/kumarrohitkumar',
  // All three were read out of the link annotations in Rohit-Kumar-Resume.pdf.
  linkedin: 'https://www.linkedin.com/in/rohit-kumar-02764520b',
  leetcode: 'https://leetcode.com/u/Rohit2125/',
  codeforces: 'https://codeforces.com/profile/astupid',

  resume: 'Rohit-Kumar-Resume.pdf',
  // Drop a square photo at public/photo.jpg. Until then the site shows your
  // initials in a styled monogram, which looks deliberate rather than missing.
  /** WebP with a JPEG fallback; the hero falls back again to a monogram. */
  photo: 'photo.jpg',
  photoWebp: 'photo.webp',

  /**
   * Contact form. Leave empty and the form becomes a clean "email me" card.
   * To switch it on: create a free form at https://formspree.io, then paste
   * the endpoint here, e.g. 'https://formspree.io/f/abcdwxyz'.
   */
  formEndpoint: '',

  // ------------------------------------------------------------------- about
  /**
   * Kept deliberately short. The projects, the stack, the degree and the ratings
   * all have their own sections further down — repeating them here would waste
   * the one place on the page where I get to say how I think.
   */
  about: [
    'I build the parts of a system where a mistake costs money — real orders, real ' +
      'stock, real payments. A duplicate payment is not a bug report; it is somebody ' +
      'in finance losing a week. **Idempotency, retries and audit trails go in from ' +
      'the first line, not after the first incident.**',

    'The work I like is the unglamorous middle: the consumer that must not ' +
      'double-process, the migration that must be reversible. **Owning a system after ' +
      'it ships is what taught me how to design one.**',

    'Most of my depth is on the server, but I do not stop at the API boundary — I ' +
      'build the interface when a feature needs one. Lately the same discipline has ' +
      'gone into LLM agents: tools and guardrails in code, and **evals, so a change ' +
      'is a measurement and not a feeling.**',
  ],
} as const

/**
 * The deployments anyone can open without asking me for anything. Kept here
 * so the hero strip and the project cards cannot drift apart.
 */
export const liveDemos = [
  {
    name: 'Kosh LMS',
    what: 'Apply, sanction, disburse, collect — five roles',
    href: 'https://kosh-lms.vercel.app',
    login: 'admin@lms.dev / Password@123',
  },
  {
    name: 'Chatify',
    what: 'Direct and group chat, presence and receipts',
    href: 'https://chatify-13-205-125-184.sslip.io',
    login: 'ananya@demo.chat / demo1234',
  },
  {
    name: 'JobConnect',
    what: 'Search and apply; recruiters post and shortlist',
    href: 'https://jobconnect-portal-alpha.vercel.app',
    login: 'student@jobconnect.dev / Demo@1234',
  },
  {
    name: 'Finishh Club',
    what: 'Mutual funds and stocks in plain English',
    href: 'https://finishh-club.vercel.app',
    login: '',
  },
] as const

// ------------------------------------------------------------------ experience
export const experience = [
  {
    company: 'Infinite Locus',
    role: 'Software Development Engineer I',
    period: 'Jul 2025 — Present',
    location: 'Gurugram, India · Onsite',
    summary:
      'Backend engineer on a distribution and finance platform. I own automation, ' +
      'notifications and cross-platform synchronisation end to end — design through ' +
      'production support.',
    points: [
      'Built and own a distributor order automation platform: **15+ Python and ' +
        'Playwright bots** across **6+ third-party portals**, covering sales returns, ' +
        'report extraction and reconciliation. Manual effort down **90%+**, running at ' +
        'a **95%+ success rate** in production.',

      'Architected it end to end, **HLD and LLD through rollout**. **Redis distributed ' +
        'locks**, batching, retries and **saga-style compensating rollbacks** make order ' +
        'and financial processing **exactly-once** — no duplicate or partial records.',

      'Built an event-driven notification platform in **Go (Gin)** on **AWS SNS/SQS**, ' +
        'with isolated workers for **Firebase FCM, SMTP email and WebSocket**. ' +
        'Synchronous API response time fell **70%**.',

      'Shipped secure financial workflows: **PayPal payments** with webhook-verified ' +
        'state, **Go PDF generation** behind access-controlled **S3 signed URLs**, and ' +
        '**Redis-based OTP** that blocks duplicate and expired logins.',

      'Designed the **Kafka** synchronisation pipeline between our platform and an ' +
        'external distributor system — **Node.js, TypeScript and MongoDB**, fully ' +
        'idempotent, with **near real-time consistency** on order and financial events.',

      'Led a **32M+ record** production migration: a batched, idempotent **four-phase ' +
        'canonical merge** that de-duplicated the store master with **zero data loss**, ' +
        'full audit traceability and **one-click rollback**.',
    ],
    stack: ['Go', 'Gin', 'Python', 'Node.js', 'TypeScript', 'Kafka', 'Redis', 'MongoDB', 'MySQL', 'AWS', 'Playwright', 'Docker'],
  },
  {
    company: 'MPYG Private Limited',
    role: 'Software Engineer Intern',
    period: 'May 2024 — Jul 2024',
    location: 'Remote',
    summary: 'Frontend-leaning full-stack work on a consumer scheduling product.',
    points: [
      'Built a **React** yoga session planner — user engagement up **76%**, ' +
        'subscriptions up **28%**.',
      'Implemented **Firebase Authentication** with **JWT** authorisation for secure ' +
        'login and session management.',
      'Built a reusable, responsive component library with **Tailwind CSS** and ' +
        '**shadcn/ui**, improving cross-device usability and maintainability.',
    ],
    stack: ['React', 'JavaScript', 'Firebase', 'JWT', 'Tailwind CSS', 'shadcn/ui'],
  },
] as const

// -------------------------------------------------------------------- projects
export const projects: Project[] = [
  {
    slug: 'kosh-lms',
    shots: [
      { src: 'shots/k1-overview.webp',  label: 'Overview',   alt: 'The Kosh portfolio overview: disbursed, collected, outstanding and overdue' },
      { src: 'shots/k2-sanction.webp',  label: 'Sanction',   alt: 'The sanction queue, where a reviewer approves or rejects a loan' },
      { src: 'shots/k3-collection.webp', label: 'Collection', alt: 'The collection module, recording and reversing repayments' },
    ],
    featured: true,
    title: 'Kosh — Loan Management System',
    period: 'Oct 2026 · Personal',
    blurb:
      'A borrower applies online, and four internal teams take the loan from ' +
      'application to closure — with every decision recorded.',
    description: [
      '**Correct under concurrency.** An explicit state machine with conditional ' +
        'atomic updates — two officers acting at once can never both approve the same ' +
        'loan. A partial unique index allows one open loan per borrower.',
      '**Money handled safely.** Amounts in **integer paise**, interest computed ' +
        'server-side, repayments keyed by a unique **UTR** so a resubmission is never ' +
        'counted twice. Reversals reopen a closed loan.',
      '**Access and audit.** Five roles, enforced in the API and the UI. Every ' +
        'decision lands in a per-loan timeline: who, when, why.',
      '**Built to run.** Salary slips upload straight to private S3 via presigned ' +
        'requests, sidestepping Vercel’s 4.5 MB body limit. Moving the API next to ' +
        'the database cut responses from **1.1 s to 0.15 s**.',
      '**271 automated tests** — 190 API, 81 UI. Swagger docs at `/api/docs`.',
    ],
    metrics: [
      { value: '271', label: 'automated tests' },
      { value: '5', label: 'roles, API and UI' },
      { value: '0.15s', label: 'response, from 1.1s' },
    ],
    stack: [
      'Next.js', 'React', 'TypeScript', 'Express.js', 'MongoDB', 'AWS S3', 'Vercel',
    ],
    tags: ['Personal', 'Full Stack', 'Data'],
    links: [
      { label: 'Live demo', href: 'https://kosh-lms.vercel.app' },
      { label: 'API docs', href: 'https://kosh-lms.vercel.app/api/docs' },
      { label: 'Walkthrough', href: 'https://www.youtube.com/watch?v=D0_4UIqaj7g' },
      { label: 'GitHub', href: 'https://github.com/kumarrohitkumar/lms-assignment' },
    ],
    demo: { label: 'Sign in as', value: 'admin@lms.dev / Password@123' },
  },
  {
    slug: 'order-automation',
    problem: 'Six distributor portals with no APIs; every return, report and reconciliation was done by hand.',
    approach: 'Playwright bots under one orchestrator, with Redis locks, checkpoints, retries with backoff and saga rollback.',
    featured: true,
    title: 'Distributor Order Automation Platform',
    period: '2025 — present · Infinite Locus',
    blurb:
      '15+ browser bots that replaced manual order, return and reconciliation work ' +
      'across six external distributor portals.',
    description: [
      'Third-party distributor portals have no APIs. Every sales return, every report ' +
        'and every reconciliation had to be done by a person logging in and clicking. ' +
        'The platform replaces that with Python and Playwright bots, one per portal ' +
        'workflow, run and supervised by a central orchestrator.',
      'The hard part is not the clicking, it is the guarantees. A retried bot must not ' +
        'file the same return twice, and a bot that dies halfway must leave the system ' +
        'in a state someone can reason about. Redis distributed locks keep one worker ' +
        'per key, work is batched and checkpointed, failures retry with backoff, and a ' +
        'saga layer runs compensating steps to roll a half-finished workflow back.',
      'I took this from the first design document through LLD to production, and have ' +
        'owned it in production since.',
    ],
    stack: ['Python', 'Playwright', 'Redis', 'MySQL', 'Docker', 'AWS'],
    tags: ['Work', 'Automation', 'Distributed Systems'],
    metrics: [
      { value: '15+',  label: 'bots in production' },
      { value: '6+',   label: 'external portals' },
      { value: '90%+', label: 'manual effort removed' },
      { value: '95%+', label: 'production success rate' },
    ],
  },
  {
    slug: 'notification-platform',
    problem: 'Push, email and socket sends ran inside API requests, so one slow provider slowed unrelated endpoints.',
    approach: 'A Go service that publishes to SNS and fans out to per-channel SQS queues with isolated workers.',
    title: 'Event-Driven Notification Platform',
    period: '2025 · Infinite Locus',
    blurb:
      'A Go service that took notification delivery off the request path — three ' +
      'channels, SNS/SQS fan-out, isolated workers.',
    description: [
      'Sending a push, an email and a socket event inline made every API call as slow ' +
        'as the slowest provider, and one provider having a bad day made unrelated ' +
        'endpoints time out.',
      'The platform accepts a notification over a Gin API, publishes it to AWS SNS, ' +
        'and fans it out to per-channel SQS queues. Dedicated worker services consume ' +
        'each queue for Firebase FCM, SMTP email and WebSocket delivery, so a failure ' +
        'in one channel cannot slow or break another. Retries and dead-letter handling ' +
        'live in the queue layer rather than in application code.',
      'Synchronous API response time dropped by 70%, and delivery became something ' +
        'that can be retried and observed instead of silently lost.',
    ],
    stack: ['Go', 'Gin', 'AWS SNS', 'AWS SQS', 'Firebase FCM', 'WebSockets', 'SMTP'],
    tags: ['Work', 'Go', 'Distributed Systems'],
    metrics: [
      { value: '70%', label: 'lower API latency' },
      { value: '3',   label: 'delivery channels' },
    ],
  },
  {
    slug: 'platform-sync',
    problem: 'Two platforms both accept writes to orders, collections and payments, and must agree in near real time.',
    approach: 'Kafka consumers with idempotency keys and a sync-state record per event, so replays are safe and any miss can be re-fired.',
    title: 'Cross-Platform Synchronisation Pipeline',
    period: '2025 — present · Infinite Locus',
    blurb:
      'Kafka-based sync between two distribution platforms that each consider ' +
      'themselves the source of truth.',
    description: [
      'Two systems — one internal, one external — both hold orders, collections and ' +
        'payments, and both accept writes. Keeping them in agreement in near real time ' +
        'is a consistency problem, not a data-transfer problem.',
      'Order and financial events flow through Kafka into Node.js and TypeScript ' +
        'consumers. Each event carries an idempotency key and is tracked by a MongoDB ' +
        'document that records its sync state, so a replay is safe, a partial failure ' +
        'is visible, and any dropped event can be re-fired from a retry endpoint ' +
        'rather than fixed by hand in the database.',
      'The same tracking layer is what makes failures diagnosable: for any record you ' +
        'can answer "did it cross, when, and if not, why".',
    ],
    stack: ['Node.js', 'TypeScript', 'Kafka', 'MongoDB', 'Python', 'Docker'],
    tags: ['Work', 'Distributed Systems', 'Data'],
    metrics: [
      { value: 'Exactly-once', label: 'financial event processing' },
      { value: 'Near real-time', label: 'consistency between platforms' },
    ],
  },
  {
    slug: 'canonical-merge',
    problem: 'Duplicate store records split orders and invoices across copies and quietly corrupted every report.',
    approach: 'A four-phase canonical merge in idempotent batches, restartable, audited, with one-click rollback.',
    title: '32M-Record Canonical Merge Migration',
    period: '2025 · Infinite Locus',
    blurb:
      'A four-phase, batched, reversible migration that de-duplicated a production ' +
      'store master without losing a row.',
    description: [
      'Years of imports had left the store master with duplicate records for the same ' +
        'real shop. Orders, invoices and history were split across those duplicates, ' +
        'which quietly corrupted every report built on top of them.',
      'The fix was a canonical merge run in four phases across 32M+ rows: identify the ' +
        'canonical record, re-point dependents in idempotent batches, deactivate the ' +
        'duplicates, and verify. Every phase is restartable, every change is written to ' +
        'an audit trail, and the whole run has a one-click rollback.',
      'It ran on production with zero data loss.',
    ],
    stack: ['Python', 'MySQL', 'Batched migrations', 'Audit logging'],
    tags: ['Work', 'Data'],
    metrics: [
      { value: '32M+', label: 'records processed' },
      { value: '0',    label: 'rows lost' },
      { value: '1',    label: 'click to roll back' },
    ],
  },
  {
    slug: 'finishh-club',
    shots: [
      { src: 'shots/f1-home.webp', label: 'Fund list', alt: 'The searchable list of 200 funds' },
      { src: 'shots/f2-fund.webp', label: 'The Meter', alt: 'A fund page showing the rolling-return meter' },
      { src: 'shots/f3-isaa.webp', label: 'Ask Isaa',  alt: 'The assistant answering with data, and declining to advise' },
    ],
    title: 'Finishh Club',
    period: '2026 — in progress · Personal',
    blurb:
      'Explains Indian mutual funds, IPOs and stocks in plain English, with an ' +
      'assistant built so it can never give investment advice.',
    description: [
      '**Real data, guarded.** 200 funds and **290,000 daily price points** from ' +
        'AMFI, behind a guard that refuses to write an incomplete source file.',
      '**Fast analytics.** Every historical holding window for a fund — **2,400+ in ' +
        '4 ms** — precomputed nightly, so a page read is one indexed lookup.',
      '**An agent built from scratch.** Tool-calling loop, structured responses, ' +
        'retry budgets, **no framework**. Numbers come only from SQL tools, never ' +
        'from retrieval. Concept search fuses keyword and vector rankings (**RRF**).',
      '**Measured, not guessed.** **82 tests**, including an eval suite that caught ' +
        'fabricated metrics before release. API p95 **1,211 ms to 211 ms**; agent ' +
        'replies **45 s to 6 s**.',
    ],
    metrics: [
      { value: '82', label: 'automated tests' },
      { value: '290k', label: 'daily price points' },
      { value: '211ms', label: 'API p95, from 1,211ms' },
    ],
    stack: [
      'Python', 'FastAPI', 'PostgreSQL', 'pgvector', 'React', 'RAG', 'Evals', 'Vercel',
    ],
    tags: ['Personal', 'AI', 'Full Stack'],
    links: [
      { label: 'Live demo', href: 'https://finishh-club.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/kumarrohitkumar/finishh-club' },
    ],
    demo: { label: 'Open it', value: 'No sign-in needed' },
  },
  {
    slug: 'job-portal',
    shots: [
      { src: 'shots/j1-board.webp', label: 'Job board', alt: 'The job board with filters, salaries and locations' },
      { src: 'shots/j2-job.webp',   label: 'A job',     alt: 'A single job listing' },
      { src: 'shots/j4-recruiter.webp', label: 'Recruiter', alt: 'The recruiter view: posted jobs with applicant counts' },
    ],
    title: 'JobConnect — job portal',
    period: 'Apr 2024 — May 2024 · Personal',
    blurb:
      'A job portal for India: seekers search and apply in one click, recruiters ' +
      'post jobs and shortlist applicants.',
    description: [
      '**Secured an insecure app.** Rebuilt the API with role and ownership checks ' +
        'on every route. Before: any seeker could post jobs and read others’ ' +
        'applicants, and **password hashes leaked in API responses**.',
      '**Safe uploads.** Résumés checked by their **bytes**, not the filename, and ' +
        'stored in private S3 behind links that expire in an hour.',
      '**Sessions that cannot go stale.** The signed-in user always comes from the ' +
        'server, replacing a cache that kept expired logins looking valid. Code ' +
        'splitting halved the bundle, **620 KB to 330 KB**.',
      '**Tested end to end.** **52 tests** — 33 API, 10 UI, 9 Playwright journeys ' +
        'from sign-up to shortlisting, run against the live site.',
    ],
    metrics: [
      { value: '52', label: 'automated tests' },
      { value: '330KB', label: 'bundle, from 620KB' },
      { value: '2', label: 'roles, seeker + recruiter' },
    ],
    stack: [
      'React', 'Vite', 'Tailwind CSS', 'React Router', 'Express.js', 'MongoDB',
      'Zod', 'AWS S3', 'JWT', 'Vercel',
    ],
    tags: ['Personal', 'Full Stack'],
    links: [
      { label: 'Live demo', href: 'https://jobconnect-portal-alpha.vercel.app' },
      { label: 'GitHub', href: 'https://github.com/kumarrohitkumar/Job_Portal' },
    ],
    demo: { label: 'Sign in as', value: 'student@jobconnect.dev / Demo@1234' },
  },
  {
    slug: 'chatify',
    shots: [
      { src: 'shots/c1-group.webp',    label: 'Group chat', alt: 'A group conversation with sender names and read receipts' },
      { src: 'shots/c2-direct.webp',   label: 'Direct',     alt: 'A one-to-one conversation' },
      { src: 'shots/c4-members.webp',  label: 'Members',    alt: 'The group panel: members, roles and admin controls' },
    ],
    featured: true,
    title: 'Chatify — real-time chat',
    period: '2025 — present · Personal',
    blurb:
      'Direct messages and groups, with presence, typing indicators, read ' +
      'receipts, photos and message deletion.',
    description: [
      '**Realtime that holds up.** One Socket.IO room per conversation, ' +
        '**cookie-authenticated sockets**, membership checked on every event, and ' +
        'missed messages fetched after a reconnect.',
      '**Accurate receipts.** "Seen by N" counts each reader once, from their ' +
        'previous read time. Unread counts are computed **in MongoDB**, not by ' +
        'loading history into the server.',
      '**Private media.** Photos re-encoded to WebP with location data stripped, ' +
        'in a private S3 bucket, served only to members of that chat.',
      '**Deployed and tested.** **AWS EC2** with Docker Compose and Caddy. ' +
        '**112 tests** — 103 API, 3 UI, 6 Playwright journeys driving three signed-in ' +
        'users at once, run against the live site.',
    ],
    metrics: [
      { value: '112', label: 'automated tests' },
      { value: '3', label: 'users driven at once' },
      { value: 'EC2', label: 'Docker Compose + Caddy' },
    ],
    stack: [
      'React', 'Vite', 'Tailwind CSS', 'daisyUI', 'Express.js', 'Socket.IO',
      'MongoDB', 'AWS S3', 'Docker', 'AWS EC2',
    ],
    tags: ['Personal', 'Full Stack', 'Distributed Systems'],
    links: [
      { label: 'Live demo', href: 'https://chatify-13-205-125-184.sslip.io' },
      { label: 'GitHub', href: 'https://github.com/kumarrohitkumar/chat_app' },
    ],
    demo: { label: 'Sign in as', value: 'ananya@demo.chat / demo1234' },
  },
]

// --------------------------------------------------------------------- skills
export const skills = [
  { group: 'Languages',        items: ['Go', 'Python', 'JavaScript', 'TypeScript', 'C++', 'SQL'] },
  { group: 'Backend',          items: ['Go (Gin)', 'Node.js', 'Express.js', 'FastAPI', 'Flask', 'SQLAlchemy', 'REST APIs', 'Microservices', 'WebSockets (Socket.IO)'] },
  { group: 'Frontend',         items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'daisyUI', 'Zustand', 'React Router', 'Responsive layout', 'Accessibility', 'Socket.IO client'] },
  { group: 'Data & Messaging', items: ['MySQL', 'PostgreSQL', 'MongoDB (aggregation, indexing)', 'Redis (locks, Pub/Sub, caching)', 'Kafka', 'AWS SNS/SQS'] },
  { group: 'Cloud & DevOps',   items: ['AWS EC2', 'AWS ECS', 'AWS ECR', 'AWS S3', 'AWS Lambda', 'CloudWatch', 'EventBridge', 'Docker', 'Git', 'GitHub Actions', 'CI/CD', 'Nginx', 'Playwright'] },
  // Split in two: twenty items in one card dwarfed every other group and
  // made the grid look accidental. These are also two different skills.
  { group: 'LLM & Agents',     items: ['LLM Agents', 'Tool / Function Calling', 'Agentic Workflows', 'Prompt Engineering', 'Context Management', 'Streaming Responses', 'Token & Cost Optimisation', 'LangChain', 'Groq', 'Google Gemini', 'OpenAI-compatible APIs'] },
  { group: 'Retrieval & Evals', items: ['RAG', 'Vector Databases', 'pgvector', 'Embeddings', 'Semantic Search', 'Chunking Strategies', 'Guardrails', 'LLM Evals', 'Hallucination Testing'] },
  { group: 'Engineering',      items: ['Distributed systems', 'System design (HLD/LLD)', 'Idempotency & exactly-once', 'Saga / compensating rollback', 'Data migrations', 'Testing & CI', 'OOP', 'DBMS', 'Computer networks', 'DSA'] },
]

// ------------------------------------------------------- AI engineering
/**
 * Framed as learning on purpose. Every line is something that exists in code I
 * wrote, and `proof` says where — a list of things I have read about would be
 * worth nothing here.
 */
export const aiEngineering = {
  heading: 'Learning agents by building them',
  lead:
    'Learned by building, then measuring. All of it exists in code I wrote — ' +
    'mostly Isaa, the assistant inside Finishh Club. None of it from a course.',

  groups: [
    {
      title: 'Agent loop & tool calling',
      body:
        'Call the model, run the tool it asks for, append the result, repeat. A hard ' +
        'step cap, so a confused model cannot loop forever or burn a budget.',
      proof: 'Four tools running in Isaa',
    },
    {
      title: 'Retrieval (RAG)',
      body:
        'Chunks to embeddings to pgvector, in the same Postgres as everything else. ' +
        'Retrieval is a tool the agent may call, not a step bolted on before it runs.',
      proof: 'Recall measured against an 85% target',
    },
    {
      title: 'Reliability & cost',
      body:
        'Tool errors return to the model as observations, not crashes, so it can ' +
        'recover. Bounded waits on rate limits. Tokens counted per run.',
      proof: 'Bounded wait, not a three-minute backoff',
    },
    {
      title: 'Guardrails & safety',
      body:
        'The dangerous rules live in code and in the shape of the tools, never in the ' +
        'prompt alone — a model can ignore a prompt.',
      proof: 'No-verdict rule enforced and tested, not just asked for',
    },
    {
      title: 'Evaluation',
      body:
        'Eval sets rather than unit tests, because the same input does not give the ' +
        'same output twice. Named cases for refusal, grounding and hallucination.',
      proof: 'Refusal, grounding and hallucination suites',
    },
    {
      title: 'Providers & tooling',
      body:
        'Gemini and Groq behind the tool-calling format they share, so the provider ' +
        'swaps without rewriting the agent. Model ids pinned in config.',
      proof: 'Same agent run on both Gemini and Groq',
    },
  ],

  stack: ['Python', 'Groq', 'Google Gemini', 'pgvector', 'PostgreSQL', 'FastAPI', 'Embeddings', 'Evals'],
}

// ------------------------------------------------------------------- services
/**
 * Every service here is something already running in production somewhere, and
 * `proof` says where. A list of capabilities nobody has paid for is a wish list.
 */
export const services = [
  {
    title: 'Backend APIs & Microservices',
    body:
      'REST services in Go, Python or Node, layered so the business rules never end ' +
      'up inside an HTTP handler. Authentication, validation, error handling, OpenAPI ' +
      'docs, and a Docker setup that deploys the same way every time.',
    proof: 'Running in production at Infinite Locus',
  },
  {
    title: 'Event-Driven Pipelines',
    body:
      'Kafka, SNS/SQS or Redis pipelines where the consumer is safe to replay. ' +
      'Idempotency keys, retries, dead-letter handling and per-event sync tracking — ' +
      'so when something does not arrive, you can say exactly where it stopped ' +
      'instead of guessing.',
    proof: 'Keeps two live distribution platforms in agreement',
  },
  {
    title: 'Workflow & Browser Automation',
    body:
      'Playwright bots for portals that have no API — reports, reconciliation, data ' +
      'entry. Distributed locks and checkpoints mean a retry never files the same ' +
      'thing twice, which is the part most automation gets wrong.',
    proof: '15+ bots, 6+ portals, 95%+ success rate',
  },
  {
    title: 'Data Migrations & Clean-Up',
    body:
      'Batched, restartable migrations with an audit trail and a rollback that has ' +
      'actually been tested. De-duplication, canonical merges and schema moves on ' +
      'databases that cannot be taken offline.',
    proof: '32M records merged, zero data loss',
  },
  {
    title: 'Documents & PDF Generation',
    body:
      'Invoices, statements and reports rendered server-side in Go or Python, with ' +
      'real layout control rather than a screenshot of a web page. Delivered through ' +
      'access-controlled signed URLs, not public links.',
    proof: 'Go PDF generation behind S3 signed URLs',
  },
  {
    title: 'LLM Agents & RAG',
    body:
      'An assistant that answers from your data, not from the open internet. Tool ' +
      'calling over your database, retrieval with citations, guardrails written in ' +
      'code, and evals so you can prove a prompt change helped.',
    proof: 'Built Isaa, the assistant inside Finishh Club',
  },
]

// ------------------------------------------------------------------ education
/**
 * `logo` is each institution's own emblem, bundled under public/logos/ rather
 * than hotlinked, so nothing breaks if the source moves. They are the
 * institutions' trademarks, shown here only to identify where I studied.
 * `mark` is a drawn fallback (src/lib/crests.tsx) if an image fails to load.
 */
export const education = [
  {
    logo: 'logos/iit-bhu.png',
    mark: 'iitbhu' as const,
    short: 'IIT (BHU)',
    school: 'Indian Institute of Technology (BHU), Varanasi',
    qualification: 'Bachelor of Technology, Chemical Engineering',
    period: 'Aug 2021 — May 2025',
    place: 'Varanasi, Uttar Pradesh',
  },
  {
    logo: 'logos/jnv.png',
    mark: 'jnv' as const,
    short: 'JNV Prayagraj',
    school: 'Jawahar Navodaya Vidyalaya, Prayagraj',
    qualification: 'Senior Secondary, Class 11 to 12',
    period: '2020 — 2021',
    place: 'Prayagraj, Uttar Pradesh',
  },
  {
    logo: 'logos/jnv.png',
    mark: 'jnv' as const,
    short: 'JNV Bharatpur',
    school: 'Jawahar Navodaya Vidyalaya, Bharatpur',
    qualification: 'Secondary, Class 6 to 10',
    period: '2014 — 2019',
    place: 'Bharatpur, Rajasthan',
  },
]

// --------------------------------------------------------------- achievements
// `logos` are brand marks shown on the card; `stat` counts up when the card scrolls in.
export const achievements: {
  title: string
  detail: string
  logos: string[]
  stat?: { value: number; suffix?: string; label: string }
}[] = [
  {
    title: 'Codeforces Specialist',
    detail: 'Maximum rating 1403.',
    logos: ['Codeforces'],
    stat: { value: 1403, label: 'max rating' },
  },
  {
    title: 'LeetCode Knight',
    detail: 'Maximum rating above 2100.',
    logos: ['LeetCode'],
    stat: { value: 2100, suffix: '+', label: 'max rating' },
  },
  {
    title: '1500+ problems solved',
    detail: 'Across LeetCode, GeeksforGeeks and Codeforces.',
    logos: ['LeetCode', 'GeeksforGeeks', 'Codeforces'],
    stat: { value: 1500, suffix: '+', label: 'problems' },
  },
  {
    title: 'AMCAT certified',
    detail: 'Quantitative aptitude and logical reasoning.',
    logos: [],
  },
]

export const nav = [
  { id: 'about',       label: 'About' },
  { id: 'experience',  label: 'Experience' },
  { id: 'projects',    label: 'Projects' },
  { id: 'skills',      label: 'Skills' },
  { id: 'ai',          label: 'AI Engineering' },
  { id: 'services',    label: 'Services' },
  { id: 'contact',     label: 'Contact' },
]
