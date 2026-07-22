import { useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, ShieldIcon, XIcon } from '../components/Icons'
import { POST_SCENARIOS } from '../data/postScenarios'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'
import { pick } from '../i18n/LanguageContext'
import { interpolate, useTranslation } from '../i18n/strings'

const UNIT_COLOR = getUnitById('think-before-you-post').color

const TEXT = {
  title: { en: 'Think Before You Post', es: 'Piensa Antes de Publicar' },
  introHeading: { en: 'Who Can See Your Post?', es: '¿Quién Puede Ver Tu Publicación?' },
  introBody: {
    en: "Once something is posted, more people can see it than you might expect — and it can be hard to fully take back. That doesn't mean you can't post! Just take a quick look first: does it show where you live, go to school, or that you're home alone?",
    es: 'Una vez que publicas algo, más personas de las que crees pueden verlo — y puede ser difícil borrarlo por completo. ¡Eso no significa que no puedas publicar! Solo revisa rápido primero: ¿muestra dónde vives, a qué escuela vas, o que estás solo(a) en casa?',
  },
  instructions: {
    en: 'Post {n} of {total}. Would you share it as-is?',
    es: 'Publicación {n} de {total}. ¿La compartirías tal cual?',
  },
}

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function PostExplanation({ lang }) {
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

export default function ThinkBeforeYouPost({ onComplete }) {
  const { playCorrect, playIncorrect } = useSound()
  const { t, lang } = useTranslation()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing'
  const [showHelp, setShowHelp] = useState(false)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [correctId, setCorrectId] = useState(null)
  const [wrongId, setWrongId] = useState(null)
  const [shakingId, setShakingId] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const scenario = POST_SCENARIOS[scenarioIndex]

  const getStatus = (option) => {
    if (correctId === option.id) return 'correct'
    if (wrongId === option.id) return 'incorrect'
    return 'unselected'
  }

  const handleSelect = (option) => {
    if (correctId !== null) return
    if (option.correct) {
      playCorrect()
      setCorrectId(option.id)
    } else {
      if (wrongId === option.id) return
      playIncorrect()
      setMistakes((m) => m + 1)
      setWrongId(option.id)
      setShakingId(option.id)
    }
  }

  const handleNext = () => {
    if (scenarioIndex === POST_SCENARIOS.length - 1) {
      const stars = starsForMistakes(mistakes)
      const newlyEarnedBadgeId = onComplete(stars)
      setResult({ stars, newlyEarnedBadgeId })
      return
    }
    setScenarioIndex((i) => i + 1)
    setCorrectId(null)
    setWrongId(null)
  }

  const title = pick(TEXT.title, lang)

  if (stage === 'intro') {
    return (
      <PuzzleIntroScreen title={title} onStart={() => setStage('playing')}>
        <PostExplanation lang={lang} />
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
        total: POST_SCENARIOS.length,
      })}
      headerAction={<HelpButton onClick={() => setShowHelp(true)} />}
    >
      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)}>
          <PostExplanation lang={lang} />
        </HelpModal>
      )}

      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <p className="rounded-2xl border border-locked/70 bg-white px-5 py-4 text-lg text-ink shadow-sm">
          {pick(scenario.post, lang)}
        </p>

        <ul className="flex flex-col gap-3">
          {scenario.options.map((option) => {
            const status = getStatus(option)
            const isResolved = status !== 'unselected'
            return (
              <li
                key={option.id}
                onAnimationEnd={() =>
                  setShakingId((current) => (current === option.id ? null : current))
                }
                className={shakingId === option.id ? 'animate-shake' : undefined}
              >
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  disabled={isResolved}
                  className={[
                    'flex min-h-11 w-full items-center gap-2 rounded-2xl border-2 px-4 py-3 text-left text-base transition-transform duration-150',
                    status === 'correct'
                      ? 'cursor-default border-strong bg-strong/10 font-semibold text-strong'
                      : status === 'incorrect'
                        ? 'cursor-default border-weak bg-weak/10 text-weak'
                        : 'border-locked bg-white text-ink hover:bg-sky/20 active:scale-[0.99]',
                  ].join(' ')}
                >
                  {status === 'correct' && <CheckIcon className="h-5 w-5 shrink-0 text-strong" />}
                  {status === 'incorrect' && <XIcon className="h-5 w-5 shrink-0 text-weak" />}
                  {pick(option.label, lang)}
                </button>
                {isResolved && (
                  <p
                    className={`mt-1 px-4 text-sm ${status === 'correct' ? 'text-strong' : 'text-weak'}`}
                  >
                    {pick(option.consequence, lang)}
                  </p>
                )}
              </li>
            )
          })}
        </ul>

        {correctId !== null && (
          <button
            type="button"
            onClick={handleNext}
            className="animate-pop-in min-h-11 w-full rounded-full border-b-4 border-strong-deep bg-strong px-6 py-3 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
          >
            {scenarioIndex === POST_SCENARIOS.length - 1 ? t('finish') : t('next')}
          </button>
        )}
      </div>
    </PuzzleShell>
  )
}
