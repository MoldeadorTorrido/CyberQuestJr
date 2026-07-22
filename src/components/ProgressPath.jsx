import { Link } from 'react-router-dom'
import { CheckIcon, LockIcon } from './Icons'
import StarRating from './StarRating'
import { pick } from '../i18n/LanguageContext'
import { useTranslation } from '../i18n/strings'

function UnitNode({ unit, unlocked, completed, stars, lang, t }) {
  const baseClasses =
    'group flex flex-col items-center gap-2 rounded-2xl px-3 py-3 min-w-[6.5rem] transition-transform duration-150 focus-visible:outline-offset-4'

  // Unlocked-but-incomplete units get a full solid fill in their own accent
  // color (Duolingo-style skill node) so the path reads as distinct puzzles
  // at a glance; completed always shows the same solid success green so
  // "done" stays a single, unambiguous signal; locked stays flat and muted.
  const circleStyle =
    unlocked && !completed ? { backgroundColor: unit.color } : undefined

  const content = (
    <>
      <span
        style={circleStyle}
        className={[
          'flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold transition-colors',
          completed
            ? 'bg-strong text-white shadow-[0_4px_0_rgba(0,0,0,0.22)]'
            : unlocked
              ? 'text-white shadow-[0_4px_0_rgba(0,0,0,0.22)]'
              : 'bg-locked/30 text-locked',
        ].join(' ')}
      >
        {completed ? (
          <CheckIcon className="h-8 w-8" strokeWidth="3" />
        ) : unlocked ? (
          unit.order
        ) : (
          <LockIcon className="h-6 w-6" />
        )}
      </span>
      <span
        className={[
          'text-center text-sm leading-snug',
          unlocked ? 'font-semibold text-ink' : 'font-medium text-ink-soft/70',
        ].join(' ')}
      >
        {pick(unit.title, lang)}
      </span>
      {completed ? (
        <StarRating stars={stars} size="sm" />
      ) : (
        <span className="text-xs text-ink-soft/60">
          {unlocked ? t('readyToPlay') : t('locked')}
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
      className={`${baseClasses} hover:-translate-y-0.5 active:scale-95 active:translate-y-0`}
    >
      {content}
    </Link>
  )
}

export default function ProgressPath({ units, isUnitUnlocked, getUnitStars }) {
  const { t, lang } = useTranslation()

  return (
    <nav aria-label={t('progressPathAria')}>
      <ol className="flex flex-wrap items-start justify-center gap-2 sm:gap-3">
        {units.map((unit) => (
          <li key={unit.id}>
            <UnitNode
              unit={unit}
              unlocked={isUnitUnlocked(unit.id)}
              completed={Boolean(getUnitStars(unit.id))}
              stars={getUnitStars(unit.id)}
              lang={lang}
              t={t}
            />
          </li>
        ))}
      </ol>
    </nav>
  )
}
