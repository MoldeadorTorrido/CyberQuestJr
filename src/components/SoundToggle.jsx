import { useSound } from '../context/SoundContext'
import { SpeakerOffIcon, SpeakerOnIcon } from './Icons'

export default function SoundToggle() {
  const { muted, toggleMuted } = useSound()

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-pressed={muted}
      aria-label={muted ? 'Turn sound on' : 'Turn sound off'}
      title={muted ? 'Turn sound on' : 'Turn sound off'}
      className="fixed right-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-locked bg-white text-ink-soft shadow-sm transition-transform duration-150 hover:bg-sky/50 active:scale-95 sm:right-4 sm:top-4"
    >
      {muted ? (
        <SpeakerOffIcon className="h-5 w-5" />
      ) : (
        <SpeakerOnIcon className="h-5 w-5" />
      )}
    </button>
  )
}
