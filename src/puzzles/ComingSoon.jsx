import PuzzleShell from '../components/PuzzleShell'
import { pick } from '../i18n/LanguageContext'
import { useTranslation } from '../i18n/strings'

export default function ComingSoon({ unit }) {
  const { t, lang } = useTranslation()

  return (
    <PuzzleShell title={pick(unit.title, lang)}>
      <div className="mx-auto flex max-w-sm flex-col items-center gap-3 rounded-3xl border border-locked/60 bg-white px-6 py-10 text-center">
        <p className="text-5xl">🛠️</p>
        <p className="text-lg font-semibold text-ink">{t('comingSoonHeading')}</p>
        <p className="text-base text-ink-soft">
          {t('comingSoonBody', { blurb: pick(unit.blurb, lang) })}
        </p>
      </div>
    </PuzzleShell>
  )
}
