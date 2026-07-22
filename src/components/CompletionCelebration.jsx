import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import StarRating from './StarRating'
import { BADGE_ICONS } from './Icons'
import { BADGES } from '../data/badges'
import ConfettiBurst from './ConfettiBurst'
import { useSound } from '../context/SoundContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function CompletionCelebration({ stars, newlyEarnedBadgeId }) {
  const navigate = useNavigate()
  const { playBadge } = useSound()
  const reducedMotion = usePrefersReducedMotion()
  const badge = BADGES.find((b) => b.id === newlyEarnedBadgeId)
  const BadgeIcon = badge ? BADGE_ICONS[badge.icon] : null

  useEffect(() => {
    if (!badge) return
    // Small offset so it doesn't collide with the "correct" chime from the
    // sort that just finished the puzzle.
    const timer = setTimeout(() => playBadge(), 250)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badge?.id])

  return (
    <div
      role="alertdialog"
      aria-labelledby="celebration-heading"
      className="relative mx-auto flex max-w-sm flex-col items-center gap-4 overflow-hidden rounded-3xl border border-leaf-deep bg-leaf px-6 py-8 text-center"
    >
      {badge && <ConfettiBurst />}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <h2 id="celebration-heading" className="text-3xl font-extrabold text-ink">
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
            <span
              className={[
                'flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-gold-deep',
                reducedMotion ? '' : 'animate-badge-glow',
              ].join(' ')}
            >
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
          className="mt-2 min-h-11 w-full rounded-full border-b-4 border-strong-deep bg-strong px-6 py-3 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
