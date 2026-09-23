# Just Walk Open

An editable, open-source walking rewards web app. It is a local-first demo: step counts, goals, streaks, and reward redemptions are stored only in the browser.

## What is included

- Responsive landing page and interactive web app
- Daily step goal, distance, calories, streak, and credits
- Redeemable rewards demo
- Progressive web app manifest
- Cloudflare Workers configuration
- MIT license

## Edit locally

```bash
npm install
npm run dev
```

Open the local URL Wrangler prints. The editable application files are:

- `public/index.html` — page content and layout
- `public/styles.css` — visual design and responsive rules
- `public/app.js` — steps, goals, credits, and reward data

## Validate and build

```bash
npm run validate
npm run build
```

## Deploy to Cloudflare

```bash
npm run deploy
```

The first deployment requires a signed-in Cloudflare account. Wrangler publishes the site to a `workers.dev` URL. Add a custom domain in Cloudflare when ready.

## Open-source repository

Create a GitHub repository, then run:

```bash
git init
git add .
git commit -m "Initial open-source Just Walk build"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/just-walk-open.git
git push -u origin main
```

## Privacy

This demo is intentionally browser-only. It does not read phone health data, use location, or send user data anywhere. Production health/step integrations need platform-specific permissions and an appropriate privacy policy.
