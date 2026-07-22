// Content for the "Real or Fake Link?" puzzle (unit 5).
// Every brand/domain here is entirely fictional. The URLs themselves are
// language-independent puzzle data — they're not prose, and the alteration
// pattern (swapped letter, extra dash, etc.) is the point, so they stay the
// same in both languages. Only the `reason` explanation is bilingual.
// Option order is varied round to round so the fake link isn't always in
// the same spot.
export const ROUNDS = [
  {
    id: 'pixelpals',
    options: [
      { id: 'fake', label: 'pixelpals-login.net', correct: true },
      { id: 'real', label: 'pixelpals.com', correct: false },
    ],
    reason: {
      en: 'The real address is just "pixelpals.com". Adding extra words like "-login" and changing the ending to ".net" is a trick to look official.',
      es: 'La dirección real es solo "pixelpals.com". Agregar palabras extra como "-login" y cambiar la terminación a ".net" es un truco para parecer oficial.',
    },
  },
  {
    id: 'starquest',
    options: [
      { id: 'real', label: 'starquest.com', correct: false },
      { id: 'fake', label: 'starqvest.com', correct: true },
    ],
    reason: {
      en: 'Look closely — the "u" was swapped for a "v"! Swapped letters are a sneaky trick to fool your eyes.',
      es: 'Mira con atención — ¡la "u" fue cambiada por una "v"! Cambiar letras es un truco astuto para engañar tus ojos.',
    },
  },
  {
    id: 'moonjump',
    options: [
      { id: 'fake', label: 'moon-jump-games.net', correct: true },
      { id: 'real', label: 'moonjumpgames.com', correct: false },
    ],
    reason: {
      en: 'The real address has no dashes and ends in ".com". Extra dashes and a different ending can make a fake site look almost right.',
      es: 'La dirección real no tiene guiones y termina en ".com". Los guiones extra y una terminación diferente pueden hacer que un sitio falso se vea casi correcto.',
    },
  },
  {
    id: 'candycrafters',
    options: [
      { id: 'real', label: 'candycrafters.com', correct: false },
      { id: 'fake', label: 'candycraft3rs.com', correct: true },
    ],
    reason: {
      en: 'The "e" was swapped for a "3"! Letter-to-number swaps are another trick to make a fake address look almost the same.',
      es: '¡La "e" fue cambiada por un "3"! Cambiar letras por números es otro truco para que una dirección falsa se vea casi igual.',
    },
  },
  {
    id: 'dragontown',
    options: [
      { id: 'fake', label: 'dragontown-rewards.com', correct: true },
      { id: 'real', label: 'dragontown.com', correct: false },
    ],
    reason: {
      en: 'The real address is just "dragontown.com". Adding a tempting word like "-rewards" doesn\'t make it the real site.',
      es: 'La dirección real es solo "dragontown.com". Agregar una palabra tentadora como "-rewards" no la convierte en el sitio real.',
    },
  },
]
