import { useMemo, useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, XIcon } from '../components/Icons'
import { WEAK_OR_STRONG_ITEMS } from '../data/weakOrStrongItems'

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function PasswordCard({ item, onSort, hint }) {
  return (
    <li className="rounded-2xl border border-locked/70 bg-white p-4">
      <p className="mb-3 break-words rounded-xl bg-sand px-3 py-2 text-center font-mono text-lg text-ink">
        {item.password}
      </p>
      {hint && (
        <p className="mb-3 rounded-lg bg-sky px-3 py-2 text-sm text-ink-soft">
          💡 {hint}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSort(item.id, 'weak')}
          className="min-h-11 flex-1 rounded-full border-2 border-weak px-3 py-2 text-sm font-semibold text-weak hover:bg-weak/10"
        >
          Weak
        </button>
        <button
          type="button"
          onClick={() => onSort(item.id, 'strong')}
          className="min-h-11 flex-1 rounded-full border-2 border-strong px-3 py-2 text-sm font-semibold text-strong hover:bg-strong/10"
        >
          Strong
        </button>
      </div>
    </li>
  )
}

function BinList({ label, tone, items }) {
  const toneClasses =
    tone === 'weak'
      ? 'border-weak/60 bg-weak/5'
      : 'border-strong/60 bg-strong/5'
  const iconColor = tone === 'weak' ? 'text-weak' : 'text-strong'

  return (
    <div className={`rounded-2xl border p-3 ${toneClasses}`}>
      <h3 className="mb-2 text-sm font-semibold text-ink">{label}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-ink-soft/60">Nothing sorted here yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="rounded-xl bg-white p-3">
              <div className="mb-1 flex items-center gap-2">
                {tone === 'weak' ? (
                  <XIcon className={`h-4 w-4 ${iconColor}`} />
                ) : (
                  <CheckIcon className={`h-4 w-4 ${iconColor}`} />
                )}
                <span className="font-mono text-sm text-ink">
                  {item.password}
                </span>
              </div>
              <p className="text-xs text-ink-soft">{item.reason}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function WeakOrStrong({ onComplete }) {
  const [placements, setPlacements] = useState({}) // id -> 'weak' | 'strong'
  const [hints, setHints] = useState({}) // id -> hint string (shown after a wrong guess)
  const [mistakes, setMistakes] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const unsortedItems = useMemo(
    () => WEAK_OR_STRONG_ITEMS.filter((item) => !placements[item.id]),
    [placements],
  )
  const weakItems = WEAK_OR_STRONG_ITEMS.filter(
    (item) => placements[item.id] === 'weak',
  )
  const strongItems = WEAK_OR_STRONG_ITEMS.filter(
    (item) => placements[item.id] === 'strong',
  )

  const handleSort = (itemId, guess) => {
    const item = WEAK_OR_STRONG_ITEMS.find((i) => i.id === itemId)
    if (item.answer === guess) {
      const nextPlacements = { ...placements, [itemId]: guess }
      setPlacements(nextPlacements)
      setHints((prev) => {
        const next = { ...prev }
        delete next[itemId]
        return next
      })

      const allSorted = WEAK_OR_STRONG_ITEMS.every(
        (i) => nextPlacements[i.id],
      )
      if (allSorted) {
        const stars = starsForMistakes(mistakes)
        const newlyEarnedBadgeId = onComplete(stars)
        setResult({ stars, newlyEarnedBadgeId })
      }
    } else {
      setMistakes((m) => m + 1)
      setHints((prev) => ({ ...prev, [itemId]: item.hint }))
    }
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
      title="Weak or Strong?"
      instructions="Read each password. Decide if it's Weak or Strong, then tap your answer."
    >
      <div className="grid gap-4">
        {unsortedItems.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {unsortedItems.map((item) => (
              <PasswordCard
                key={item.id}
                item={item}
                hint={hints[item.id]}
                onSort={handleSort}
              />
            ))}
          </ul>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <BinList label="Weak passwords" tone="weak" items={weakItems} />
          <BinList label="Strong passwords" tone="strong" items={strongItems} />
        </div>
      </div>
    </PuzzleShell>
  )
}
