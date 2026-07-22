import { UNITS } from './units'

// A badge unlocks once every unit sharing its badgeId is completed.
// `name`/`description` are bilingual { en, es } — see src/i18n.
export const BADGES = [
  {
    id: 'password-basics',
    name: { en: 'Password Basics', es: 'Bases de Contraseñas' },
    description: {
      en: 'You know what makes a password strong!',
      es: '¡Sabes qué hace que una contraseña sea fuerte!',
    },
    icon: 'shield',
  },
  {
    id: 'phishing-basics',
    name: { en: 'Phish Spotter', es: 'Detector de Estafas' },
    description: {
      en: 'You can spot a suspicious message.',
      es: 'Puedes detectar un mensaje sospechoso.',
    },
    icon: 'magnifier',
  },
  {
    id: 'digital-safety',
    name: { en: 'Digital Guardian', es: 'Guardián Digital' },
    description: {
      en: 'You know how to keep your devices and posts safe.',
      es: 'Sabes cómo mantener seguros tus dispositivos y publicaciones.',
    },
    icon: 'shield',
  },
]

export const unitsForBadge = (badgeId) =>
  UNITS.filter((unit) => unit.badgeId === badgeId)

export const isBadgeEarned = (badgeId, completedUnitIds) =>
  unitsForBadge(badgeId).every((unit) => completedUnitIds.includes(unit.id))
