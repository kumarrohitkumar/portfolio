# Rohit Kumar — portfolio

A static portfolio site. No database, no server, no monthly bill.
Builds to plain files you can put on any host.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # writes dist/
npm run preview   # serve dist/ locally to check the real build
```

---

## One thing to fill in

| What | Where |
|---|---|
| **LinkedIn URL** | `linkedin` in `src/data/profile.ts`, currently `REPLACE-ME`. Until it is real, the LinkedIn button is hidden rather than broken |
| ~~A photo~~ | Done — `public/photo.webp` with a `.jpg` fallback. Replacing it: crop square, export both formats, keep the names |

---

## Live demos

Four projects are deployed and open to anyone. They are listed once in
`liveDemos` in `src/data/profile.ts`, which feeds both the hero strip and the
project cards, so the two cannot drift apart.

| Project | Live | Sign in with |
|---|---|---|
| Kosh LMS | <https://kosh-lms.vercel.app> · [API docs](https://kosh-lms.vercel.app/api/docs) | `admin@lms.dev` / `Password@123` |
| Chatify | <https://chatify-13-205-125-184.sslip.io> | `ananya@demo.chat` / `demo1234` |
| JobConnect | <https://jobconnect-portal-alpha.vercel.app> | `student@jobconnect.dev` / `Demo@1234` |
| Finishh Club | <https://finishh-club.vercel.app> | no sign-in needed |

If one of these ever goes down, remove it from `liveDemos` and from that
project's `links` — a dead "Live demo" button is worse than no button.

---

## How the projects section is organised

Two groups, because they answer different questions:

| Group | What it holds | How it renders |
|---|---|---|
| **Built and shipped on my own** | The four personal projects, all live | Full cards with metrics, a green **Live demo** button and copy-to-clipboard demo credentials |
| **Systems I own at Infinite Locus** | The four work systems | Compact rows that expand in place — they are internal, so there is nothing to link |

A project lands in a group by its `tags`: `'Personal'` or `'Work'` in
`src/data/profile.ts`. Nothing else needs changing to move one.

---

## Where everything lives

| Path | What it is |
|---|---|
| `src/data/profile.ts` | **Every word on the site.** Edit here, nowhere else |
| `src/styles/global.css` | The whole design. Colours are tokens at the top of the file |
| `src/components/` | The sections. Each one reads from the data file |
| `src/lib/hooks.ts` | Theme, hash routing, scroll reveal, active-section highlight |
| `src/lib/icons.tsx` | Inline SVG icons. No icon library to load |
| `public/Rohit-Kumar-Resume.pdf` | The downloadable resume |
| `public/photo.jpg` | Your photo — add this |

---

## Changing things

**Add a project** — add an object to the `projects` array. It appears
automatically, and its tags become filter buttons.

**Change the colours** — edit the tokens in `:root` at the top of
`global.css`. `--accent` and `--accent-2` drive every highlight, button and
gradient on the page. Light mode has its own block below it.

**Add an AI skill** — add a string to the `AI & Agents` group in `skills`, or a
bullet to a group in `aiEngineering`. Icons are matched automatically from the
label, in `src/lib/logos.tsx`, in three steps: `MAP` for real brand logos from
simple-icons, then `GLYPHS` for hand-drawn concept icons (RAG, embeddings,
guardrails and the rest), then `LETTERS` for the few brands whose name is
already short letters (EC2, S3, SQS). Nothing matched gets a neutral dot.
A glyph's colour comes from one of four families — `AI`, `DATA`, `SAFE`,
`NEUTRAL` — which are CSS tokens (`--g-ai` and friends in `global.css`) so they
darken in light mode.

**Turn on the contact form** — make a free form at formspree.io and paste the
endpoint into `formEndpoint`. Leave it empty and the page shows a clean
"write an email" card instead of inputs that go nowhere.

---

## Why no database

A database means a Node server and a hosted cluster running forever, a slower
first paint, and a site that can no longer go on a static host. Portfolio
content changes a few times a year — a file edit is cheaper, faster, and
cannot go down. The components only read from `profile.ts`, so if you ever do
want a browser-based editor, swapping that file for an API touches nothing else.

---

## What is built in

- Dark and light themes, remembered per browser, no flash on reload
- Responsive from 320px up
- Keyboard navigation, focus rings, `prefers-reduced-motion` respected
- Print stylesheet — the page prints as a clean document
- SEO meta, Open Graph tags and Person structured data
- Brand logos on every skill, bundled locally — nothing fetched at runtime
- Single page, no routing, so it works on any host with no rewrite rules
- 87 KB gzipped total
