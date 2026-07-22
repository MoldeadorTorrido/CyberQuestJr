import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'
import { BADGE_ICONS } from './Icons'
import { BADGES } from '../data/badges'

export default function CompletionCelebration({ stars, newlyEarnedBadgeId }) {
  const navigate = useNavigate()
  const badge = BADGES.find((b) => b.id === newlyEarnedBadgeId)
  const BadgeIcon = badge ? BADGE_ICONS[badge.icon] : null

  return (
    <div
      role="alertdialog"
      aria-labelledby="celebration-heading"
      className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-3xl border border-leaf-deep bg-leaf px-6 py-8 text-center"
    >
      <h2 id="celebration-heading" className="text-2xl font-bold text-ink">
        Great job!
      </h2>
      <StarRating stars={stars} size="lg" />
      <p className="text-base text-ink-soft">
        {stars === 3
          ? "You got every password right on the first try!"
          : "You figured it out! You're getting better at spotting strong passwords."}
      </p>

      {badge && (
        <div className="mt-2 flex flex-col items-center gap-2 rounded-2xl bg-white px-5 py-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-leaf text-strong">
            {BadgeIcon && <BadgeIcon className="h-9 w-9" />}
          </span>
          <p className="text-sm font-semibold text-ink">
            New badge unlocked: {badge.name}!
          </p>
        </div>
      )}

      <button
        type="button"
        onClick={() => navigate('/')}
        className="mt-2 min-h-11 w-full rounded-full bg-strong px-6 py-3 text-base font-semibold text-white hover:opacity-90"
      >
        Continue
      </button>
    </div>
  )
}
