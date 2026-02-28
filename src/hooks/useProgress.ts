import { useState, useEffect } from 'react'
import { usePorts } from '../ports/usePorts'
import { assembleProgress } from '../domain/assembleProgress'
import type { Character, CharacterProgress } from '../domain/types'

type ProgressState = {
  progress: CharacterProgress | null
  isLoading: boolean
  error: string | null
}

export function useProgress(character: Character) {
  const { api, auth, storage } = usePorts()

  const token = auth.getAccessToken()

  const [state, setState] = useState<ProgressState>(() => ({
    progress: null,
    isLoading: !!token,
    error: token ? null : 'Session expired — please log in again',
  }))

  useEffect(() => {
    if (!token) return

    let cancelled = false
    let freshArrived = false

    const realm = character.realm
    const name = character.name.toLowerCase()

    // Load cached data for instant display
    storage
      .getProgress(character.id)
      .then((cached) => {
        if (!cancelled && !freshArrived && cached)
          setState((prev) => ({ ...prev, progress: cached }))
      })
      .catch(() => {})

    // Fetch fresh data
    Promise.all([
      api.getCharacterAchievements(token, realm, name),
      api.getCompletedQuests(token, realm, name),
      api.getReputations(token, realm, name),
    ])
      .then(([achievements, questIds, reputations]) => {
        if (cancelled) return
        freshArrived = true
        const progress = assembleProgress(achievements, questIds, reputations)
        setState({ progress, isLoading: false, error: null })
        storage.saveProgress(character.id, progress).catch(() => {})
      })
      .catch((err) => {
        if (cancelled) return
        const message =
          err instanceof Error ? err.message : 'Failed to load progress'
        setState((prev) => ({ ...prev, isLoading: false, error: message }))
      })

    return () => {
      cancelled = true
    }
  }, [character.id, character.realm, character.name, token, api, storage])

  return state
}
