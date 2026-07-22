// Content for the "Build a Strong Password" puzzle (unit 2).
// The base word is cosmetic (it's just an example password to strengthen —
// changing it doesn't affect puzzle logic), but it's still displayed text a
// child reads, so it's localized like everything else.
export const BASE_WORD = { en: 'puppy', es: 'cachorro' }
export const SUFFIX_WORD = { en: 'friend', es: 'amigo' }

export const UPGRADES = [
  { id: 'longer', label: { en: 'Make it longer', es: 'Hazla más larga' } },
  { id: 'capital', label: { en: 'Mix in capitals', es: 'Agrega mayúsculas' } },
  { id: 'number', label: { en: 'Add a number', es: 'Agrega un número' } },
  { id: 'symbol', label: { en: 'Add a symbol', es: 'Agrega un símbolo' } },
]
