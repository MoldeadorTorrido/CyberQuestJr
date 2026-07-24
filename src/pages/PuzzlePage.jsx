import { Navigate, useParams } from 'react-router-dom'
import { getUnitById } from '../data/units'
import WeakOrStrong from '../puzzles/WeakOrStrong'
import BuildAStrongPassword from '../puzzles/BuildAStrongPassword'
import SpotThePhishingEmail from '../puzzles/SpotThePhishingEmail'
import WhoCanITellMyPassword from '../puzzles/WhoCanITellMyPassword'
import RealOrFakeLink from '../puzzles/RealOrFakeLink'
import WhatWouldYouDo from '../puzzles/WhatWouldYouDo'
import LockItUp from '../puzzles/LockItUp'
import ThinkBeforeYouPost from '../puzzles/ThinkBeforeYouPost'
import TooGoodToBeTrue from '../puzzles/TooGoodToBeTrue'
import WhosReallyThere from '../puzzles/WhosReallyThere'
import KeepItUpdated from '../puzzles/KeepItUpdated'
import ComingSoon from '../puzzles/ComingSoon'

const PUZZLE_COMPONENTS = {
  'weak-or-strong': WeakOrStrong,
  'build-a-password': BuildAStrongPassword,
  'spot-the-phishing-email': SpotThePhishingEmail,
  'who-can-i-tell': WhoCanITellMyPassword,
  'real-or-fake-link': RealOrFakeLink,
  'what-would-you-do': WhatWouldYouDo,
  'lock-it-up': LockItUp,
  'think-before-you-post': ThinkBeforeYouPost,
  'too-good-to-be-true': TooGoodToBeTrue,
  'whos-really-there': WhosReallyThere,
  'keep-it-updated': KeepItUpdated,
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
