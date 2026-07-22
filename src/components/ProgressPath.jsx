import { Link } from 'react-router-dom'
import { CheckIcon, LockIcon } from './Icons'
import StarRating from './StarRating'

function UnitNode({ unit, unlocked, completed, stars }) {
  const baseClasses =
    'group flex flex-col items-center gap-2 rounded-2xl px-3 py-3 min-w-[6.5rem] transition-transform duration-150 focus-visible:outline-offset-4'

  // Unlocked-but-incomplete units get their own accent color so the path
  // reads as distinct puzzles; completed always shows the same success green
  // so "done" stays a single, unambiguous signal.
  const circleStyle =
    unlocked && !completed
      ? { borderColor: unit.color, color: unit.color, backgroundColor: `${unit.color}1A` }
      : undefined

  const content = (
    <>
      <span
        style={circleStyle}
        className={[
          'flex h-14 w-14 items-center justify-center rounded-full border-2 text-lg font-semibold transition-colors',
          completed
            ? 'border-strong bg-leaf text-strong'
            : unlocked
              ? ''
              : 'border-locked bg-white text-locked',
        ].join(' ')}
      >
        {completed ? (
          <CheckIcon className="h-7 w-7" />
        ) : unlocked ? (
          unit.order
        ) : (
          <LockIcon className="h-6 w-6" />
        )}
      </span>
      <span
        className={[
          'text-center text-sm font-medium leading-snug',
          unlocked ? 'text-ink' : 'text-ink-soft/70',
        ].join(' ')}
      >
        {unit.title}
      </span>
      {completed ? (
        <StarRating stars={stars} size="sm" />
      ) : (
        <span className="text-xs text-ink-soft/60">
          {unlocked ? 'Ready to play' : 'Locked'}
        </span>
      )}
    </>
  )

  if (!unlocked) {
    return (
      <div
        className={`${baseClasses} cursor-not-allowed opacity-70`}
        aria-disabled="true"
      >
        {content}
      </div>
    )
  }

  return (
    <Link
      to={`/unit/${unit.id}`}
      className={`${baseClasses} hover:-translate-y-0.5 hover:bg-sky/40 active:scale-95 active:translate-y-0`}
    >
      {content}
    </Link>
  )
}

export default function ProgressPath({ units, isUnitUnlocked, getUnitStars }) {
  return (
    <nav aria-label="Puzzle progress path">
      <ol className="flex flex-wrap items-start justify-center gap-2 sm:gap-3">
        {units.map((unit) => (
          <li key={unit.id}>
            <UnitNode
              unit={unit}
              unlocked={isUnitUnlocked(unit.id)}
              completed={Boolean(getUnitStars(unit.id))}
              stars={getUnitStars(unit.id)}
            />
          </li>
        ))}
      </ol>
    </nav>
  )
}
