import PuzzleShell from './PuzzleShell'
import { useTranslation } from '../i18n/strings'

// Shown before a puzzle starts: a short, plain-language explanation with a
// "Let's play!" button. Shared across units so every puzzle intro looks and
// behaves the same way.
export default function PuzzleIntroScreen({ title, onStart, children }) {
  const { t } = useTranslation()

  return (
    <PuzzleShell title={title}>
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-3xl border border-locked/60 bg-white px-6 py-10 text-center shadow-sm">
        {children}
        <button
          type="button"
          onClick={onStart}
          className="mt-2 min-h-11 w-full rounded-full border-b-4 border-strong-deep bg-strong px-6 py-3 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          {t('letsPlay')}
        </button>
      </div>
    </PuzzleShell>
  )
}
