import { useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, MagnifierIcon } from '../components/Icons'
import { ROUNDS } from '../data/linkComparisonRounds'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'

const UNIT_COLOR = getUnitById('real-or-fake-link').color

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function LinkExplanation() {
  return (
    <>
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: UNIT_COLOR }}
      >
        <MagnifierIcon className="h-8 w-8" />
      </span>
      <h2 className="text-xl font-bold text-ink">Real or Fake Link?</h2>
      <p className="text-base text-ink-soft">
        Web addresses can be tricked to look almost like the real thing —
        with extra words, swapped letters, or a different ending. Always
        look closely before you click. If something looks a little
        different, it might not be safe!
      </p>
    </>
  )
}

export default function RealOrFakeLink({ onComplete }) {
  const { playCorrect, playIncorrect } = useSound()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing'
  const [showHelp, setShowHelp] = useState(false)
  const [roundIndex, setRoundIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState(null)
  const [shakingOptionId, setShakingOptionId] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const round = ROUNDS[roundIndex]
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
    if (roundIndex === ROUNDS.length - 1) {
      const stars = starsForMistakes(mistakes)
      const newlyEarnedBadgeId = onComplete(stars)
      setResult({ stars, newlyEarnedBadgeId })
      return
    }
    setRoundIndex((i) => i + 1)
    setSelectedOptionId(null)
  }

  if (stage === 'intro') {
    return (
      <PuzzleIntroScreen title="Real or Fake Link?" onStart={() => setStage('playing')}>
        <LinkExplanation />
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
      title="Real or Fake Link?"
      instructions={`Round ${roundIndex + 1} of ${ROUNDS.length}. Tap the address that looks altered.`}
      headerAction={<HelpButton onClick={() => setShowHelp(true)} />}
    >
      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)}>
          <LinkExplanation />
        </HelpModal>
      )}

      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <ul className="grid gap-3 sm:grid-cols-2">
          {round.options.map((option) => {
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
                    'flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl border-2 px-4 py-4 text-center font-mono text-lg transition-transform duration-150',
                    isCorrectSelected
                      ? 'cursor-default border-strong bg-strong/10 font-semibold text-strong'
                      : answeredCorrectly
                        ? 'cursor-default border-locked/60 bg-white text-ink-soft/60'
                        : 'border-locked bg-white text-ink hover:bg-sky/20 active:scale-[0.99]',
                  ].join(' ')}
                >
                  {isCorrectSelected && <CheckIcon className="h-5 w-5 shrink-0 text-strong" />}
                  {option.label}
                </button>
              </li>
            )
          })}
        </ul>

        {answeredCorrectly && (
          <div className="animate-pop-in flex flex-col items-center gap-3 rounded-2xl border border-strong/60 bg-strong/5 px-4 py-4 text-center">
            <p className="text-sm text-ink">{round.reason}</p>
            <button
              type="button"
              onClick={handleNext}
              className="min-h-11 w-full rounded-full border-b-4 border-strong-deep bg-strong px-6 py-3 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
            >
              {roundIndex === ROUNDS.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        )}
      </div>
    </PuzzleShell>
  )
}
