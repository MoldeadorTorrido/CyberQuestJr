import { Link } from 'react-router-dom'

export default function PuzzleShell({ title, instructions, headerAction, children }) {
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col px-4 py-6 sm:px-6">
      <header className="mb-6 flex items-center gap-3">
        <Link
          to="/"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-locked bg-white text-xl text-ink-soft transition-transform duration-150 hover:bg-sky/50 active:scale-95"
          aria-label="Back to path"
        >
          ←
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">{title}</h1>
          {instructions && (
            <p className="mt-1 text-base text-ink-soft">{instructions}</p>
          )}
        </div>
        {headerAction}
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
