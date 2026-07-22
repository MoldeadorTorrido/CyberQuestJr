import { useSound } from '../context/SoundContext'
import { useTranslation } from '../i18n/strings'
import { SpeakerOffIcon, SpeakerOnIcon } from './Icons'

export default function SoundToggle() {
  const { muted, toggleMuted } = useSound()
  const { t } = useTranslation()
  const label = muted ? t('soundOn') : t('soundOff')

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-pressed={muted}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-locked bg-white text-ink-soft shadow-sm transition-transform duration-150 hover:bg-sky/50 active:scale-95"
    >
      {muted ? (
        <SpeakerOffIcon className="h-5 w-5" />
      ) : (
        <SpeakerOnIcon className="h-5 w-5" />
      )}
    </button>
  )
}
