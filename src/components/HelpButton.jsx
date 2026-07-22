import { useTranslation } from '../i18n/strings'

export default function HelpButton({ onClick }) {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t('helpAria')}
      title={t('helpAria')}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-locked bg-white text-lg font-bold text-ink-soft transition-transform duration-150 hover:bg-sky/50 active:scale-95"
    >
      ?
    </button>
  )
}
