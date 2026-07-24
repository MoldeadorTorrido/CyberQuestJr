import { useMemo, useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, ShieldIcon, XIcon } from '../components/Icons'
import { UPDATE_ITEMS } from '../data/updateItems'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'
import { pick } from '../i18n/LanguageContext'
import { useTranslation } from '../i18n/strings'

const UNIT_COLOR = getUnitById('keep-it-updated').color

const TEXT = {
  title: { en: 'Keep It Updated', es: 'Mantente Actualizado' },
  introHeading: { en: 'Why Updates Matter', es: 'Por Qué Importan las Actualizaciones' },
  introBody: {
    en: "Apps and devices sometimes need updates to stay safe and work well. And free downloads from random places aren't always what they seem. A quick check before you tap \"download\" or skip an update keeps you safer!",
    es: 'Las apps y los dispositivos a veces necesitan actualizaciones para mantenerse seguros y funcionar bien. Y las descargas gratis de lugares al azar no siempre son lo que parecen. ¡Una revisión rápida antes de tocar "descargar" o saltarte una actualización te mantiene más seguro!',
  },
  instructions: {
    en: "Read each one. Decide if it's a good idea or risky, then tap your answer.",
    es: 'Lee cada una. Decide si es una buena idea o arriesgada, y toca tu respuesta.',
  },
  goodLabel: { en: 'Good Idea', es: 'Buena Idea' },
  riskyLabel: { en: 'Risky', es: 'Arriesgada' },
  goodBinLabel: { en: 'Good ideas', es: 'Buenas ideas' },
  riskyBinLabel: { en: 'Risky ideas', es: 'Ideas arriesgadas' },
  emptyBin: { en: 'Nothing sorted here yet.', es: 'Nada clasificado aquí todavía.' },
}

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function UpdateExplanation({ lang }) {
  return (
    <>
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: UNIT_COLOR }}
      >
        <ShieldIcon className="h-8 w-8" />
      </span>
      <h2 className="text-xl font-bold text-ink">{pick(TEXT.introHeading, lang)}</h2>
      <p className="text-base text-ink-soft">{pick(TEXT.introBody, lang)}</p>
    </>
  )
}

function UpdateCard({ item, onSort, hint, shaking, onShakeEnd, lang }) {
  return (
    <li
      onAnimationEnd={onShakeEnd}
      className={[
        'rounded-2xl border border-locked/70 bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        shaking ? 'animate-shake' : '',
      ].join(' ')}
    >
      <p className="mb-3 rounded-xl bg-sand px-3 py-2 text-center text-base text-ink">
        {pick(item.text, lang)}
      </p>
      {hint && (
        <p className="mb-3 rounded-lg bg-sky px-3 py-2 text-sm text-ink-soft">
          💡 {pick(hint, lang)}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSort(item.id, 'risky')}
          className="min-h-11 flex-1 rounded-full border-b-4 border-weak-deep bg-weak px-3 py-2 text-sm font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          {pick(TEXT.riskyLabel, lang)}
        </button>
        <button
          type="button"
          onClick={() => onSort(item.id, 'good')}
          className="min-h-11 flex-1 rounded-full border-b-4 border-strong-deep bg-strong px-3 py-2 text-sm font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          {pick(TEXT.goodLabel, lang)}
        </button>
      </div>
    </li>
  )
}

function BinList({ label, tone, items, lang }) {
  const toneClasses =
    tone === 'risky' ? 'border-weak/60 bg-weak/5' : 'border-strong/60 bg-strong/5'
  const iconColor = tone === 'risky' ? 'text-weak' : 'text-strong'

  return (
    <div className={`rounded-2xl border p-3 ${toneClasses}`}>
      <h3 className="mb-2 text-sm font-semibold text-ink">{label}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-ink-soft/60">{pick(TEXT.emptyBin, lang)}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className="animate-pop-in rounded-xl bg-white p-3 shadow-sm">
              <div className="mb-1 flex items-center gap-2">
                {tone === 'risky' ? (
                  <XIcon className={`h-4 w-4 shrink-0 ${iconColor}`} />
                ) : (
                  <CheckIcon className={`h-4 w-4 shrink-0 ${iconColor}`} />
                )}
                <span className="text-sm text-ink">{pick(item.text, lang)}</span>
              </div>
              <p className="text-xs text-ink-soft">{pick(item.reason, lang)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function KeepItUpdated({ onComplete }) {
  const { playCorrect, playIncorrect } = useSound()
  const { lang } = useTranslation()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing'
  const [showHelp, setShowHelp] = useState(false)
  const [placements, setPlacements] = useState({}) // id -> 'good' | 'risky'
  const [hints, setHints] = useState({})
  const [shakingId, setShakingId] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const unsortedItems = useMemo(
    () => UPDATE_ITEMS.filter((item) => !placements[item.id]),
    [placements],
  )
  const riskyItems = UPDATE_ITEMS.filter((item) => placements[item.id] === 'risky')
  const goodItems = UPDATE_ITEMS.filter((item) => placements[item.id] === 'good')

  const handleSort = (itemId, guess) => {
    const item = UPDATE_ITEMS.find((i) => i.id === itemId)
    if (item.answer === guess) {
      playCorrect()
      const nextPlacements = { ...placements, [itemId]: guess }
      setPlacements(nextPlacements)
      setHints((prev) => {
        const next = { ...prev }
        delete next[itemId]
        return next
      })

      const allSorted = UPDATE_ITEMS.every((i) => nextPlacements[i.id])
      if (allSorted) {
        const stars = starsForMistakes(mistakes)
        const newlyEarnedBadgeId = onComplete(stars)
        setResult({ stars, newlyEarnedBadgeId })
      }
    } else {
      playIncorrect()
      setMistakes((m) => m + 1)
      setHints((prev) => ({ ...prev, [itemId]: item.reason }))
      setShakingId(itemId)
    }
  }

  const title = pick(TEXT.title, lang)

  if (stage === 'intro') {
    return (
      <PuzzleIntroScreen title={title} onStart={() => setStage('playing')}>
        <UpdateExplanation lang={lang} />
      </PuzzleIntroScreen>
    )
  }

  if (result) {
    return (
      <CompletionCelebration
        stars={result.stars}
        newlyEarnedBadgeId={result.newlyEarnedBadgeId}
      />
    )
  }

  return (
    <PuzzleShell
      title={title}
      instructions={pick(TEXT.instructions, lang)}
      headerAction={<HelpButton onClick={() => setShowHelp(true)} />}
    >
      {showHelp && (
        <HelpModal onClose={() => setShowHelp(false)}>
          <UpdateExplanation lang={lang} />
        </HelpModal>
      )}
      <div className="grid gap-4">
        {unsortedItems.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {unsortedItems.map((item) => (
              <UpdateCard
                key={item.id}
                item={item}
                hint={hints[item.id]}
                onSort={handleSort}
                shaking={shakingId === item.id}
                onShakeEnd={() =>
                  setShakingId((current) => (current === item.id ? null : current))
                }
                lang={lang}
              />
            ))}
          </ul>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <BinList label={pick(TEXT.riskyBinLabel, lang)} tone="risky" items={riskyItems} lang={lang} />
          <BinList label={pick(TEXT.goodBinLabel, lang)} tone="good" items={goodItems} lang={lang} />
        </div>
      </div>
    </PuzzleShell>
  )
}
