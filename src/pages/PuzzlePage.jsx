import { Navigate, useParams } from 'react-router-dom'
import { getUnitById } from '../data/units'
import WeakOrStrong from '../puzzles/WeakOrStrong'
import BuildAStrongPassword from '../puzzles/BuildAStrongPassword'
import ComingSoon from '../puzzles/ComingSoon'

const PUZZLE_COMPONENTS = {
  'weak-or-strong': WeakOrStrong,
  'build-a-password': BuildAStrongPassword,
}

export default function PuzzlePage({ isUnitUnlocked, completeUnit }) {
  const { unitId } = useParams()
  const unit = getUnitById(unitId)

  if (!unit || !isUnitUnlocked(unitId)) {
    return <Navigate to="/" replace />
  }

  if (unit.status !== 'ready') {
    return <ComingSoon unit={unit} />
  }

  const PuzzleComponent = PUZZLE_COMPONENTS[unitId]
  return (
    <PuzzleComponent onComplete={(stars) => completeUnit(unitId, stars)} />
  )
}
