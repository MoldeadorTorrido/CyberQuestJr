// Content for the "Real or Fake Link?" puzzle (unit 5).
// Every brand/domain here is entirely fictional. Each round shows one real
// address and one altered look-alike; the child taps the altered one.
// Option order is varied round to round so the fake link isn't always in
// the same spot.
export const ROUNDS = [
  {
    id: 'pixelpals',
    options: [
      { id: 'fake', label: 'pixelpals-login.net', correct: true },
      { id: 'real', label: 'pixelpals.com', correct: false },
    ],
    reason:
      'The real address is just "pixelpals.com". Adding extra words like "-login" and changing the ending to ".net" is a trick to look official.',
  },
  {
    id: 'starquest',
    options: [
      { id: 'real', label: 'starquest.com', correct: false },
      { id: 'fake', label: 'starqvest.com', correct: true },
    ],
    reason:
      'Look closely — the "u" was swapped for a "v"! Swapped letters are a sneaky trick to fool your eyes.',
  },
  {
    id: 'moonjump',
    options: [
      { id: 'fake', label: 'moon-jump-games.net', correct: true },
      { id: 'real', label: 'moonjumpgames.com', correct: false },
    ],
    reason:
      'The real address has no dashes and ends in ".com". Extra dashes and a different ending can make a fake site look almost right.',
  },
  {
    id: 'candycrafters',
    options: [
      { id: 'real', label: 'candycrafters.com', correct: false },
      { id: 'fake', label: 'candycraft3rs.com', correct: true },
    ],
    reason:
      'The "e" was swapped for a "3"! Letter-to-number swaps are another trick to make a fake address look almost the same.',
  },
  {
    id: 'dragontown',
    options: [
      { id: 'fake', label: 'dragontown-rewards.com', correct: true },
      { id: 'real', label: 'dragontown.com', correct: false },
    ],
    reason:
      'The real address is just "dragontown.com". Adding a tempting word like "-rewards" doesn\'t make it the real site.',
  },
]
