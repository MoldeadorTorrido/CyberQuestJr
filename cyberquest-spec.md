# CyberQuest Jr. — Product Spec Sheet
### Gamified Cybersecurity Fundamentals for Kids (Ages 8–10)

---

## 1. Project Summary

**CyberQuest Jr.** is a browser-based, single-player learning web app that teaches core cybersecurity concepts to children (target: two 9-year-olds) through short, self-contained puzzles and exercises. The app rewards correct completions with collectible badges and a visible progress trail, reinforcing learning through positive feedback rather than time pressure, penalties, or competitive scoring.

**Platform:** Web application (responsive; must work well on desktop, tablet, and phone browsers).
**Scope (v1):** One focused module — **Passwords & Phishing Awareness**.
**Visual style (updated after v1 vertical-slice review):** Vibrant and playful, not cartoon/mascot-driven. Started as a minimalist aesthetic; user testing showed it read as flat and uninteresting to the target age group, so the direction shifted toward a more saturated color palette, micro-animations on key interactions, and short sound effects — while keeping the app calm and non-chaotic overall (see Section 7 for full detail).

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

**Intro screen requirement:** The target age group (8–10) may not yet know key terms the puzzles are built around (e.g., "password," "phishing," "link"). Each puzzle unit must open with a brief, plain-language intro (1–2 sentences, one simple concrete example) explaining the key term before any interaction begins — e.g., unit 1 explains what a "password" is, unit 3 explains what "phishing" means, unit 5 explains what a "link" is. Dismissible with a clear "Let's play!" button; also reachable again via a small "?" icon during the puzzle itself, in case the child forgets.

---

## 5b. Module 2: Everyday Digital Safety (Post-MVP)

Building on Module 1's password/phishing foundation, Module 2 covers broader digital-safety habits relevant to the target age group's actual device and gaming use.

**Learning objectives:**
1. Understand what a screen lock protects and why app permission requests (location, contacts, microphone) aren't always necessary just because an app asks.
2. Understand that anything posted online can be seen by more people than intended and can be hard to fully take back — framed positively ("think before you post"), not as a scare tactic.
3. Recognize scam patterns beyond email: fake "you won a prize" pop-ups, too-good-to-be-true in-game offers, and a "friend" account asking for gift card codes or account details.
4. Recognize a specific, non-graphic set of grooming red-flag behaviors in game/chat contexts, and know the correct response is always to tell a trusted adult. This topic requires careful, age-appropriate handling — see the dedicated guidance below.
5. Understand basic device hygiene: keeping apps/devices updated, and why downloading "free" things from random sites/links can be risky — kept simple and non-technical.

**Proposed puzzle units (Module 2):**
1. **"Lock It Up"** — Simple matching/sorting: what a screen lock protects vs. doesn't; which app permission requests make sense for a given app (e.g., a flashlight app asking for your contacts is a mismatch).
2. **"Think Before You Post"** — Scenario-based: given an example fictional post, decide whether it's safe to share or should be rethought (e.g., posting a photo showing your school in the background).
3. **"Too Good to Be True"** — Sort fictional offers/pop-ups into "safe" vs. "scam," reinforcing the phishing pattern-recognition from Module 1 across new formats (in-game offers, prize pop-ups).
4. **"Who's Really There?"** — Gaming/chat safety unit (see dedicated guidance below).
5. **"Keep It Updated"** — Simple explainer + light interaction on why updates and avoiding random downloads matter, kept very light-touch since this is the least urgent topic for this age group.

**Dedicated guidance for the "Who's Really There?" unit (gaming/chat safety, grooming awareness):**
- Content must stay entirely pattern-level, not narrative or graphic. No storyline depicting an actual grooming scenario in detail — instead, present a short list of behavior patterns as multiple-choice "is this a red flag?" checks: asking to keep a friendship secret from parents, asking to move the conversation to a different app, asking for photos, offering gifts/in-game currency in exchange for secrecy or personal info, or asking to meet in person.
- Every scenario must resolve to the same single correct action: stop responding, don't delete the messages, and tell a trusted adult right away — including explicit reinforcement that this holds true *especially* if the other person said not to tell anyone.
- Reinforce that this applies even to people who seem like genuine "friends" over time (trust built gradually is still a red flag pattern, not an exception to it), and that none of this is ever the child's fault.
- Avoid any framing that could read as instructional to a bad-faith reader — this unit teaches recognition and the correct response, nothing about how such approaches are carried out.
- Given the sensitivity of this topic, this unit's copy should be drafted conservatively and reviewed by the parent (you) before shipping, more so than any other unit in the app.

---

## 5c. Localization (English/Spanish)

The app must support both English and Spanish within a single deployment (one URL, one codebase) via a language toggle button, following the same UI pattern as the existing sound-mute toggle (small, persistent icon button visible on every screen, defaults to a sensible starting language, choice persisted to localStorage).

All user-facing text must be localized: unit titles/blurbs, puzzle intro screens, puzzle content and feedback/hint text, badge names/descriptions, and the Home screen copy. Puzzle *data* that is language-independent (e.g., which password is objectively weak vs. strong) stays the same across languages; only the displayed text changes.

Fictional names/brands used in examples should have natural-sounding equivalents in each language rather than being awkwardly transliterated.

---

## 6. Functional Requirements

- **No login/account system required for v1** — progress can be stored in browser local storage. (If persistent user storage across devices is wanted later, note it as a v2 consideration; do not collect any real personal data from the child.)
- **No external network calls** other than serving static assets — this is a self-contained educational app with no data collection, analytics, or third-party trackers.
- Fully keyboard- and touch-navigable; large tap targets (min 44x44px).
- All text at a 3rd–4th grade reading level; short sentences; optional read-aloud (text-to-speech) is a nice-to-have, not required for v1.
- Should work fully offline once loaded (static site, no backend dependency for v1).

---

## 7. Non-Functional / Design Requirements

**Revision note:** The original v1 direction (minimalist/flat, muted palette) was implemented and tested, but read as too plain and uninteresting for the target age group. The requirements below supersede the original palette/animation guidance; the underlying interaction logic, routing, and progress/badge persistence are unaffected.

- **Visual style:** Vibrant and playful, but not chaotic or cartoon/mascot-driven. More saturated color palette than the original minimalist version, with color used meaningfully — e.g., a distinct accent color per puzzle unit on the progress path, and a warm celebratory palette for correct-answer and badge-unlock moments. Avoid saturated "alarm" colors like heavy red/black, since the tone should stay empowering, not scary.
- **Micro-animations:** Short (150–400ms), snappy animations on key interactions — button press feedback, cards sliding/settling into place when sorted correctly, a gentle non-punitive "shake" nudge on incorrect answers, and a satisfying badge-unlock celebration (e.g. a burst/confetti effect, scale-and-glow on the badge icon).
- **Sound:** Short (under 1 second), non-jarring sound effects for key moments — a soft positive chime for correct answers, a gentle neutral tone for incorrect ones, and a slightly bigger celebratory sound for badge unlocks. A mute/sound-toggle control must be visible on every screen, defaulting to ON.
- **Motion/sound accessibility:** Respect the `prefers-reduced-motion` OS setting by reducing or skipping animations for users who have it enabled. Maintain accessible contrast ratios even with the more saturated palette.
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
