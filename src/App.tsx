import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './hooks/useAuth'
import LandingPage from './components/LandingPage'
import CallbackHandler from './components/CallbackHandler'
import CharacterDashboard from './components/dashboard/CharacterDashboard'
import CharacterDetail from './components/detail/CharacterDetail'
import ZoneDrillDown from './components/detail/ZoneDrillDown'
import PathfinderDrillDown from './components/detail/PathfinderDrillDown'
import type { Character, CharacterProgress } from './domain/types'

type AppView =
  | { screen: 'dashboard' }
  | { screen: 'detail'; character: Character }
  | { screen: 'zone'; character: Character; zoneId: string; progress: CharacterProgress }
  | { screen: 'pathfinder'; character: Character; achievementId: number; progress: CharacterProgress }

export default function App() {
  const { isAuthenticated, isLoading, error } = useAuth()
  const [view, setView] = useState<AppView>({ screen: 'dashboard' })

  const isCallback = new URLSearchParams(window.location.search).has('code')

  // Forward navigation: push a history entry
  const navigateForward = useCallback((next: AppView) => {
    setView(next)
    history.pushState(null, '', window.location.pathname)
  }, [])

  // Browser back button → go back one level
  useEffect(() => {
    function onPopState() {
      setView((prev) => {
        if (prev.screen === 'zone' || prev.screen === 'pathfinder')
          return { screen: 'detail', character: prev.character }
        if (prev.screen === 'detail') return { screen: 'dashboard' }
        return prev
      })
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Back navigation via on-screen buttons: use browser history
  const goBack = useCallback(() => history.back(), [])

  if (isCallback || isLoading) {
    return <CallbackHandler error={error} />
  }

  if (!isAuthenticated) {
    return <LandingPage />
  }

  if (view.screen === 'detail') {
    return (
      <CharacterDetail
        character={view.character}
        onBack={goBack}
        onSelectZone={(zoneId, progress) =>
          navigateForward({ screen: 'zone', character: view.character, zoneId, progress })
        }
        onSelectPathfinder={(achievementId, progress) =>
          navigateForward({ screen: 'pathfinder', character: view.character, achievementId, progress })
        }
      />
    )
  }

  if (view.screen === 'pathfinder') {
    return (
      <PathfinderDrillDown
        character={view.character}
        achievementId={view.achievementId}
        progress={view.progress}
        onBack={goBack}
      />
    )
  }

  if (view.screen === 'zone') {
    return (
      <ZoneDrillDown
        character={view.character}
        zoneId={view.zoneId}
        progress={view.progress}
        onBack={goBack}
      />
    )
  }

  return (
    <CharacterDashboard
      onSelectCharacter={(c) => navigateForward({ screen: 'detail', character: c })}
    />
  )
}
