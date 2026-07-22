import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const STORAGE_KEY = 'cyberquestjr:lang'
export const LANGUAGES = ['en', 'es']

function loadLang() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return LANGUAGES.includes(stored) ? stored : 'en'
  } catch {
    return 'en'
  }
}

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(loadLang)

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'es' : 'en'
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // localStorage unavailable — language preference just won't persist.
      }
      return next
    })
  }, [])

  const value = useMemo(() => ({ lang, toggleLang }), [lang, toggleLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}

// Resolves a bilingual field (an { en, es } object) to the current language's
// string. Puzzle content files use this shape for any text a child reads;
// language-independent data (correct answers, colors, unlock order, literal
// example URLs) stays as plain values, not bilingual objects.
export function pick(field, lang) {
  if (field && typeof field === 'object' && 'en' in field) {
    return field[lang] ?? field.en
  }
  return field
}
