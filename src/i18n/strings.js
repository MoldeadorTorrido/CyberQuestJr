import { useLanguage } from './LanguageContext'

// Shared UI chrome text reused across multiple screens/puzzles. Puzzle-
// specific instructions and content live in each puzzle's own data/component
// file as bilingual { en, es } fields — this dictionary is only for strings
// that are genuinely shared.
const STRINGS = {
  en: {
    appTagline:
      "You're the guard of your own castle! Play each puzzle to learn how to keep it safe.",
    puzzlesCompleteCount: '{completed} of {total} puzzles complete',
    yourPath: 'Your Path',
    badgeShelf: 'Badge Shelf',
    readyToPlay: 'Ready to play',
    locked: 'Locked',
    finishToUnlock: 'Finish {count} puzzles to unlock',
    backToPath: 'Back to path',
    letsPlay: "Let's play!",
    gotIt: 'Got it!',
    helpAria: 'What does this mean?',
    soundOn: 'Turn sound on',
    soundOff: 'Turn sound off',
    greatJob: 'Great job!',
    starMsg3: 'You nailed it on the first try!',
    starMsgLess: "You got there! Keep practicing and you'll be a pro.",
    newBadgeUnlocked: 'New badge unlocked: {name}!',
    continueBtn: 'Continue',
    comingSoonHeading: 'This puzzle is still being built!',
    comingSoonBody: '{blurb} Check back soon.',
    progressPathAria: 'Puzzle progress path',
    starsAria: '{stars} out of {max} stars',
    next: 'Next',
    finish: 'Finish',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
  },
  es: {
    appTagline:
      '¡Eres el guardián de tu propio castillo! Juega cada nivel para aprender a mantenerlo seguro.',
    puzzlesCompleteCount: '{completed} de {total} juegos completos',
    yourPath: 'Tu camino',
    badgeShelf: 'Estante de insignias',
    readyToPlay: 'Listo para jugar',
    locked: 'Bloqueado',
    finishToUnlock: 'Termina {count} juegos para desbloquear',
    backToPath: 'Volver al camino',
    letsPlay: '¡A jugar!',
    gotIt: '¡Entendido!',
    helpAria: '¿Qué significa esto?',
    soundOn: 'Activar sonido',
    soundOff: 'Desactivar sonido',
    greatJob: '¡Buen trabajo!',
    starMsg3: '¡Lo lograste a la primera!',
    starMsgLess: '¡Lo lograste! Sigue practicando y serás un experto.',
    newBadgeUnlocked: '¡Nueva insignia desbloqueada: {name}!',
    continueBtn: 'Continuar',
    comingSoonHeading: '¡Este juego todavía se está construyendo!',
    comingSoonBody: '{blurb} Vuelve pronto.',
    progressPathAria: 'Camino de progreso del juego',
    starsAria: '{stars} de {max} estrellas',
    next: 'Siguiente',
    finish: 'Terminar',
    weak: 'Débil',
    medium: 'Media',
    strong: 'Fuerte',
  },
}

// Exported so puzzle components can interpolate their own bilingual
// instruction templates (e.g. "Question {n} of {total}") the same way.
export function interpolate(str, vars) {
  if (!vars) return str
  return str.replace(/\{(\w+)\}/g, (_, key) => (key in vars ? vars[key] : `{${key}}`))
}

export function useTranslation() {
  const { lang } = useLanguage()
  const t = (key, vars) => interpolate(STRINGS[lang][key] ?? STRINGS.en[key] ?? key, vars)
  return { t, lang }
}
