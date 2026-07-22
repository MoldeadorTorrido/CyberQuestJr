import { UNITS } from './units'

// A badge unlocks once every unit sharing its badgeId is completed.
export const BADGES = [
  {
    id: 'password-basics',
    name: 'Password Basics',
    description: 'You know what makes a password strong!',
    icon: 'shield',
  },
  {
    id: 'phishing-basics',
    name: 'Phish Spotter',
    description: 'You can spot a suspicious message.',
    icon: 'magnifier',
  },
]

export const unitsForBadge = (badgeId) =>
  UNITS.filter((unit) => unit.badgeId === badgeId)

export const isBadgeEarned = (badgeId, completedUnitIds) =>
  unitsForBadge(badgeId).every((unit) => completedUnitIds.includes(unit.id))
