import { UNITS } from '../data/units'
import ProgressPath from '../components/ProgressPath'
import BadgeShelf from '../components/BadgeShelf'
import CastleGuardIllustration from '../components/CastleGuardIllustration'

export default function Home({ isUnitUnlocked, getUnitStars, earnedBadgeIds }) {
  const completedCount = UNITS.filter((u) => getUnitStars(u.id) > 0).length

  return (
    <div className="mx-auto flex min-h-svh max-w-4xl flex-col gap-10 px-4 py-8 sm:px-6">
      <header className="text-center">
        <h1 className="bg-gradient-to-r from-sky-deep via-violet-600 to-pink-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
          CyberQuest Jr.
        </h1>
        <CastleGuardIllustration className="mx-auto mt-2 h-40 sm:h-48" />
        <p className="mt-2 text-lg text-ink-soft">
          You're the guard of your own castle! Play each puzzle to learn how
          to keep it safe.
        </p>
        <p className="mt-1 text-sm text-ink-soft/70">
          {completedCount} of {UNITS.length} puzzles complete
        </p>
      </header>

      <section aria-labelledby="path-heading">
        <h2 id="path-heading" className="mb-4 text-center text-lg font-semibold text-ink">
          Your Path
        </h2>
        <ProgressPath
          units={UNITS}
          isUnitUnlocked={isUnitUnlocked}
          getUnitStars={getUnitStars}
        />
      </section>

      <BadgeShelf earnedBadgeIds={earnedBadgeIds} />
    </div>
  )
}
