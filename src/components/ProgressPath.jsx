import { Link } from 'react-router-dom'
import { CheckIcon, LockIcon } from './Icons'
import StarRating from './StarRating'

function UnitNode({ unit, unlocked, completed, stars }) {
  const baseClasses =
    'group flex flex-col items-center gap-2 rounded-2xl px-3 py-3 min-w-[6.5rem] transition focus-visible:outline-offset-4'

  const content = (
    <>
      <span
        className={[
          'flex h-14 w-14 items-center justify-center rounded-full border-2 text-lg font-semibold',
          completed
            ? 'border-strong bg-leaf text-strong'
            : unlocked
              ? 'border-sky-deep bg-white text-sky-deep group-hover:bg-sky'
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
      className={`${baseClasses} hover:bg-sky/60 active:scale-[0.98]`}
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
