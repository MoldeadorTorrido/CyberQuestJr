import { useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { ShieldIcon } from '../components/Icons'
import { UPGRADES, BASE_WORD, SUFFIX_WORD } from '../data/buildPasswordContent'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'
import { pick } from '../i18n/LanguageContext'
import { useTranslation } from '../i18n/strings'

const UNIT_COLOR = getUnitById('build-a-password').color
const STRENGTH_RANK = { weak: 0, medium: 1, strong: 2 }
const STRENGTH_STEPS = [
  { level: 'weak', color: 'var(--color-weak)' },
  { level: 'medium', color: 'var(--color-gold-deep)' },
  { level: 'strong', color: 'var(--color-strong)' },
]

const TEXT = {
  title: { en: 'Build a Strong Password', es: 'Crea una Contraseña Fuerte' },
  introHeading: {
    en: 'What Makes a Password Strong?',
    es: '¿Qué Hace Fuerte a una Contraseña?',
  },
  introBody: {
    en: 'A strong password is long and mixes in capital letters, numbers, and symbols instead of just a plain word. The more you mix in, the harder it is for anyone else to guess!',
    es: 'Una contraseña fuerte es larga y combina mayúsculas, números y símbolos en lugar de ser solo una palabra simple. ¡Mientras más mezcles, más difícil será para los demás adivinarla!',
  },
  instructions: {
    en: 'Tap the upgrades below to make this password stronger.',
    es: 'Toca las mejoras de abajo para hacer esta contraseña más fuerte.',
  },
  strongAnnouncement: { en: 'Your password is strong!', es: '¡Tu contraseña es fuerte!' },
  imDone: { en: "I'm done!", es: '¡Listo!' },
}

function buildDisplayPassword(active, lang) {
  const chunks = [pick(BASE_WORD, lang)]
  if (active.longer) chunks.push(pick(SUFFIX_WORD, lang))

  let word = chunks
    .map((chunk) => (active.capital ? chunk[0].toUpperCase() + chunk.slice(1) : chunk))
    .join('')

  if (active.number) word += '7'
  if (active.symbol) word += '!'
  return word
}

function strengthLevel(active) {
  const count = Object.values(active).filter(Boolean).length
  if (count === 0) return 'weak'
  if (count <= 2) return 'medium'
  return 'strong'
}

function starsForToggleOffs(toggleOffCount) {
  if (toggleOffCount === 0) return 3
  if (toggleOffCount <= 2) return 2
  return 1
}

function BuildPasswordExplanation({ lang }) {
  return (
    <>
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: UNIT_COLOR }}
      >
        <ShieldIcon className="h-8 w-8" />
      </span>
      <h2 className="text-xl font-bold text-ink">{pick(TEXT.introHeading, lang)}</h2>
      <p className="text-base text-ink-soft">{pick(TEXT.introBody, lang)}</p>
    </>
  )
}

function StrengthMeter({ level, t }) {
  const activeIndex = STRENGTH_STEPS.findIndex((step) => step.level === level)
  const current = STRENGTH_STEPS[activeIndex]

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex w-full gap-2">
        {STRENGTH_STEPS.map((step, i) => (
          <div
            key={step.level}
            className="h-3 flex-1 rounded-full bg-locked/40 transition-colors duration-300"
            style={i <= activeIndex ? { backgroundColor: current.color } : undefined}
          />
        ))}
      </div>
      {/* Keying on level forces a remount, replaying the pop-in animation
          every time the strength meter moves to a new step. */}
      <p key={level} className="animate-pop-in text-sm font-bold" style={{ color: current.color }}>
        {t(level)}
      </p>
    </div>
  )
}

export default function BuildAStrongPassword({ onComplete }) {
  const { playCorrect } = useSound()
  const { t, lang } = useTranslation()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing'
  const [showHelp, setShowHelp] = useState(false)
  const [active, setActive] = useState({
    longer: false,
    capital: false,
    number: false,
    symbol: false,
  })
  const [toggleOffCount, setToggleOffCount] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const level = strengthLevel(active)
  const password = buildDisplayPassword(active, lang)

  const handleToggle = (id) => {
    setActive((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      if (STRENGTH_RANK[strengthLevel(next)] > STRENGTH_RANK[strengthLevel(prev)]) {
        playCorrect()
      }
      if (prev[id] && !next[id]) {
        setToggleOffCount((count) => count + 1)
      }
      return next
    })
  }

  const handleConfirm = () => {
    const stars = starsForToggleOffs(toggleOffCount)
    const newlyEarnedBadgeId = onComplete(stars)
    setResult({ stars, newlyEarnedBadgeId })
  }

  const title = pick(TEXT.title, lang)

  if (stage === 'intro') {
    return (
      <PuzzleIntroScreen title={title} onStart={() => setStage('playing')}>
        <BuildPasswordExplanation lang={lang} />
      </PuzzleIntroScreen>
    )
  }

  if (result) {
    return (
      <CompletionCelebration
        stars={result.stars}
        newlyEarnedBadgeId={result.newlyEarnedBadgeId}
      />
    )
  }

  return (
    <PuzzleShell
      title={title}
      instructions={pick(TEXT.instructions, lang)}
      headerAction={<HelpButton onClick={() => setShowHelp(true)} />}
    >
      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)}>
          <BuildPasswordExplanation lang={lang} />
        </HelpModal>
      )}

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <p className="break-words rounded-2xl border border-locked/70 bg-white px-4 py-4 text-center font-mono text-2xl text-ink shadow-sm">
          {password}
        </p>

        <StrengthMeter level={level} t={t} />

        <ul className="grid gap-3 sm:grid-cols-2">
          {UPGRADES.map((upgrade) => {
            const isOn = active[upgrade.id]
            return (
              <li key={upgrade.id}>
                <button
                  type="button"
                  onClick={() => handleToggle(upgrade.id)}
                  aria-pressed={isOn}
                  style={isOn ? { backgroundColor: UNIT_COLOR } : undefined}
                  className={[
                    'min-h-11 w-full rounded-full px-4 py-3 text-base font-bold transition-transform duration-150 active:scale-95',
                    isOn
                      ? 'text-white shadow-[0_4px_0_rgba(0,0,0,0.22)]'
                      : 'border-2 border-locked bg-white text-ink-soft hover:bg-sky/30',
                  ].join(' ')}
                >
                  {pick(upgrade.label, lang)}
                </button>
              </li>
            )
          })}
        </ul>

        {level === 'strong' && (
          <div className="animate-pop-in flex flex-col items-center gap-3 rounded-2xl border border-strong/60 bg-strong/5 px-4 py-4 text-center">
            <p className="text-sm font-semibold text-strong">
              {pick(TEXT.strongAnnouncement, lang)}
            </p>
            <button
              type="button"
              onClick={handleConfirm}
              className="min-h-11 w-full rounded-full border-b-4 border-strong-deep bg-strong px-6 py-3 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
            >
              {pick(TEXT.imDone, lang)}
            </button>
          </div>
        )}
      </div>
    </PuzzleShell>
  )
}
