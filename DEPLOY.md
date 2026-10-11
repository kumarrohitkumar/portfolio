# Deploying

`npm run build` produces `dist/`. That folder is the entire website — static
files, nothing to run. `base: './'` in `vite.config.ts` means it works from a
domain root or from a subfolder without any change.

Pick one.

---

## Vercel

```bash
npm i -g vercel
vercel          # first time, answer the prompts
vercel --prod
```

Or connect the repo on vercel.com. Build command `npm run build`,
output directory `dist`.

## Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Or drag the `dist` folder onto app.netlify.com/drop.

## GitHub Pages

```bash
npm run build
npx gh-pages -d dist
```

Then Settings → Pages → source `gh-pages`. Hash routing means deep links to
articles work here with no extra configuration.

## Cloudflare Pages

Connect the repo. Build command `npm run build`, output directory `dist`.

## Render

New → Static Site. Build command `npm run build`, publish directory `dist`.

## AWS S3 + CloudFront

```bash
npm run build
aws s3 sync dist/ s3://YOUR-BUCKET --delete
aws cloudfront create-invalidation --distribution-id YOUR-ID --paths "/*"
```

Set the bucket's index document to `index.html`.

## Your own server (nginx)

```bash
npm run build
scp -r dist/* user@server:/var/www/portfolio/
```

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/portfolio;
    index index.html;
    location / { try_files $uri $uri/ /index.html; }
}
```

## Docker

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

---

## Before you deploy

- [ ] Real LinkedIn URL in `src/data/profile.ts`
- [ ] Once you know the domain, make the share image absolute in `index.html`:
      `<meta property="og:image" content="https://your-domain.com/og.png" />`.
      LinkedIn and WhatsApp resolve relative image URLs unreliably.
- [ ] Confirm the TalkNet repo link — it currently points at `chat_app`
- [ ] School name and years filled in
- [ ] `public/photo.jpg` added
- [ ] Resume PDF in `public/` is the current one
- [ ] `npm run build && npm run preview` — click through it once
