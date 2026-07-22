# CyberQuest Jr.

CyberQuest Jr. is a self-contained, browser-based learning game that introduces young children to cybersecurity fundamentals through short interactive puzzles. Built with a calm, minimalist design and reward-based (not competitive) progression, it currently covers passwords and phishing awareness, with no accounts, data collection, or external dependencies.

See [`cyberquest-spec.md`](./cyberquest-spec.md) for the full product spec.

## Status

This is a working vertical slice: the Home screen (progress path + badge shelf) and the first puzzle, **"Weak or Strong?"**, are fully playable and wired end-to-end into progress/badge persistence. The remaining five puzzles in Module 1 are stubbed as "coming soon" placeholders on the path so the full module structure is visible.

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
  /components   ProgressPath, BadgeShelf, StarRating, PuzzleShell, icons, etc.
  /puzzles      One file per puzzle unit (WeakOrStrong.jsx is the only built one so far).
  /data         Unit definitions, badge definitions, puzzle content.
  /hooks        useProgress — the localStorage-backed progress/badge state.
  /pages        Home and PuzzlePage route components.
```

## Content guidelines

All puzzle content is fictional and age-appropriate per the spec: no real brand names, no fear-based framing, and no real attack techniques — just the basics of what makes a password strong and how to recognize a suspicious message.
