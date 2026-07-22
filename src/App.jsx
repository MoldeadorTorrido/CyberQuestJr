import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PuzzlePage from './pages/PuzzlePage'
import { useProgress } from './hooks/useProgress'

export default function App() {
  const { isUnitUnlocked, getUnitStars, completeUnit, earnedBadgeIds } =
    useProgress()

  return (
    <HashRouter>
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
  )
}
