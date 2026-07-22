// Re-opens the same explanation shown on the puzzle's intro screen, without
// losing puzzle progress. Reuses the pop-in keyframe already defined for
// bin items so no new CSS is needed.
export default function HelpModal({ onClose, children }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-40 flex items-center justify-center bg-ink/40 px-4"
    >
      <div className="animate-pop-in relative flex w-full max-w-sm flex-col items-center gap-4 rounded-3xl bg-white p-6 text-center shadow-lg">
        {children}
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 w-full rounded-full border-b-4 border-strong-deep bg-strong px-6 py-3 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          Got it!
        </button>
      </div>
    </div>
  )
}
