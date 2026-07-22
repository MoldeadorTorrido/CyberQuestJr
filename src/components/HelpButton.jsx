export default function HelpButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="What does this mean?"
      title="What does this mean?"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-locked bg-white text-lg font-bold text-ink-soft transition-transform duration-150 hover:bg-sky/50 active:scale-95"
    >
      ?
    </button>
  )
}
