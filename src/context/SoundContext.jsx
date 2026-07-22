import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { playBadgeTone, playCorrectTone, playIncorrectTone } from '../lib/sound'

const STORAGE_KEY = 'cyberquestjr:muted'

function loadMuted() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

const SoundContext = createContext(null)

export function SoundProvider({ children }) {
  const [muted, setMuted] = useState(loadMuted)

  const toggleMuted = useCallback(() => {
    setMuted((prev) => {
      const next = !prev
      try {
        window.localStorage.setItem(STORAGE_KEY, String(next))
      } catch {
        // localStorage unavailable — mute preference just won't persist.
      }
      return next
    })
  }, [])

  const value = useMemo(
    () => ({
      muted,
      toggleMuted,
      playCorrect: () => !muted && playCorrectTone(),
      playIncorrect: () => !muted && playIncorrectTone(),
      playBadge: () => !muted && playBadgeTone(),
    }),
    [muted, toggleMuted],
  )

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within a SoundProvider')
  return ctx
}
