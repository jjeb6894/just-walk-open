# StepBounty

**Turn daily movement into motivating rewards.**

StepBounty is a polished, local-first walking rewards web app. It gives users a daily step goal, progress tracking, streaks and bounty credits they can redeem against a configurable rewards catalogue.

## Why it is useful

- Responsive landing page and interactive mobile-style dashboard
- Daily step goal, distance, calories, streak and credit tracking
- Reward redemption demo with instant balance updates
- Local-first privacy: no health or location data leaves the browser
- Installable PWA manifest and app icon
- Deployable to Cloudflare Workers as a static asset app
- Simple codebase that is easy to rebrand, extend and connect to a real fitness API

## Product status

This version is a complete front-end demonstration. Step data is simulated and saved in the browser with localStorage. A production owner can add authentication, Apple Health or Health Connect integrations, a rewards partner catalogue and a backend ledger.

## Run locally

```bash
npm install
npm run dev
```

Wrangler prints the local address, usually `http://localhost:8787`.

## Validate and build

```bash
npm run validate
npm run build
```

The production-ready static files are written to `dist/`.

## Deploy

```bash
npm run deploy
```

The included Cloudflare Workers configuration serves the `public/` directory.

## Privacy model

StepBounty is local-first. The demonstration does not request health or location permissions and does not transmit personal activity data.

## Licence

MIT. Commercial operators should replace the demo reward catalogue and complete their own legal, privacy and trademark review before launch.
