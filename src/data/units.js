// Module 1: Passwords & Phishing Awareness — the six puzzle units from spec section 5.
// `status: 'ready'` units have a real puzzle component; `'soon'` units render a
// friendly placeholder but still occupy their slot on the progress path.
// Each unit gets its own accent color so the path reads as a row of distinct
// puzzles rather than one repeated shape. Colors are picked from the ~600
// shade range so they stay readable as text/icon color directly on white.
export const UNITS = [
  {
    id: 'weak-or-strong',
    order: 1,
    title: 'Weak or Strong?',
    blurb: 'Sort passwords into Weak or Strong.',
    badgeId: 'password-basics',
    status: 'ready',
    color: '#0d9488',
  },
  {
    id: 'build-a-password',
    order: 2,
    title: 'Build a Strong Password',
    blurb: 'Build a password and watch it get stronger.',
    badgeId: 'password-basics',
    status: 'ready',
    color: '#7c3aed',
  },
  {
    id: 'spot-the-phishing-email',
    order: 3,
    title: 'Spot the Phishing Email',
    blurb: 'Find the suspicious clues in a message.',
    badgeId: 'phishing-basics',
    status: 'ready',
    color: '#d97706',
  },
  {
    id: 'who-can-i-tell',
    order: 4,
    title: 'Who Can I Tell My Password To?',
    blurb: 'Pick the safe answer every time.',
    badgeId: 'phishing-basics',
    status: 'soon',
    color: '#db2777',
  },
  {
    id: 'real-or-fake-link',
    order: 5,
    title: 'Real or Fake Link?',
    blurb: 'Compare two web addresses.',
    badgeId: 'phishing-basics',
    status: 'soon',
    color: '#0284c7',
  },
  {
    id: 'what-would-you-do',
    order: 6,
    title: 'What Would You Do?',
    blurb: 'Choose the safe next step.',
    badgeId: 'phishing-basics',
    status: 'soon',
    color: '#4f46e5',
  },
]

export const getUnitById = (unitId) => UNITS.find((unit) => unit.id === unitId)

export const getNextUnit = (unitId) => {
  const current = getUnitById(unitId)
  if (!current) return undefined
  return UNITS.find((unit) => unit.order === current.order + 1)
}
