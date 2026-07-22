import { useMemo, useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, LockIcon, XIcon } from '../components/Icons'
import { WEAK_OR_STRONG_ITEMS } from '../data/weakOrStrongItems'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'
import { pick } from '../i18n/LanguageContext'
import { useTranslation } from '../i18n/strings'

const UNIT_COLOR = getUnitById('weak-or-strong').color

const TEXT = {
  title: { en: 'Weak or Strong?', es: '¿Débil o Fuerte?' },
  introHeading: { en: "What's a Password?", es: '¿Qué es una Contraseña?' },
  introBody: {
    en: 'A password is like a secret word that only you know — kind of like a special key to your own room. It keeps your accounts locked so only you (and people you trust) can get in.',
    es: 'Una contraseña es como una palabra secreta que solo tú conoces — como una llave especial de tu propio cuarto. Mantiene tus cuentas bajo llave para que solo tú (y las personas en las que confías) puedan entrar.',
  },
  instructions: {
    en: "Read each password. Decide if it's Weak or Strong, then tap your answer.",
    es: 'Lee cada contraseña. Decide si es débil o fuerte y toca tu respuesta.',
  },
  weakBinLabel: { en: 'Weak passwords', es: 'Contraseñas débiles' },
  strongBinLabel: { en: 'Strong passwords', es: 'Contraseñas fuertes' },
  emptyBin: { en: 'Nothing sorted here yet.', es: 'Nada clasificado aquí todavía.' },
}

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function PasswordExplanation({ lang }) {
  return (
    <>
      <span
        className="flex h-16 w-16 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: UNIT_COLOR }}
      >
        <LockIcon className="h-8 w-8" />
      </span>
      <h2 className="text-xl font-bold text-ink">{pick(TEXT.introHeading, lang)}</h2>
      <p className="text-base text-ink-soft">{pick(TEXT.introBody, lang)}</p>
    </>
  )
}

function PasswordCard({ item, onSort, hint, shaking, onShakeEnd, lang, t }) {
  return (
    <li
      onAnimationEnd={onShakeEnd}
      className={[
        'rounded-2xl border border-locked/70 bg-white p-4 shadow-sm transition-shadow hover:shadow-md',
        shaking ? 'animate-shake' : '',
      ].join(' ')}
    >
      <p className="mb-3 break-words rounded-xl bg-sand px-3 py-2 text-center font-mono text-lg text-ink">
        {item.password}
      </p>
      {hint && (
        <p className="mb-3 rounded-lg bg-sky px-3 py-2 text-sm text-ink-soft">
          💡 {pick(hint, lang)}
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onSort(item.id, 'weak')}
          className="min-h-11 flex-1 rounded-full border-b-4 border-weak-deep bg-weak px-3 py-2 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          {t('weak')}
        </button>
        <button
          type="button"
          onClick={() => onSort(item.id, 'strong')}
          className="min-h-11 flex-1 rounded-full border-b-4 border-strong-deep bg-strong px-3 py-2 text-base font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          {t('strong')}
        </button>
      </div>
    </li>
  )
}

function BinList({ label, tone, items, lang }) {
  const toneClasses =
    tone === 'weak'
      ? 'border-weak/60 bg-weak/5'
      : 'border-strong/60 bg-strong/5'
  const iconColor = tone === 'weak' ? 'text-weak' : 'text-strong'

  return (
    <div className={`rounded-2xl border p-3 ${toneClasses}`}>
      <h3 className="mb-2 text-sm font-semibold text-ink">{label}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-ink-soft/60">{pick(TEXT.emptyBin, lang)}</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="animate-pop-in rounded-xl bg-white p-3 shadow-sm"
            >
              <div className="mb-1 flex items-center gap-2">
                {tone === 'weak' ? (
                  <XIcon className={`h-4 w-4 ${iconColor}`} />
                ) : (
                  <CheckIcon className={`h-4 w-4 ${iconColor}`} />
                )}
                <span className="font-mono text-sm text-ink">
                  {item.password}
                </span>
              </div>
              <p className="text-xs text-ink-soft">{pick(item.reason, lang)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function WeakOrStrong({ onComplete }) {
  const { playCorrect, playIncorrect } = useSound()
  const { t, lang } = useTranslation()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing'
  const [showHelp, setShowHelp] = useState(false)
  const [placements, setPlacements] = useState({}) // id -> 'weak' | 'strong'
  const [hints, setHints] = useState({}) // id -> hint object (shown after a wrong guess)
  const [shakingId, setShakingId] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const unsortedItems = useMemo(
    () => WEAK_OR_STRONG_ITEMS.filter((item) => !placements[item.id]),
    [placements],
  )
  const weakItems = WEAK_OR_STRONG_ITEMS.filter(
    (item) => placements[item.id] === 'weak',
  )
  const strongItems = WEAK_OR_STRONG_ITEMS.filter(
    (item) => placements[item.id] === 'strong',
  )

  const handleSort = (itemId, guess) => {
    const item = WEAK_OR_STRONG_ITEMS.find((i) => i.id === itemId)
    if (item.answer === guess) {
      playCorrect()
      const nextPlacements = { ...placements, [itemId]: guess }
      setPlacements(nextPlacements)
      setHints((prev) => {
        const next = { ...prev }
        delete next[itemId]
        return next
      })

      const allSorted = WEAK_OR_STRONG_ITEMS.every(
        (i) => nextPlacements[i.id],
      )
      if (allSorted) {
        const stars = starsForMistakes(mistakes)
        const newlyEarnedBadgeId = onComplete(stars)
        setResult({ stars, newlyEarnedBadgeId })
      }
    } else {
      playIncorrect()
      setMistakes((m) => m + 1)
      setHints((prev) => ({ ...prev, [itemId]: item.hint }))
      setShakingId(itemId)
    }
  }

  const title = pick(TEXT.title, lang)

  if (stage === 'intro') {
    return (
      <PuzzleIntroScreen title={title} onStart={() => setStage('playing')}>
        <PasswordExplanation lang={lang} />
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
          <PasswordExplanation lang={lang} />
        </HelpModal>
      )}
      <div className="grid gap-4">
        {unsortedItems.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {unsortedItems.map((item) => (
              <PasswordCard
                key={item.id}
                item={item}
                hint={hints[item.id]}
                onSort={handleSort}
                shaking={shakingId === item.id}
                onShakeEnd={() =>
                  setShakingId((current) => (current === item.id ? null : current))
                }
                lang={lang}
                t={t}
              />
            ))}
          </ul>
        )}

        <div className="grid gap-3 sm:grid-cols-2">
          <BinList label={pick(TEXT.weakBinLabel, lang)} tone="weak" items={weakItems} lang={lang} />
          <BinList label={pick(TEXT.strongBinLabel, lang)} tone="strong" items={strongItems} lang={lang} />
        </div>
      </div>
    </PuzzleShell>
  )
}
