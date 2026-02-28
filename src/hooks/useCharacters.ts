import { useState, useEffect } from 'react'
import { usePorts } from '../ports/usePorts'
import type { Character } from '../domain/types'

export function useCharacters() {
  const { storage } = usePorts()
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    storage
      .getCharacters()
      .then(setCharacters)
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [storage])

  return { characters, isLoading, setCharacters }
}
