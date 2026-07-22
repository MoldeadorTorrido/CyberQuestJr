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

const UNIT_COLOR = getUnitById('build-a-password').color
const STRENGTH_RANK = { weak: 0, medium: 1, strong: 2 }
const STRENGTH_STEPS = [
  { level: 'weak', label: 'Weak', color: 'var(--color-weak)' },
  { level: 'medium', label: 'Medium', color: 'var(--color-gold-deep)' },
  { level: 'strong', label: 'Strong', color: 'var(--color-strong)' },
]

function buildDisplayPassword(active) {
  const chunks = [BASE_WORD]
  if (active.longer) chunks.push(SUFFIX_WORD)

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

function BuildPasswordExplanation() {
  return (
    <>
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: UNIT_COLOR }}
      >
        <ShieldIcon className="h-8 w-8" />
      </span>
      <h2 className="text-xl font-bold text-ink">What Makes a Password Strong?</h2>
      <p className="text-base text-ink-soft">
        A strong password is long and mixes in capital letters, numbers, and
        symbols instead of just a plain word. The more you mix in, the harder
        it is for anyone else to guess!
      </p>
    </>
  )
}

function StrengthMeter({ level }) {
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
        {current.label}
      </p>
    </div>
  )
}

export default function BuildAStrongPassword({ onComplete }) {
  const { playCorrect } = useSound()
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
  const password = buildDisplayPassword(active)

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

  if (stage === 'intro') {
    return (
      <PuzzleIntroScreen title="Build a Strong Password" onStart={() => setStage('playing')}>
        <BuildPasswordExplanation />
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
      title="Build a Strong Password"
      instructions="Tap the upgrades below to make this password stronger."
      headerAction={<HelpButton onClick={() => setShowHelp(true)} />}
    >
      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)}>
          <BuildPasswordExplanation />
        </HelpModal>
      )}

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <p className="break-words rounded-2xl border border-locked/70 bg-white px-4 py-4 text-center font-mono text-2xl text-ink shadow-sm">
          {password}
        </p>

        <StrengthMeter level={level} />

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
                  {upgrade.label}
                </button>
              </li>
            )
          })}
        </ul>

        {level === 'strong' && (
          <div className="animate-pop-in flex flex-col items-center gap-3 rounded-2xl border border-strong/60 bg-strong/5 px-4 py-4 text-center">
            <p className="text-sm font-semibold text-strong">
              Your password is strong!
            </p>
            <button
              type="button"
              onClick={handleConfirm}
              className="min-h-11 w-full rounded-full border-b-4 border-strong-deep bg-strong px-6 py-3 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
            >
              I'm done!
            </button>
          </div>
        )}
      </div>
    </PuzzleShell>
  )
}
