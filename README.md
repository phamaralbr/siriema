# Siriema - Expedition Catalog

A static catalog site for a travel agency. No backend, no database: Astro generates the pages, Sveltia CMS edits the content, GitHub Pages hosts it for free.

![Site preview](public/preview.png)

## Stack

- **Astro** — static site generator
- **Sveltia CMS** — git-based content editor, lives at `/admin`
- **Tailwind CSS** — styling
- **GitHub Actions + GitHub Pages** — build and hosting

## Project structure

```
src/
  components/       Header, Footer, expedition card, WhatsApp CTA, itinerary timeline, etc.
  config/site.ts     agency name, WhatsApp number, social links — edit here
  content/
    config.ts         schema for expeditions (required/optional fields)
    expeditions/       one folder per expedition (index.md + cover.jpg)
  lib/                date formatting, base-path helper
  pages/              home page + expedition detail pages
public/
  admin/              Sveltia CMS panel and config
```

## Running locally

```bash
npm install
npm run dev
```

## Adding an expedition

Either through `/admin` once deployed, or by copying an existing folder in `src/content/expeditions/` (each expedition is a folder with an `index.md` and a `cover.jpg` side by side).

Required: `title`, `subtitle`, `cover`, `location`, `durationDays`, `date`, `priceFrom`. Everything else is optional.

A few fields worth knowing:

- **`date`** — each expedition happens once. It drops off the home page automatically once this date passes; no manual cleanup needed.
- **`endDate`** — optional. Set it to show a range ("11 to 14 September 2026") instead of a single date.
- **`esgotado`** — set to `true` when sold out. Grays out the cover image, adds a label, removes the booking buttons. The expedition stays visible, just not bookable.

## Deploying

Push to `main` — GitHub Actions builds and publishes automatically. Before the first deploy:

1. In `astro.config.mjs`, set `site` to your GitHub Pages URL and `base` to your repo name (skip `base` if the repo is named `username.github.io`).
2. In `public/admin/config.yml`, set `repo` to `username/reponame`.

## CMS access

Open `/admin/index.html`, click **Sign In with Token**, follow the link to generate a GitHub personal access token, paste it back. No OAuth server to run.

## Images

Each expedition's cover photo lives next to its content file (`src/content/expeditions/<slug>/cover.jpg`), not in `public/`. Astro's built-in image pipeline (`astro:assets`) picks it up automatically at build time: resizes it to several widths, converts it to WebP, and generates the `srcset`/`sizes` so phones get a smaller file than desktops.

Upload full-size camera photos without worrying about it — nothing needs pre-compressing by hand. The CMS (`/admin`) is already configured to save new uploads into the same folder as the expedition being edited, which is what makes this work.

## Editing agency details

WhatsApp number, agency name, tagline, social links — all in `src/config/site.ts`.
