import { useAuth } from './hooks/useAuth'
import LandingPage from './components/LandingPage'
import CallbackHandler from './components/CallbackHandler'
import CharacterDashboard from './components/dashboard/CharacterDashboard'

export default function App() {
  const { isAuthenticated, isLoading, error } = useAuth()

  const isCallback = new URLSearchParams(window.location.search).has('code')

  if (isCallback || isLoading) {
    return <CallbackHandler error={error} />
  }

  if (isAuthenticated) {
    return <CharacterDashboard />
  }

  return <LandingPage />
}
