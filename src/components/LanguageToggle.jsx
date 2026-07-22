import { useLanguage } from '../i18n/LanguageContext'

export default function LanguageToggle() {
  const { lang, toggleLang } = useLanguage()
  const label = lang === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={label}
      title={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-locked bg-white text-sm font-bold text-ink-soft transition-transform duration-150 hover:bg-sky/50 active:scale-95"
    >
      {lang === 'en' ? 'EN' : 'ES'}
    </button>
  )
}
