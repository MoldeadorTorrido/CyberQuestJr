import { useMemo, useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, MagnifierIcon, XIcon } from '../components/Icons'
import { OFFER_ITEMS } from '../data/scamOfferItems'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'
import { pick } from '../i18n/LanguageContext'
import { useTranslation } from '../i18n/strings'

const UNIT_COLOR = getUnitById('too-good-to-be-true').color

const TEXT = {
  title: { en: 'Too Good to Be True', es: 'Demasiado Bueno Para Ser Verdad' },
  introHeading: { en: 'Safe Offer or Scam?', es: '¿Oferta Segura o Estafa?' },
  introBody: {
    en: "Games and apps sometimes show pop-ups promising free prizes or coins. Some are real, but many are scams trying to trick you — especially if they ask for your password or rush you to act fast!",
    es: 'Los juegos y las apps a veces muestran ventanas emergentes que prometen premios o monedas gratis. Algunas son reales, ¡pero muchas son estafas que intentan engañarte — sobre todo si piden tu contraseña o te apuran a actuar rápido!',
  },
  instructions: {
    en: 'Read each one. Decide if it seems safe or like a scam, then tap your answer.',
    es: 'Lee cada una. Decide si parece segura o una estafa, y toca tu respuesta.',
  },
  scamLabel: { en: 'Scam', es: 'Estafa' },
  safeLabel: { en: 'Safe', es: 'Segura' },
  scamBinLabel: { en: 'Scams', es: 'Estafas' },
  safeBinLabel: { en: 'Safe offers', es: 'Ofertas seguras' },
  emptyBin: { en: 'Nothing sorted here yet.', es: 'Nada clasificado aquí todavía.' },
}

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function OfferExplanation({ lang }) {
  return (
    <>
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: UNIT_COLOR }}
      >
        <MagnifierIcon className="h-8 w-8" />
      </span>
      <h2 className="text-xl font-bold text-ink">{pick(TEXT.introHeading, lang)}</h2>
      <p className="text-base text-ink-soft">{pick(TEXT.introBody, lang)}</p>
    </>
  )
}

function OfferCard({ item, onSort, hint, shaking, onShakeEnd, lang }) {
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
          onClick={() => onSort(item.id, 'scam')}
          className="min-h-11 flex-1 rounded-full border-b-4 border-weak-deep bg-weak px-3 py-2 text-sm font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          {pick(TEXT.scamLabel, lang)}
        </button>
        <button
          type="button"
          onClick={() => onSort(item.id, 'safe')}
          className="min-h-11 flex-1 rounded-full border-b-4 border-strong-deep bg-strong px-3 py-2 text-sm font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          {pick(TEXT.safeLabel, lang)}
        </button>
      </div>
    </li>
  )
}

function BinList({ label, tone, items, lang }) {
  const toneClasses =
    tone === 'scam' ? 'border-weak/60 bg-weak/5' : 'border-strong/60 bg-strong/5'
  const iconColor = tone === 'scam' ? 'text-weak' : 'text-strong'

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
                {tone === 'scam' ? (
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

export default function TooGoodToBeTrue({ onComplete }) {
  const { playCorrect, playIncorrect } = useSound()
  const { lang } = useTranslation()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing'
  const [showHelp, setShowHelp] = useState(false)
  const [placements, setPlacements] = useState({}) // id -> 'scam' | 'safe'
  const [hints, setHints] = useState({})
  const [shakingId, setShakingId] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const unsortedItems = useMemo(
    () => OFFER_ITEMS.filter((item) => !placements[item.id]),
    [placements],
  )
  const scamItems = OFFER_ITEMS.filter((item) => placements[item.id] === 'scam')
  const safeItems = OFFER_ITEMS.filter((item) => placements[item.id] === 'safe')

  const handleSort = (itemId, guess) => {
    const item = OFFER_ITEMS.find((i) => i.id === itemId)
    if (item.answer === guess) {
      playCorrect()
      const nextPlacements = { ...placements, [itemId]: guess }
      setPlacements(nextPlacements)
      setHints((prev) => {
        const next = { ...prev }
        delete next[itemId]
        return next
      })

      const allSorted = OFFER_ITEMS.every((i) => nextPlacements[i.id])
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
        <OfferExplanation lang={lang} />
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
          <OfferExplanation lang={lang} />
        </HelpModal>
      )}
      <div className="grid gap-4">
        {unsortedItems.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {unsortedItems.map((item) => (
              <OfferCard
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
          <BinList label={pick(TEXT.scamBinLabel, lang)} tone="scam" items={scamItems} lang={lang} />
          <BinList label={pick(TEXT.safeBinLabel, lang)} tone="safe" items={safeItems} lang={lang} />
        </div>
      </div>
    </PuzzleShell>
  )
}
