import { useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, MagnifierIcon, XIcon } from '../components/Icons'
import { EMAIL_SEGMENTS } from '../data/phishingEmailContent'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'

const UNIT_COLOR = getUnitById('spot-the-phishing-email').color
const SUSPICIOUS_COUNT = EMAIL_SEGMENTS.filter((s) => s.suspicious).length

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function PhishingExplanation() {
  return (
    <>
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: UNIT_COLOR }}
      >
        <MagnifierIcon className="h-8 w-8" />
      </span>
      <h2 className="text-xl font-bold text-ink">What's Phishing?</h2>
      <p className="text-base text-ink-soft">
        Sometimes a trick message pretends to be from someone you trust,
        hoping you'll click without thinking. Watch for messages that rush
        you, promise a surprise prize, or ask for your password — real
        friends and real companies won't do that!
      </p>
    </>
  )
}

function EmailSegment({ segment, status, shaking, onTap, onShakeEnd }) {
  // status: 'unresolved' | 'found' | 'revealed-safe'
  const isResolved = status !== 'unresolved'

  return (
    <li onAnimationEnd={onShakeEnd} className={shaking ? 'animate-shake' : undefined}>
      <button
        type="button"
        onClick={() => onTap(segment)}
        disabled={isResolved}
        className={[
          'flex min-h-11 w-full items-start gap-2 rounded-xl border-2 px-4 py-3 text-left text-base transition-colors',
          status === 'found'
            ? 'cursor-default border-weak bg-weak/10 text-ink'
            : status === 'revealed-safe'
              ? 'cursor-default border-sky-deep bg-sky/40 text-ink'
              : 'border-locked bg-white text-ink transition-transform duration-150 hover:bg-sky/20 active:scale-[0.99]',
        ].join(' ')}
      >
        {status === 'found' && <XIcon className="mt-0.5 h-5 w-5 shrink-0 text-weak" />}
        {status === 'revealed-safe' && (
          <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-sky-deep" />
        )}
        <span className={segment.section === 'header' ? 'font-mono text-sm' : ''}>
          {segment.text}
        </span>
      </button>
      {isResolved && (
        <p
          className={`mt-1 px-4 text-sm ${status === 'found' ? 'text-weak' : 'text-sky-deep'}`}
        >
          {segment.reason}
        </p>
      )}
    </li>
  )
}

export default function SpotThePhishingEmail({ onComplete }) {
  const { playCorrect, playIncorrect } = useSound()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing'
  const [showHelp, setShowHelp] = useState(false)
  const [foundIds, setFoundIds] = useState([])
  const [revealedSafeIds, setRevealedSafeIds] = useState([])
  const [shakingId, setShakingId] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const getStatus = (segment) => {
    if (foundIds.includes(segment.id)) return 'found'
    if (revealedSafeIds.includes(segment.id)) return 'revealed-safe'
    return 'unresolved'
  }

  const handleTap = (segment) => {
    if (getStatus(segment) !== 'unresolved') return

    if (segment.suspicious) {
      playCorrect()
      const nextFound = [...foundIds, segment.id]
      setFoundIds(nextFound)
      if (nextFound.length === SUSPICIOUS_COUNT) {
        const stars = starsForMistakes(mistakes)
        const newlyEarnedBadgeId = onComplete(stars)
        setResult({ stars, newlyEarnedBadgeId })
      }
    } else {
      playIncorrect()
      setMistakes((m) => m + 1)
      setRevealedSafeIds((prev) => [...prev, segment.id])
      setShakingId(segment.id)
    }
  }

  if (stage === 'intro') {
    return (
      <PuzzleIntroScreen title="Spot the Phishing Email" onStart={() => setStage('playing')}>
        <PhishingExplanation />
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

  const headerSegments = EMAIL_SEGMENTS.filter((s) => s.section === 'header')
  const bodySegments = EMAIL_SEGMENTS.filter((s) => s.section === 'body')

  return (
    <PuzzleShell
      title="Spot the Phishing Email"
      instructions={`Tap the parts of the email that seem suspicious. Found ${foundIds.length} of ${SUSPICIOUS_COUNT}.`}
      headerAction={<HelpButton onClick={() => setShowHelp(true)} />}
    >
      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)}>
          <PhishingExplanation />
        </HelpModal>
      )}

      <div className="mx-auto flex max-w-lg flex-col gap-4 rounded-2xl border border-locked/70 bg-white p-4 shadow-sm sm:p-6">
        <ul className="flex flex-col gap-2 border-b border-locked/40 pb-4">
          {headerSegments.map((segment) => (
            <EmailSegment
              key={segment.id}
              segment={segment}
              status={getStatus(segment)}
              shaking={shakingId === segment.id}
              onTap={handleTap}
              onShakeEnd={() =>
                setShakingId((current) => (current === segment.id ? null : current))
              }
            />
          ))}
        </ul>
        <ul className="flex flex-col gap-2">
          {bodySegments.map((segment) => (
            <EmailSegment
              key={segment.id}
              segment={segment}
              status={getStatus(segment)}
              shaking={shakingId === segment.id}
              onTap={handleTap}
              onShakeEnd={() =>
                setShakingId((current) => (current === segment.id ? null : current))
              }
            />
          ))}
        </ul>
      </div>
    </PuzzleShell>
  )
}
