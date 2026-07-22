import { useMemo, useState } from 'react'
import PuzzleShell from '../components/PuzzleShell'
import PuzzleIntroScreen from '../components/PuzzleIntroScreen'
import HelpButton from '../components/HelpButton'
import HelpModal from '../components/HelpModal'
import CompletionCelebration from '../components/CompletionCelebration'
import { CheckIcon, LockIcon, XIcon } from '../components/Icons'
import { LOCK_ITEMS } from '../data/lockItUpItems'
import { useSound } from '../context/SoundContext'
import { getUnitById } from '../data/units'
import { pick } from '../i18n/LanguageContext'
import { useTranslation } from '../i18n/strings'

const UNIT_COLOR = getUnitById('lock-it-up').color

const TEXT = {
  title: { en: 'Lock It Up', es: 'Bloquéalo' },
  introHeading: {
    en: 'What Does a Screen Lock Protect?',
    es: '¿Qué Protege un Bloqueo de Pantalla?',
  },
  introBody: {
    en: 'A screen lock keeps your device private, but only if you use it and keep your code secret. Apps also ask for permissions like your contacts or microphone — sometimes that makes sense, and sometimes it doesn\'t!',
    es: 'Un bloqueo de pantalla mantiene tu dispositivo privado, pero solo si lo usas y mantienes tu código en secreto. Las apps también piden permisos como tus contactos o tu micrófono — ¡a veces eso tiene sentido, y a veces no!',
  },
  instructions: {
    en: 'Read each one. Decide if it makes sense, then tap your answer.',
    es: 'Lee cada una. Decide si tiene sentido y toca tu respuesta.',
  },
  yesLabel: { en: 'Makes Sense', es: 'Tiene Sentido' },
  noLabel: { en: "Doesn't Make Sense", es: 'No Tiene Sentido' },
  yesBinLabel: { en: 'Makes sense', es: 'Tiene sentido' },
  noBinLabel: { en: "Doesn't make sense", es: 'No tiene sentido' },
  emptyBin: { en: 'Nothing sorted here yet.', es: 'Nada clasificado aquí todavía.' },
}

function starsForMistakes(mistakes) {
  if (mistakes === 0) return 3
  if (mistakes <= 2) return 2
  return 1
}

function LockExplanation({ lang }) {
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

function LockCard({ item, onSort, hint, shaking, onShakeEnd, lang }) {
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
          onClick={() => onSort(item.id, 'no')}
          className="min-h-11 flex-1 rounded-full border-b-4 border-weak-deep bg-weak px-3 py-2 text-sm font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          {pick(TEXT.noLabel, lang)}
        </button>
        <button
          type="button"
          onClick={() => onSort(item.id, 'yes')}
          className="min-h-11 flex-1 rounded-full border-b-4 border-strong-deep bg-strong px-3 py-2 text-sm font-bold text-white transition-all duration-150 hover:brightness-105 active:translate-y-1 active:border-b-0"
        >
          {pick(TEXT.yesLabel, lang)}
        </button>
      </div>
    </li>
  )
}

function BinList({ label, tone, items, lang }) {
  const toneClasses =
    tone === 'no' ? 'border-weak/60 bg-weak/5' : 'border-strong/60 bg-strong/5'
  const iconColor = tone === 'no' ? 'text-weak' : 'text-strong'

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
                {tone === 'no' ? (
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

export default function LockItUp({ onComplete }) {
  const { playCorrect, playIncorrect } = useSound()
  const { lang } = useTranslation()
  const [stage, setStage] = useState('intro') // 'intro' | 'playing'
  const [showHelp, setShowHelp] = useState(false)
  const [placements, setPlacements] = useState({}) // id -> 'yes' | 'no'
  const [hints, setHints] = useState({})
  const [shakingId, setShakingId] = useState(null)
  const [mistakes, setMistakes] = useState(0)
  const [result, setResult] = useState(null) // { stars, newlyEarnedBadgeId }

  const unsortedItems = useMemo(
    () => LOCK_ITEMS.filter((item) => !placements[item.id]),
    [placements],
  )
  const noItems = LOCK_ITEMS.filter((item) => placements[item.id] === 'no')
  const yesItems = LOCK_ITEMS.filter((item) => placements[item.id] === 'yes')

  const handleSort = (itemId, guess) => {
    const item = LOCK_ITEMS.find((i) => i.id === itemId)
    if (item.answer === guess) {
      playCorrect()
      const nextPlacements = { ...placements, [itemId]: guess }
      setPlacements(nextPlacements)
      setHints((prev) => {
        const next = { ...prev }
        delete next[itemId]
        return next
      })

      const allSorted = LOCK_ITEMS.every((i) => nextPlacements[i.id])
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
        <LockExplanation lang={lang} />
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
          <LockExplanation lang={lang} />
        </HelpModal>
      )}
      <div className="grid gap-4">
        {unsortedItems.length > 0 && (
          <ul className="grid gap-3 sm:grid-cols-2">
            {unsortedItems.map((item) => (
              <LockCard
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
          <BinList label={pick(TEXT.noBinLabel, lang)} tone="no" items={noItems} lang={lang} />
          <BinList label={pick(TEXT.yesBinLabel, lang)} tone="yes" items={yesItems} lang={lang} />
        </div>
      </div>
    </PuzzleShell>
  )
}
