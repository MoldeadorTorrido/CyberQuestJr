import { useCallback, useEffect, useState } from 'react'
import { UNITS, getUnitById } from '../data/units'
import { BADGES, isBadgeEarned } from '../data/badges'

const STORAGE_KEY = 'cyberquestjr:progress:v1'

const EMPTY_PROGRESS = {
  completedUnits: {}, // unitId -> { stars, completedAt }
  earnedBadgeIds: [],
}

function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY_PROGRESS
    const parsed = JSON.parse(raw)
    return {
      completedUnits: parsed.completedUnits ?? {},
      earnedBadgeIds: parsed.earnedBadgeIds ?? [],
    }
  } catch {
    return EMPTY_PROGRESS
  }
}

function saveProgress(progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // localStorage unavailable (e.g. private mode) — progress just won't persist.
  }
}

export function useProgress() {
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    saveProgress(progress)
  }, [progress])

  const isUnitUnlocked = useCallback(
    (unitId) => {
      const unit = getUnitById(unitId)
      if (!unit) return false
      if (unit.order === 1) return true
      const previous = UNITS.find((u) => u.order === unit.order - 1)
      return Boolean(previous && progress.completedUnits[previous.id])
    },
    [progress],
  )

  const getUnitStars = useCallback(
    (unitId) => progress.completedUnits[unitId]?.stars ?? 0,
    [progress],
  )

  // Marks a unit complete, saves its stars, and returns any badge newly earned
  // as a result (so the caller can show a celebration).
  const completeUnit = useCallback((unitId, stars) => {
    let newlyEarnedBadge = null

    setProgress((prev) => {
      const completedUnits = {
        ...prev.completedUnits,
        [unitId]: { stars, completedAt: Date.now() },
      }
      const completedIds = Object.keys(completedUnits)

      const earnedBadgeIds = [...prev.earnedBadgeIds]
      for (const badge of BADGES) {
        if (
          !earnedBadgeIds.includes(badge.id) &&
          isBadgeEarned(badge.id, completedIds)
        ) {
          earnedBadgeIds.push(badge.id)
          newlyEarnedBadge = badge.id
        }
      }

      return { completedUnits, earnedBadgeIds }
    })

    return newlyEarnedBadge
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(EMPTY_PROGRESS)
  }, [])

  return {
    progress,
    isUnitUnlocked,
    getUnitStars,
    completeUnit,
    resetProgress,
    earnedBadgeIds: progress.earnedBadgeIds,
  }
}
