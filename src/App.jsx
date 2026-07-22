import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PuzzlePage from './pages/PuzzlePage'
import { useProgress } from './hooks/useProgress'
import { SoundProvider } from './context/SoundContext'
import { LanguageProvider } from './i18n/LanguageContext'
import SoundToggle from './components/SoundToggle'
import LanguageToggle from './components/LanguageToggle'

export default function App() {
  const { isUnitUnlocked, getUnitStars, completeUnit, earnedBadgeIds } =
    useProgress()

  return (
    <LanguageProvider>
      <SoundProvider>
        <HashRouter>
          <div className="fixed right-3 top-3 z-50 flex gap-2 sm:right-4 sm:top-4">
            <LanguageToggle />
            <SoundToggle />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isUnitUnlocked={isUnitUnlocked}
                  getUnitStars={getUnitStars}
                  earnedBadgeIds={earnedBadgeIds}
                />
              }
            />
            <Route
              path="/unit/:unitId"
              element={
                <PuzzlePage
                  isUnitUnlocked={isUnitUnlocked}
                  completeUnit={completeUnit}
                />
              }
            />
          </Routes>
        </HashRouter>
      </SoundProvider>
    </LanguageProvider>
  )
}
