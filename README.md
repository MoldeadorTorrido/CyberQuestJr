# CyberQuest Jr.

CyberQuest Jr. is a self-contained, browser-based learning game that introduces young children to cybersecurity fundamentals through short interactive puzzles. Built with a calm, minimalist design and reward-based (not competitive) progression, it currently covers passwords and phishing awareness, with no accounts, data collection, or external dependencies.

See [`cyberquest-spec.md`](./cyberquest-spec.md) for the full product spec.

## Status

Module 1 (Passwords & Phishing Awareness) is complete: all six puzzle units are playable end-to-end, each with its own intro screen, a "?" button to re-open it mid-puzzle, sound effects, and press/animation feedback, all wired into the shared progress-path and badge-shelf persistence.

1. **Weak or Strong?** — sort example passwords into Weak/Strong bins.
2. **Build a Strong Password** — toggle upgrades (longer, capital, number, symbol) and watch a strength meter respond.
3. **Spot the Phishing Email** — tap the suspicious parts of a mock email.
4. **Who Can I Tell My Password To?** — multiple-choice scenarios; the safe answer is always "nobody but a parent."
5. **Real or Fake Link?** — spot the altered look-alike web address.
6. **What Would You Do?** — branching scenarios choosing between an unsafe action and telling a trusted adult.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

Other scripts:

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint     # oxlint
```

## How it works

- **React + Vite**, styled with **Tailwind CSS v4**.
- Routing is a lightweight `HashRouter` (`/` for the path/badge home, `/unit/:unitId` for a puzzle) so the built app works from a plain static file server with no server-side rewrite rules — it also runs fully offline once loaded.
- Progress (completed units, stars, earned badges) is persisted to `localStorage` — no backend, no accounts, no network calls.

```
/src
  /components   ProgressPath, BadgeShelf, StarRating, PuzzleShell, PuzzleIntroScreen,
                HelpButton/HelpModal, ConfettiBurst, SoundToggle, icons, etc.
  /puzzles      One file per puzzle unit (all six units are built).
  /data         Unit definitions, badge definitions, and each puzzle's content.
  /hooks        useProgress (localStorage-backed progress/badge state) and
                usePrefersReducedMotion.
  /context      SoundContext — the mute toggle + synthesized sound effects (Web Audio).
  /pages        Home and PuzzlePage route components.
```

## Content guidelines

All puzzle content is fictional and age-appropriate per the spec: no real brand names (e.g. "PixelPals", "StarQuest"), no fear-based framing, and no real attack techniques — just the basics of what makes a password strong, how to recognize a suspicious message or link, and the one rule that covers all of it: never share your password, and tell a trusted adult if something looks off.
