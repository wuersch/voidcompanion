import { useState, useEffect } from 'react'
import { usePorts } from '../ports/usePorts'
import type { CharacterProgress } from '../domain/types'

/**
 * Load cached progress from IndexedDB for all characters.
 * Expects `characterIds` to be a stable reference (memoized by caller).
 */
export function useCachedProgress(characterIds: string[]) {
  const { storage } = usePorts()
  const [progressMap, setProgressMap] = useState<Map<string, CharacterProgress>>(
    new Map(),
  )

  useEffect(() => {
    if (characterIds.length === 0) return

    Promise.all(
      characterIds.map((id) =>
        storage.getProgress(id).then((p) => [id, p] as const),
      ),
    ).then((results) => {
      const map = new Map<string, CharacterProgress>()
      for (const [id, progress] of results) {
        if (progress) map.set(id, progress)
      }
      setProgressMap(map)
    })
  }, [characterIds, storage])

  return progressMap
}
