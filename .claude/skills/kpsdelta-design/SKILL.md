---
name: kpsdelta-design
description: Design language, inspiration and dev rules for the kpsdelta.ba website (KPS Delta, practical shooting club, Sarajevo). Load before any UI, layout, styling, page or component work in this repo, or when the user asks for design ideas, redesigns or new sections.
---

# KPS Delta — website design & development guide

KPS Delta (Klub praktičnog streljaštva Delta) is a practical-shooting club at Sportsko strelište Žuč, Sarajevo, BiH.
The site is Next.js 15 (App Router, Turbopack) + React 19, styled with CSS Modules **and** styled-components (both are used; follow whatever the file already uses).
All user-facing copy is **Bosnian** (ijekavica: "vježbe", "obezbijeđena"). Brand tagline: "AIM AND HIT. SIMPLE AS THAT."

## Inspiration (owner's explicit references, observed in browser 2026-11-23)
- **https://www.trex-arms.com/**: actually a LIGHT site (white/light-grey ground, near-black header and footer, one red accent). Personality comes from photography and blunt copy, not ornament. Signature components: a full-width red announcement bar; big category tiles (grayscale photo + ONE huge bold centred word, 2-up on desktop, stacked full-width on mobile); a horizontal product scroller; a plain 4-column dark footer with DUNS/CAGE codes as a quiet credential line.
- **https://adaptivdefense.com/** (owner especially loves its MOBILE view): photo-first and almost chrome-free. Video hero, edge-to-edge stacked product photos, each with ONE thin-outlined uppercase label, one wide uppercase sans throughout, a minimal centred-logo header with burger, a one-line mission + CAGE code in a very quiet dark footer.
- Lesson: both are RESTRAINED. Tactical feel = strong photography + big confident type + very few UI devices. Stacking many "tactical" signifiers (mono labels, brackets, codes, tickers, grid backgrounds, pulsing dots) reads as AI-template / vibe-coded. The owner said so of the first pass.
- The live main site's home (4 stacked photo tiles with one centred word each) already matches this pattern. Elevate it rather than replace it.

## Design system (src/app/globals.css) — restraint first
- Colors: dark only (owner's choice). `--background #0c0d0b`, `--surface #151713`, `--border`, `--border-strong`, `--muted`, **accent `--accent #ceff51` (lime)**, `--danger`. Lime is for buttons, the announcement bar, the footer sign-up band, active states and small accents only.
- Type: ONE family, **Mohave** (`--font-mohave`), uppercase for headings/nav/buttons. Big, confident headings (clamp up to ~5.6rem). No monospace font (it was tried and rejected as vibe-coded).
- One small utility: `.label` (small uppercase, letter-spaced, muted) for spec labels / kickers. Use sparingly.
- Shapes: square corners, plain 1px borders, no chamfers, no brackets, no grid backgrounds, no glows.
- Photos: full colour at rest with a dark gradient for text legibility. On hover a lime tint (`mix-blend-mode: color`, ~55%) plus a slight zoom. Do NOT use grayscale at rest: the owner said it makes tiles look disabled.
- Components that exist and were approved by the owner:
  - Navbar: full-width lime **announcement bar** (driven by `trainings.ts`), sticky dark header, plain links, lime "UČLANI SE" button.
  - Home: **4 photo tiles** (Učlani se / Obuka / Drills / Leaderboard). 2x2 on desktop, stacked full-width on mobile, one huge centred word plus a short line. Then ONE club section (squad photo + "AIM AND HIT. SIMPLE AS THAT.").
  - Obuka: underline tabs, a **spec sheet** (`<dl>` grid: lokacija/datum/trajanje/polaznika), description, "Šta je potrebno?" list with lime dashes.
  - Footer: lime **sign-up band** ("SPREMAN ZA PRVI KORAK?" + Učlani se + WhatsApp), then plain columns and a quiet bottom line.
- REJECTED, do not reintroduce: monospace labels, `[01]`/`//` section indices, invented course codes (DLT-P1), GPS coordinates, corner brackets, chamfered buttons, pulsing status dots, marquee/ticker, blueprint grid, process strip with invented copy, giant outlined footer wordmark, credential stamps, crosshair/reticle/scope graphics.
- Shared primitives: `components/ui/Editorial.tsx` (`PageContainer`, `PageHeading`, `buttonStyles`, `ButtonLink`), `components/ui/FormStyles.tsx` (form shell, which is unframed on mobile, plus inputs, `StatusBox`, `Spinner`).
- Visual QA: view every change in the browser at desktop AND ~400px mobile before reporting. If the Chrome window won't resize, render same-origin iframes at 400px width.

## Data
- Training programs live in `src/app/lib/trainings.ts` (single source of truth for /obuka tabs and the navbar announcement). `open: false` → "COMING SOON" + disabled signup. `leaderboardUrl` is exported from there too.
- Keep the original Bosnian copy verbatim when restructuring content.

## Non-negotiables (functionality must survive any redesign)
- Forms and their API routes: `/api/register` (membership, photo upload), `/api/register/pistol1` (group slots), `/api/register/lowlight`, `/api/contact`. Don't change field `name`s, FormData keys or endpoints.
- Pistol 1 slot visibility/full logic in `src/app/prijava/pistol1/page.tsx` (Google Sheets counts) stays untouched. Lowlight disables at 10 signups.
- `/obuka?tab=pistol|lowlight` deep links (navbar dropdown uses them); tabs keep ARIA + arrow-key navigation.
- Accessibility already in place: skip link, focus-visible outlines, aria-current, Escape closes menus, 44px tap targets, reduced-motion support.
- Leaderboard: `app.kpsdelta.ba` in prod, `kpsdeltaapp.netlify.app` otherwise.

## Workflow
- Branch off the current design branch; never push/commit to `main` without being asked.
- Verify with `npx tsc --noEmit -p .` and `npx next lint`, then `npm run dev` and hit every route (/, /obuka, /drills, /o-nama, /kontakt, /prijava, /prijava/pistol1, /prijava/lowlight). If a route 500s on fonts after config changes, `rm -rf .next` and restart.
- Don't invent facts about the club (affiliations, founding year, stats). Ask the owner.
