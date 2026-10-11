# Portfolio website — plan

## Goal
One site that works for three audiences at once:
1. Recruiters / hiring managers — experience, impact, resume, contact.
2. Freelance clients — what I can build, services, hire-me path.
3. Engineers — technical depth: architecture, system-design and agentic-AI writing.

## Decisions

| Decision | Choice | Why |
|---|---|---|
| Framework | Vite + React + TypeScript | Fast build, small output, no server needed |
| Styling | Hand-written CSS with design tokens | Full control, no framework look, no extra deps |
| Content store | One TypeScript file `src/data/profile.ts` | Edit in one place. No database to run or pay for |
| Routing | None — one page, anchor links | Works on any host with zero rewrite rules |
| Logos | `simple-icons`, bundled at build time | Brand marks on every skill, nothing fetched at runtime |
| Theme | Dark default + light toggle, saved in localStorage | Dark reads as engineering-grade |
| Contact | mailto + copy-email + optional Formspree form | No backend required |
| Output | Static files in `dist/` | Deploy anywhere |

### Why not MongoDB
A database means a Node server and an Atlas cluster running forever, a slower
first paint, and a site that can no longer be hosted on a static host. Portfolio
content changes a few times a year. A file edit plus `git push` is cheaper,
faster and cannot go down. If a browser-based editor is ever wanted, the same
data file can be swapped for an API without touching any component.

## Sections
1. Hero — name, role, one-line pitch, photo, primary links
2. Impact strip — the numbers that matter
3. About
4. Experience — timeline
5. Projects — filterable cards
6. Skills — grouped by layer
7. AI Engineering — what I know about building agents, in six areas
8. Services — for freelance enquiries
9. Education — IIT (BHU) and school. **No marks, scores or percentages anywhere**
10. Achievements
11. Contact + footer

## Rules
- No employer-internal identifiers, ticket numbers or client names.
- No academic scores, percentages or ratings from school.
- Every claim traceable to the resume or to real code in this machine.
- Accessible: keyboard navigation, focus rings, reduced-motion support, contrast.
- Responsive from 320px up. Print-friendly.

## Build order
1. Scaffold + tokens + theme
2. Data file
3. Layout shell, nav, hero
4. Content sections
5. Writing reader
6. Polish: motion, SEO, favicon, print
7. Build, verify, write DEPLOY.md
