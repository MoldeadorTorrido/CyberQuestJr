import { useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, ShieldIcon, XIcon } from '../components/Icons'
import { SCENARIOS } from '../data/whatWouldYouDoScenarios'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'

const UNIT_COLOR = getUnitById('what-would-you-do').color

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function WhatWouldYouDoExplanation() {
  return (
    <>
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: UNIT_COLOR }}
      >
        <ShieldIcon className="h-8 w-8" />
      </span>
      <h2 className="text-xl font-bold text-ink">What Would You Do?</h2>
      <p className="text-base text-ink-soft">
        Sometimes you'll see a message, link, or pop-up that feels a little
        off. The safest move is always the same: don't click, don't reply —
        go tell a parent or trusted grown-up. They can help you figure out
        what's really going on!
      </p>
    </>
  )
}

function ScenarioOption({ option, status, shaking, onSelect, onShakeEnd }) {
  // status: 'unselected' | 'correct' | 'incorrect'
  const isResolved = status !== 'unselected'

  return (
    <li onAnimationEnd={onShakeEnd} className={shaking ? 'animate-shake' : undefined}>
      <button
        type="button"
        onClick={() => onSelect(option)}
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
        {option.label}
      </button>
      {isResolved && (
        <p className={`mt-1 px-4 text-sm ${status === 'correct' ? 'text-strong' : 'text-weak'}`}>
          {option.consequence}
        </p>
      )}
    </li>
  )
}

export default function WhatWouldYouDo({ onComplete }) {
  const { playCorrect, playIncorrect } = useSound()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing'
  const [showHelp, setShowHelp] = useState(false)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [correctId, setCorrectId] = useState(null)
  const [wrongId, setWrongId] = useState(null)
  const [shakingId, setShakingId] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const scenario = SCENARIOS[scenarioIndex]

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
    if (scenarioIndex === SCENARIOS.length - 1) {
      const stars = starsForMistakes(mistakes)
      const newlyEarnedBadgeId = onComplete(stars)
      setResult({ stars, newlyEarnedBadgeId })
      return
    }
    setScenarioIndex((i) => i + 1)
    setCorrectId(null)
    setWrongId(null)
  }

  if (stage === 'intro') {
    return (
      <PuzzleIntroScreen title="What Would You Do?" onStart={() => setStage('playing')}>
        <WhatWouldYouDoExplanation />
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
      title="What Would You Do?"
      instructions={`Scenario ${scenarioIndex + 1} of ${SCENARIOS.length}. Pick the safe next step.`}
      headerAction={<HelpButton onClick={() => setShowHelp(true)} />}
    >
      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)}>
          <WhatWouldYouDoExplanation />
        </HelpModal>
      )}

      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <p className="rounded-2xl border border-locked/70 bg-white px-5 py-4 text-lg text-ink shadow-sm">
          {scenario.story}
        </p>

        <ul className="flex flex-col gap-3">
          {scenario.options.map((option) => (
            <ScenarioOption
              key={option.id}
              option={option}
              status={getStatus(option)}
              shaking={shakingId === option.id}
              onSelect={handleSelect}
              onShakeEnd={() =>
                setShakingId((current) => (current === option.id ? null : current))
              }
            />
          ))}
        </ul>

        {correctId !== null && (
          <button
            type="button"
            onClick={handleNext}
            className="animate-pop-in min-h-11 w-full rounded-full border-b-4 border-strong-deep bg-strong px-6 py-3 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
          >
            {scenarioIndex === SCENARIOS.length - 1 ? 'Finish' : 'Next'}
          </button>
        )}
      </div>
    </PuzzleShell>
  )
}
