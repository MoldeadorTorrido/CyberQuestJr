import { BADGES, unitsForBadge } from '../data/badges'
import { BADGE_ICONS, LockIcon } from './Icons'

function BadgeCard({ badge, earned }) {
  const Icon = BADGE_ICONS[badge.icon]
  const unitCount = unitsForBadge(badge.id).length

  return (
    <li
      className={[
        'flex flex-col items-center gap-2 rounded-2xl px-4 py-4 text-center min-w-[8rem] transition-shadow',
        earned
          ? 'border-2 border-gold-deep bg-gradient-to-br from-amber-300 to-gold-deep shadow-md shadow-amber-300/50 hover:shadow-lg'
          : 'border border-locked/70 bg-white shadow-sm',
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
      <span className={`text-sm font-bold ${earned ? 'text-ink' : 'text-ink-soft/70'}`}>
        {badge.name}
      </span>
      <span className={`text-xs ${earned ? 'text-ink/80' : 'text-ink-soft/70'}`}>
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
