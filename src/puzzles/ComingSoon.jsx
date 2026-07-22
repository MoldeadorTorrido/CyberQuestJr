import PuzzleShell from '../components/PuzzleShell'

export default function ComingSoon({ unit }) {
  return (
    <PuzzleShell title={unit.title}>
      <div className="mx-auto flex max-w-sm flex-col items-center gap-3 rounded-3xl border border-locked/60 bg-white px-6 py-10 text-center">
        <p className="text-5xl">🛠️</p>
        <p className="text-lg font-semibold text-ink">This puzzle is still being built!</p>
        <p className="text-base text-ink-soft">{unit.blurb} Check back soon.</p>
      </div>
    </PuzzleShell>
  )
}
