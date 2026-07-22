import { useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, ShieldIcon } from '../components/Icons'
import { SCENARIOS } from '../data/passwordSharingScenarios'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'
import { pick } from '../i18n/LanguageContext'
import { interpolate, useTranslation } from '../i18n/strings'

const UNIT_COLOR = getUnitById('who-can-i-tell').color

const TEXT = {
  title: { en: 'Who Can I Tell My Password To?', es: '¿A Quién Le Digo Mi Contraseña?' },
  introHeading: { en: 'Who Gets Your Password?', es: '¿Quién Recibe Tu Contraseña?' },
  introBody: {
    en: "Never share your password — not with a friend, and not with anyone who says they're from a company or a game. The only person you can tell is a parent or grown-up you trust. If someone else asks, that's a sign something's not right!",
    es: 'Nunca compartas tu contraseña — ni con un amigo, ni con nadie que diga ser de una empresa o de un juego. La única persona a quien puedes decírsela es a un papá, mamá o adulto de confianza. Si alguien más te la pide, ¡esa es una señal de que algo no está bien!',
  },
  instructions: {
    en: 'Question {n} of {total}. Pick the safe choice.',
    es: 'Pregunta {n} de {total}. Elige la opción segura.',
  },
}

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function SharingExplanation({ lang }) {
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

export default function WhoCanITellMyPassword({ onComplete }) {
  const { playCorrect, playIncorrect } = useSound()
  const { t, lang } = useTranslation()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing'
  const [showHelp, setShowHelp] = useState(false)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [shakingOptionId, setShakingOptionId] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const scenario = SCENARIOS[scenarioIndex]
  const answeredCorrectly = selectedOptionId !== null

  const handleSelect = (option) => {
    if (answeredCorrectly) return

    if (option.correct) {
      playCorrect()
      setSelectedOptionId(option.id)
    } else {
      playIncorrect()
      setMistakes((m) => m + 1)
      setShakingOptionId(option.id)
    }
  }

  const handleNext = () => {
    if (scenarioIndex === SCENARIOS.length - 1) {
      const stars = starsForMistakes(mistakes)
      const newlyEarnedBadgeId = onComplete(stars)
      setResult({ stars, newlyEarnedBadgeId })
      return
    }
    setScenarioIndex((i) => i + 1)
    setSelectedOptionId(null)
  }

  const title = pick(TEXT.title, lang)

  if (stage === 'intro') {
    return (
      <PuzzleIntroScreen title={title} onStart={() => setStage('playing')}>
        <SharingExplanation lang={lang} />
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
      instructions={interpolate(pick(TEXT.instructions, lang), {
        n: scenarioIndex + 1,
        total: SCENARIOS.length,
      })}
      headerAction={<HelpButton onClick={() => setShowHelp(true)} />}
    >
      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)}>
          <SharingExplanation lang={lang} />
        </HelpModal>
      )}

      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <p className="rounded-2xl border border-locked/70 bg-white px-5 py-4 text-lg text-ink shadow-sm">
          {pick(scenario.prompt, lang)}
        </p>

        <ul className="flex flex-col gap-3">
          {scenario.options.map((option) => {
            const isCorrectSelected = selectedOptionId === option.id
            return (
              <li
                key={option.id}
                onAnimationEnd={() =>
                  setShakingOptionId((current) => (current === option.id ? null : current))
                }
                className={shakingOptionId === option.id ? 'animate-shake' : undefined}
              >
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  disabled={answeredCorrectly}
                  className={[
                    'flex min-h-11 w-full items-center gap-2 rounded-2xl border-2 px-4 py-3 text-left text-base transition-transform duration-150',
                    isCorrectSelected
                      ? 'cursor-default border-strong bg-strong/10 font-semibold text-strong'
                      : answeredCorrectly
                        ? 'cursor-default border-locked/60 bg-white text-ink-soft/60'
                        : 'border-locked bg-white text-ink hover:bg-sky/20 active:scale-[0.99]',
                  ].join(' ')}
                >
                  {isCorrectSelected && <CheckIcon className="h-5 w-5 shrink-0 text-strong" />}
                  {pick(option.label, lang)}
                </button>
              </li>
            )
          })}
        </ul>

        {answeredCorrectly && (
          <div className="animate-pop-in flex flex-col items-center gap-3 rounded-2xl border border-strong/60 bg-strong/5 px-4 py-4 text-center">
            <p className="text-sm text-ink">{pick(scenario.reason, lang)}</p>
            <button
              type="button"
              onClick={handleNext}
              className="min-h-11 w-full rounded-full border-b-4 border-strong-deep bg-strong px-6 py-3 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
            >
              {scenarioIndex === SCENARIOS.length - 1 ? t('finish') : t('next')}
            </button>
          </div>
        )}
      </div>
    </PuzzleShell>
  )
}
