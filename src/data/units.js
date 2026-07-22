// Module 1: Passwords & Phishing Awareness — the six puzzle units from spec section 5.
// `status: 'ready'` units have a real puzzle component; `'soon'` units render a
// friendly placeholder but still occupy their slot on the progress path.
export const UNITS = [
  {
    id: 'weak-or-strong',
    order: 1,
    title: 'Weak or Strong?',
    blurb: 'Sort passwords into Weak or Strong.',
    badgeId: 'password-basics',
    status: 'ready',
  },
  {
    id: 'build-a-password',
    order: 2,
    title: 'Build a Strong Password',
    blurb: 'Build a password and watch it get stronger.',
    badgeId: 'password-basics',
    status: 'soon',
  },
  {
    id: 'spot-the-phishing-email',
    order: 3,
    title: 'Spot the Phishing Email',
    blurb: 'Find the suspicious clues in a message.',
    badgeId: 'phishing-basics',
    status: 'soon',
  },
  {
    id: 'who-can-i-tell',
    order: 4,
    title: 'Who Can I Tell My Password To?',
    blurb: 'Pick the safe answer every time.',
    badgeId: 'phishing-basics',
    status: 'soon',
  },
  {
    id: 'real-or-fake-link',
    order: 5,
    title: 'Real or Fake Link?',
    blurb: 'Compare two web addresses.',
    badgeId: 'phishing-basics',
    status: 'soon',
  },
  {
    id: 'what-would-you-do',
    order: 6,
    title: 'What Would You Do?',
    blurb: 'Choose the safe next step.',
    badgeId: 'phishing-basics',
    status: 'soon',
  },
]

export const getUnitById = (unitId) => UNITS.find((unit) => unit.id === unitId)

export const getNextUnit = (unitId) => {
  const current = getUnitById(unitId)
  if (!current) return undefined
  return UNITS.find((unit) => unit.order === current.order + 1)
}
