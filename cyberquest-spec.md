# CyberQuest Jr. — Product Spec Sheet
### Gamified Cybersecurity Fundamentals for Kids (Ages 8–10)

---

## 1. Project Summary

**CyberQuest Jr.** is a browser-based, single-player learning web app that teaches core cybersecurity concepts to children (target: two 9-year-olds) through short, self-contained puzzles and exercises. The app rewards correct completions with collectible badges and a visible progress trail, reinforcing learning through positive feedback rather than time pressure, penalties, or competitive scoring.

**Platform:** Web application (responsive; must work well on desktop, tablet, and phone browsers).
**Scope (v1):** One focused module — **Passwords & Phishing Awareness**.
**Visual style:** Minimalist / clean puzzle-app aesthetic — not cartoon-heavy. Calm color palette, generous whitespace, large legible type, simple flat iconography (no mascots or story-driven characters).

---

## 2. Target User

- Age: 8–10 years old, comfortable using a mouse/touchscreen and reading independently.
- No prior technical or cybersecurity knowledge assumed.
- Sessions should be short (5–10 minutes) since attention spans at this age are limited.
- Parent/guardian may sit alongside but the app should be usable independently.

---

## 3. Learning Objectives (Module 1: Passwords & Phishing)

By the end of this module, the child should be able to:

1. Explain in their own words why passwords protect accounts.
2. Distinguish a strong password from a weak one, and understand *why* (length, unpredictability, not reusing personal info like names/birthdays).
3. Recognize the basic anatomy of a phishing attempt (urgency, too-good-to-be-true offers, requests for passwords/personal info, suspicious sender).
4. Understand the rule: "Never share your password, even with someone who says they're from a company or a friend's account."
5. Know the correct action when something looks suspicious: don't click, tell a trusted adult.

Content must be **age-appropriate, non-alarming, and non-technical** — no real malware behavior, no real exploit techniques, no content implying the child should attempt hacking of any kind. Framing throughout should be defensive and empowering ("you are the guard of your own castle"), not fear-based.

---

## 4. Gamification Mechanics

| Mechanic | Description |
|---|---|
| **Puzzle units** | Each concept is taught via one short interactive puzzle (drag-and-drop, multiple choice, sorting, or spot-the-difference). No unit should take more than ~2 minutes. |
| **Stars, not scores** | Each puzzle awards 1–3 stars based on completion (not speed). No countdown timers, no "fail" states that feel punitive — wrong answers give a gentle hint and a retry. |
| **Badge collection** | Completing a themed set of puzzles (e.g., "Password Basics") unlocks a badge added to a visible badge shelf. |
| **Progress path** | A simple horizontal path/map shows completed vs. locked units — gives a sense of journey without a story/narrative overlay. |
| **No leaderboards, no multiplayer, no social sharing.** | Age-appropriate; avoids competitive pressure and any external data exposure. |

---

## 5. Proposed Puzzle Set (Module 1 — 6 units)

1. **"Weak or Strong?"** — Sort a list of example passwords into Weak / Strong bins. Feedback explains *why* each one is weak or strong.
2. **"Build a Strong Password"** — Interactive builder where dragging in elements (length, symbols, avoiding personal info) visibly changes a strength meter.
3. **"Spot the Phishing Email"** — Present a mock email (clearly fictional business/sender); child taps on the suspicious elements (urgent tone, misspelled link, request for password).
4. **"Who Can I Tell My Password To?"** — Multiple choice scenarios (a friend, a stranger claiming to be tech support, a game asking to "verify your account") — correct answer is always "nobody, except a parent."
5. **"Real or Fake Link?"** — Compare two similar-looking web addresses (e.g., `mygame.com` vs `mygame-login.net`) and identify which looks altered.
6. **"What Would You Do?"** — Short branching scenario: child receives a suspicious message and picks the safe next step (tell an adult vs. click/reply).

All email/website examples must use **entirely fictional brand names** — do not reference real companies, games, or platforms, to avoid both IP concerns and inadvertently teaching real-world lookalike domains.

---

## 6. Functional Requirements

- **No login/account system required for v1** — progress can be stored in browser local storage. (If persistent user storage across devices is wanted later, note it as a v2 consideration; do not collect any real personal data from the child.)
- **No external network calls** other than serving static assets — this is a self-contained educational app with no data collection, analytics, or third-party trackers.
- Fully keyboard- and touch-navigable; large tap targets (min 44x44px).
- All text at a 3rd–4th grade reading level; short sentences; optional read-aloud (text-to-speech) is a nice-to-have, not required for v1.
- Should work fully offline once loaded (static site, no backend dependency for v1).

---

## 7. Non-Functional / Design Requirements

- **Visual style:** minimalist, clean, flat design. Muted/calm palette (soft blues, greens, warm neutrals) — avoid saturated "alarm" colors like red/black used heavily, since the tone should be empowering, not scary.
- **Typography:** rounded, highly legible sans-serif; large sizes (18px+ body text).
- **Accessibility:** sufficient color contrast, no reliance on color alone to convey correct/incorrect (use icons/shapes too).
- **No dark patterns:** no artificial urgency, no ads, no in-app purchases, no external links.

---

## 8. Suggested Tech Stack

- **Frontend:** React (functional components + hooks), single-page app.
- **Styling:** Tailwind CSS (utility classes) for rapid, consistent minimalist styling.
- **State/progress persistence:** browser `localStorage`, keyed by puzzle/unit ID.
- **No backend required for v1.**
- Structure suggestion:
  ```
  /src
    /components   (PuzzleCard, ProgressPath, BadgeShelf, StarRating, etc.)
    /puzzles      (one file per puzzle unit, each exporting content + logic)
    /data         (puzzle definitions, badge definitions)
    App.jsx       (routes between: Home/Path view, Puzzle view, Badge Shelf)
  ```

---

## 9. Out of Scope for v1 (explicitly)

- Additional modules beyond Passwords & Phishing (e.g., malware, encryption, social engineering beyond phishing) — reserve for future versions once v1 is validated.
- Multiplayer, leaderboards, or social features.
- Real user accounts, cloud sync, or data collection.
- Any content demonstrating actual attack techniques, code, or tools.

---

## 10. Success Criteria for v1

- Both intended users (the two 9-year-olds) can complete all 6 puzzle units unassisted in under 20 minutes total.
- Each child can correctly answer 4/5 informal follow-up questions about password/phishing basics after playing.
- No unit requires adult intervention to understand the instructions.

---

## 11. Instructions to Claude Code

Please scaffold this as a React + Tailwind single-page web app implementing Section 5's six puzzle units, the progress path and badge shelf from Section 4, and the minimalist visual style from Section 7. Use local storage for progress persistence per Section 6. Keep all content kid-appropriate per Section 3's constraints (no real brand names, no fear-based framing, no actual attack techniques). Prioritize a working vertical slice (one full puzzle end-to-end, wired into progress/badges) before building out all six units.
