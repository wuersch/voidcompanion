import { useState, useEffect, useCallback, useRef } from 'react'
import { usePorts } from '../ports/usePorts'

type AuthState = {
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export function useAuth() {
  const { auth } = usePorts()
  const handlingCallback = useRef(false)

  const [state, setState] = useState<AuthState>(() => {
    const isCallback = new URLSearchParams(window.location.search).has('code')
    return {
      isAuthenticated: auth.isAuthenticated(),
      isLoading: isCallback,
      error: null,
    }
  })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (!params.has('code')) return
    if (handlingCallback.current) return
    handlingCallback.current = true

    auth
      .handleCallback(params)
      .then(() => {
        setState({ isAuthenticated: true, isLoading: false, error: null })
      })
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Authentication failed'
        setState({ isAuthenticated: false, isLoading: false, error: message })
      })
  }, [auth])

  const login = useCallback(() => auth.login(), [auth])
  const logout = useCallback(() => auth.logout(), [auth])

  return { ...state, login, logout }
}
