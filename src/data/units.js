// Module 1: Passwords & Phishing Awareness (spec section 5), and Module 2:
// Device & Data Safety. `status: 'ready'` units have a real puzzle
// component; `'soon'` units render a friendly placeholder but still occupy
// their slot on the progress path.
// Each unit gets its own accent color so the path reads as a row of distinct
// puzzles rather than one repeated shape. Colors are picked from the ~600
// shade range so they stay readable as text/icon color directly on white.
// `title`/`blurb` are bilingual { en, es } — see src/i18n for how these are
// resolved to the current language. Puzzle mechanics (correct answers,
// unlock order, colors) are language-independent and never vary by locale.
export const UNITS = [
  {
    id: 'weak-or-strong',
    order: 1,
    title: { en: 'Weak or Strong?', es: '¿Débil o Fuerte?' },
    blurb: {
      en: 'Sort passwords into Weak or Strong.',
      es: 'Clasifica contraseñas como débiles o fuertes.',
    },
    badgeId: 'password-basics',
    status: 'ready',
    color: '#0d9488',
  },
  {
    id: 'build-a-password',
    order: 2,
    title: { en: 'Build a Strong Password', es: 'Crea una Contraseña Fuerte' },
    blurb: {
      en: 'Build a password and watch it get stronger.',
      es: 'Arma una contraseña y mírala volverse más fuerte.',
    },
    badgeId: 'password-basics',
    status: 'ready',
    color: '#7c3aed',
  },
  {
    id: 'spot-the-phishing-email',
    order: 3,
    title: { en: 'Spot the Phishing Email', es: 'Detecta el Correo Falso' },
    blurb: {
      en: 'Find the suspicious clues in a message.',
      es: 'Encuentra las pistas sospechosas en un mensaje.',
    },
    badgeId: 'phishing-basics',
    status: 'ready',
    color: '#d97706',
  },
  {
    id: 'who-can-i-tell',
    order: 4,
    title: { en: 'Who Can I Tell My Password To?', es: '¿A Quién Le Digo Mi Contraseña?' },
    blurb: {
      en: 'Pick the safe answer every time.',
      es: 'Elige siempre la respuesta segura.',
    },
    badgeId: 'phishing-basics',
    status: 'ready',
    color: '#db2777',
  },
  {
    id: 'real-or-fake-link',
    order: 5,
    title: { en: 'Real or Fake Link?', es: '¿Enlace Real o Falso?' },
    blurb: {
      en: 'Compare two web addresses.',
      es: 'Compara dos direcciones web.',
    },
    badgeId: 'phishing-basics',
    status: 'ready',
    color: '#0284c7',
  },
  {
    id: 'what-would-you-do',
    order: 6,
    title: { en: 'What Would You Do?', es: '¿Qué Harías Tú?' },
    blurb: {
      en: 'Choose the safe next step.',
      es: 'Elige el siguiente paso seguro.',
    },
    badgeId: 'phishing-basics',
    status: 'ready',
    color: '#4f46e5',
  },

  // Module 2: Device & Data Safety
  {
    id: 'lock-it-up',
    order: 7,
    title: { en: 'Lock It Up', es: 'Bloquéalo' },
    blurb: {
      en: 'Protect your screen and check app permissions.',
      es: 'Protege tu pantalla y revisa los permisos de las apps.',
    },
    badgeId: 'digital-safety',
    status: 'ready',
    color: '#65a30d',
  },
  {
    id: 'think-before-you-post',
    order: 8,
    title: { en: 'Think Before You Post', es: 'Piensa Antes de Publicar' },
    blurb: {
      en: 'Decide if a post is safe to share.',
      es: 'Decide si una publicación es segura para compartir.',
    },
    badgeId: 'digital-safety',
    status: 'ready',
    color: '#0891b2',
  },
  {
    id: 'too-good-to-be-true',
    order: 9,
    title: { en: 'Too Good to Be True', es: 'Demasiado Bueno Para Ser Verdad' },
    blurb: {
      en: 'Sort offers into safe or scam.',
      es: 'Clasifica ofertas como seguras o estafas.',
    },
    badgeId: 'digital-safety',
    status: 'ready',
    color: '#c026d3',
  },
  {
    id: 'whos-really-there',
    order: 10,
    title: { en: "Who's Really There?", es: '¿Quién Está Realmente Ahí?' },
    blurb: {
      en: "Learn to check who's really behind a message.",
      es: 'Aprende a comprobar quién está realmente detrás de un mensaje.',
    },
    badgeId: 'digital-safety',
    status: 'soon',
    color: '#e11d48',
  },
  {
    id: 'keep-it-updated',
    order: 11,
    title: { en: 'Keep It Updated', es: 'Mantente Actualizado' },
    blurb: {
      en: 'Learn why updates help keep your devices safe.',
      es: 'Aprende por qué las actualizaciones ayudan a proteger tus dispositivos.',
    },
    badgeId: 'digital-safety',
    status: 'soon',
    color: '#475569',
  },
]

export const getUnitById = (unitId) => UNITS.find((unit) => unit.id === unitId)

export const getNextUnit = (unitId) => {
  const current = getUnitById(unitId)
  if (!current) return undefined
  return UNITS.find((unit) => unit.order === current.order + 1)
}
