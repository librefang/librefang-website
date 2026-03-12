# Librefang Website

This repository contains the Librefang marketing website and install entrypoints. It is not the core Rust codebase.

- Website: `https://librefang.ai`
- Docs: `https://docs.librefang.ai`
- Core repository: `https://github.com/librefang/librefang`

## Overview

This project is a React + Vite single-page site for presenting Librefang's product positioning, features, installation flow, GitHub community stats, visit metrics, and localized content.

The repository currently covers:

- Landing page marketing content and product comparison
- Language-prefixed routes
- Latest GitHub release and community stats display
- Static distribution of install scripts and install metadata
- PWA setup and baseline SEO metadata
- Cloudflare Workers for site stats and visit counting

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 3
- `@tanstack/react-query`
- `lucide-react`
- `vite-plugin-pwa`
- Cloudflare Workers + KV for stats endpoints

## Local Development

### Install dependencies

```bash
pnpm install
```

### Start the dev server

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
```

The production output is written to `dist/`.

### Preview the production build

```bash
pnpm preview
```

### Run linting

```bash
pnpm lint
```

## Project Structure

```text
.
├── src/
│   ├── App.jsx           # Main page sections, UI, and data fetching
│   ├── i18n.js           # Translations and language list
│   ├── index.css         # Global styles and Tailwind component styles
│   └── main.jsx          # React entrypoint and React Query provider
├── public/
│   ├── _headers          # Static hosting response headers
│   ├── _redirects        # Static hosting redirects
│   ├── install.sh        # Public shell installer
│   ├── install.ps1       # Public PowerShell installer
│   ├── sitemap.xml       # Sitemap
│   └── ...               # Logo, OG image, PWA assets, and other static files
├── workers/
│   ├── github-stats-worker/
│   └── visit-counter-worker/
├── install.sh            # Root maintenance script
├── install.ps1           # Root Windows maintenance script
├── install-manifest.json # Install metadata
└── vite.config.js        # Vite and PWA configuration
```

## External Services Used At Runtime

The site runs locally without extra setup, but some sections depend on external services. If those services are unavailable, the related data will be empty or degraded.

- GitHub Releases API
  - The Hero section requests `https://api.github.com/repos/librefang/librefang/releases/latest`
- GitHub stats worker
  - The page requests `https://stats.librefang.ai/api/github`
- Visit counter worker
  - The page requests `https://counter.librefang.ai/api`
  - `index.html` also loads `https://counter.librefang.ai/script.js`
- Google Fonts
  - The `Outfit` font is loaded from `fonts.googleapis.com` and `fonts.gstatic.com`
- Google Analytics
  - `index.html` includes `gtag`

## Content Maintenance

### Copy and translations

Most page copy lives in `src/i18n.js`, including:

- Translations for each language
- Navigation labels
- FAQ content
- GitHub/community section text
- Docs section text
- Language switcher entries

### Page structure

`src/App.jsx` owns the page structure, including:

- Header, Hero, Features, Comparison, Install, FAQ, and other sections
- GitHub stats requests
- Visit counter requests
- Path-prefix-based language detection

### SEO and third-party scripts

`index.html` contains:

- `title` and `description`
- Open Graph and Twitter Card metadata
- `canonical`
- Initial language detection script
- Google Analytics
- Visit counter script injection

### Static assets and install files

`public/` contains:

- Logo, mascot, OG image, and PWA assets
- `robots.txt`
- `sitemap.xml`
- Public `install.sh` and `install.ps1`

`install-manifest.json` records installer channels and binary download metadata.

## Localized Routes

Current path prefixes:

- `/` -> English
- `/zh/` -> Simplified Chinese
- `/zh-TW/` -> Traditional Chinese
- `/de/` -> Deutsch
- `/ja/` -> Japanese
- `/ko/` -> Korean
- `/es/` -> Spanish

If you add a new language, update at least these locations:

1. Add translations and a `languages` entry in `src/i18n.js`
2. Add path detection in `src/App.jsx`
3. Add path detection in the bootstrap script inside `index.html`
4. Add the new URL to `public/sitemap.xml`

## PWA and Build Notes

PWA support is configured in `vite.config.js` through `vite-plugin-pwa`:

- Auto-updating service worker registration
- Pre-caching for common static assets
- `manifest.webmanifest` output
- App name, theme color, and icon configuration

The build also creates basic vendor chunks:

- `vendor-react`
- `vendor-query`

## Workers

### `workers/github-stats-worker`

Purpose:

- Aggregates GitHub stars, forks, issues, PRs, and downloads
- Caches responses in KV
- Records daily history through a cron trigger

Endpoint:

- `GET /api/github`

Dependencies:

- KV binding: `KV`
- Optional secret: `GITHUB_TOKEN`

### `workers/visit-counter-worker`

Purpose:

- Tracks site visits
- Exposes a stats endpoint for the frontend
- Serves an embeddable tracking script

Endpoints:

- `GET /api`
- `POST /api/track`
- `GET /script.js`

Dependencies:

- KV binding: `VISIT_COUNTER`

### Before deploying workers

- Replace the `account_id` and KV namespace IDs in each `wrangler.toml` before using a different Cloudflare account
- If worker domains change, update:
  - `src/App.jsx`
  - `index.html`
  - `public/_headers`

Example commands:

```bash
cd workers/github-stats-worker
wrangler deploy
wrangler secret put GITHUB_TOKEN

cd ../visit-counter-worker
wrangler deploy
```

## Static Deployment

This is a standard Vite static site. A typical production deploy flow is:

```bash
pnpm build
```

Then deploy `dist/` to any static hosting provider.

If your platform supports `_headers` and `_redirects`, you can reuse the files in `public/`. The repository already includes:

- Security headers
- CSP rules
- Static asset cache policies

## Maintenance Notes

- When changing installer resources, check the root scripts, the matching files under `public/`, and `install-manifest.json`
- When changing stats domains, verify the CSP allowlist in `public/_headers`
- When changing locale paths, update both `sitemap.xml` and the initial language detection logic
- When adding third-party scripts, update CSP before shipping

## Command Quick Reference

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
```
