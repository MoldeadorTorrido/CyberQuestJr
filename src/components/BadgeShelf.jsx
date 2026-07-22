import { BADGES, unitsForBadge } from '../data/badges'
import { BADGE_ICONS, LockIcon } from './Icons'

function BadgeCard({ badge, earned }) {
  const Icon = BADGE_ICONS[badge.icon]
  const unitCount = unitsForBadge(badge.id).length

  return (
    <li
      className={[
        'flex flex-col items-center gap-2 rounded-2xl border px-4 py-4 text-center min-w-[8rem] shadow-sm transition-shadow',
        earned
          ? 'border-gold bg-gradient-to-b from-amber-50 to-white shadow-amber-200/60 hover:shadow-md'
          : 'border-locked/70 bg-white',
      ].join(' ')}
    >
      <span
        className={[
          'flex h-16 w-16 items-center justify-center rounded-full',
          earned ? 'bg-white text-gold-deep' : 'bg-sand text-locked',
        ].join(' ')}
      >
        {earned ? (
          <Icon className="h-9 w-9" />
        ) : (
          <LockIcon className="h-7 w-7" />
        )}
      </span>
      <span className={`text-sm font-semibold ${earned ? 'text-ink' : 'text-ink-soft/70'}`}>
        {badge.name}
      </span>
      <span className="text-xs text-ink-soft/70">
        {earned ? badge.description : `Finish ${unitCount} puzzles to unlock`}
      </span>
    </li>
  )
}

export default function BadgeShelf({ earnedBadgeIds }) {
  return (
    <section aria-labelledby="badge-shelf-heading">
      <h2 id="badge-shelf-heading" className="mb-3 text-lg font-semibold text-ink">
        Badge Shelf
      </h2>
      <ul className="flex flex-wrap justify-center gap-3">
        {BADGES.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            earned={earnedBadgeIds.includes(badge.id)}
          />
        ))}
      </ul>
    </section>
  )
}
