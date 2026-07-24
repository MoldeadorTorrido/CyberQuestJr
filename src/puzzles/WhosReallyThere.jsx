import { useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, ShieldIcon } from '../components/Icons'
import { SCENARIOS } from '../data/whosReallyThereScenarios'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'
import { pick } from '../i18n/LanguageContext'
import { interpolate, useTranslation } from '../i18n/strings'

const UNIT_COLOR = getUnitById('whos-really-there').color

const TEXT = {
  title: { en: "Who's Really There?", es: '¿Quién Está Realmente Ahí?' },
  introHeading: { en: "Who's Really There?", es: '¿Quién Está Realmente Ahí?' },
  introBody: {
    en: "Most people you meet in games or chats are exactly who they say they are. But sometimes, someone isn't telling the truth about who they really are. This helps you notice signs that something feels off — and exactly what to do about it: stop, don't reply, and tell a trusted adult.",
    es: 'La mayoría de las personas que conoces en juegos o chats son exactamente quienes dicen ser. Pero a veces, alguien no está diciendo la verdad sobre quién es realmente. Esto te ayuda a notar señales de que algo no está bien — y exactamente qué hacer: detente, no respondas, y cuéntale a un adulto de confianza.',
  },
  instructions: {
    en: 'Check {n} of {total}. Is this a red flag?',
    es: 'Revisión {n} de {total}. ¿Es esto una señal de alerta?',
  },
  closingHeading: { en: 'Remember This', es: 'Recuerda Esto' },
  closingBody: {
    en: "Remember: this is true even if the person seems like a real friend you've talked to for a long time — trust that builds slowly is still part of the pattern, not an exception to it. If someone tells you not to tell anyone, that's exactly when you should tell a trusted adult. None of this is ever your fault, and you won't be in trouble for telling.",
    es: 'Recuerda: esto es cierto aunque la persona parezca un amigo de verdad con quien has hablado por mucho tiempo — la confianza que se construye poco a poco sigue siendo parte del patrón, no una excepción. Si alguien te dice que no le cuentes a nadie, ese es exactamente el momento de contarle a un adulto de confianza. Nada de esto es nunca tu culpa, y no te vas a meter en problemas por contarlo.',
  },
  closingButton: { en: 'I understand', es: 'Entendido' },
}

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function WhosThereExplanation({ lang }) {
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

export default function WhosReallyThere({ onComplete }) {
  const { playCorrect, playIncorrect } = useSound()
  const { t, lang } = useTranslation()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing' | 'reinforcement'
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
      setStage('reinforcement')
      return
    }
    setScenarioIndex((i) => i + 1)
    setSelectedOptionId(null)
  }

  const handleFinish = () => {
    const stars = starsForMistakes(mistakes)
    const newlyEarnedBadgeId = onComplete(stars)
    setResult({ stars, newlyEarnedBadgeId })
  }

  const title = pick(TEXT.title, lang)

  if (stage === 'intro') {
    return (
      <PuzzleIntroScreen title={title} onStart={() => setStage('playing')}>
        <WhosThereExplanation lang={lang} />
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

  if (stage === 'reinforcement') {
    return (
      <PuzzleShell title={title}>
        <div className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-3xl border border-locked/60 bg-white px-6 py-10 text-center shadow-sm">
          <span
            className="flex h-16 w-16 items-center justify-center rounded-full text-white"
            style={{ backgroundColor: UNIT_COLOR }}
          >
            <ShieldIcon className="h-8 w-8" />
          </span>
          <h2 className="text-xl font-bold text-ink">{pick(TEXT.closingHeading, lang)}</h2>
          <p className="text-base text-ink-soft">{pick(TEXT.closingBody, lang)}</p>
          <button
            type="button"
            onClick={handleFinish}
            className="mt-2 min-h-11 w-full rounded-full border-b-4 border-strong-deep bg-strong px-6 py-3 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
          >
            {pick(TEXT.closingButton, lang)}
          </button>
        </div>
      </PuzzleShell>
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
          <WhosThereExplanation lang={lang} />
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
