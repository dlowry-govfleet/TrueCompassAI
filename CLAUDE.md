# True-Compass.AI — Project Guide

Marketing website for **True-Compass.AI**, an AI consulting/app-development studio
(founder: David Lowry, Ben Wheeler, Texas). Static site, no framework, no build step.

- **Live site:** https://true-compass.ai (note the hyphen) — also https://truecompass-ai.web.app
- **Hosting:** Firebase Hosting, project `truecompass-ai`
- **Repo:** https://github.com/dlowry-govfleet/TrueCompassAI (default branch `main`)

## Stack & layout

Plain HTML + CSS + vanilla JS. There is **no bundler, package manager, or build
step** — files are served exactly as they sit in the repo (`firebase.json` sets
`public: "."`). Edit a file, refresh the browser, done.

```
index.html                     Homepage (single page, anchor-nav sections)
css/styles.css                 All homepage styles (design tokens in :root at top)
js/main.js                     All homepage JS (one DOMContentLoaded block)
case-studies/govfleet/index.html   GovFleet.AI case study — SELF-CONTAINED (own inline
                                   CSS/JS, own fonts; does NOT use css/ or js/)
assets/                        Images, logo, favicons, headshot, screenshots
robots.txt, sitemap.xml        SEO — update sitemap when adding a page
firebase.json, .firebaserc     Hosting config
```

Homepage sections (anchor IDs, also the nav links): `#hero`, `#about`,
`#services`, `#portfolio`, `#approach`, `#contact`. There's also a `.tech-stack`
section ("Built with the Best in AI") with no ID.

## Conventions

- **Design tokens** live in `:root` at the top of `css/styles.css` — colors,
  fonts, `--radius`, `--transition`. Reuse them; don't hardcode hex/timings.
- **Fonts:** homepage uses Inter (body) + Space Grotesk (headings). The case
  study deliberately uses a different set (Fraunces / Archivo / JetBrains Mono) —
  keep the two designs independent.
- **Theme is dark.** Backgrounds `#0a0e1a`–`#1a2035`; primary `#0ea5e9` (sky),
  accent `#f97316` (orange), often combined as `--gradient-primary`.
- **Contact form** has no backend — `js/main.js` builds a `mailto:` to
  `dlowry@true-compass.ai`. Keep that address in sync if it changes.
- Reference files in chat with markdown links (e.g. `[styles.css](css/styles.css)`),
  not backticks — this is a VS Code workspace.

## Run / preview

It's a static site — just open the file:

```bash
open index.html                       # homepage
open case-studies/govfleet/index.html # case study
```

Hard-refresh (⌘⇧R) after CSS/JS edits to bypass cache.

## Deploy

Commit + push to `main`, then deploy to Firebase Hosting:

```bash
firebase deploy --only hosting        # project: truecompass-ai
```

Deploy is **manual** — pushing to GitHub does **not** auto-publish. After adding
a new page, also add its URL to `sitemap.xml`.

## Gotchas learned the hard way

- **`backdrop-filter` traps fixed children.** A `backdrop-filter` (or `filter`,
  `transform`) on an element makes it the *containing block* for any
  `position: fixed` descendant. The navbar's scrolled-state blur once trapped the
  full-screen mobile menu overlay inside the navbar's box, clipping the top links.
  It's disabled at ≤768px for this reason (see the comment in `styles.css`). Don't
  re-add blur to `.navbar.scrolled` on mobile.
- **The navbar is intentionally static.** It no longer resizes on scroll (that felt
  buggy); scrolling only fades in the background. Keep logo/padding constant across
  the `.scrolled` state.
- **Domain has a hyphen:** `true-compass.ai`. A separate `truecompass.ai`
  (no hyphen) is an unrelated parked domain — don't link to it.
- The case study page is fully standalone. Changing `css/styles.css` does **not**
  affect it; edit the case study's own inline `<style>` block.
</content>
</invoke>
