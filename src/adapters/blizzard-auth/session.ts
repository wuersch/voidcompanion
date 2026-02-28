const KEYS = {
  token: 'mlc_auth_token',
  state: 'mlc_oauth_state',
} as const

type StoredToken = {
  accessToken: string
  expiresAt: number
}

export const sessionStore = {
  saveToken(accessToken: string, expiresIn: number): void {
    const record: StoredToken = {
      accessToken,
      expiresAt: Date.now() + expiresIn * 1000,
    }
    sessionStorage.setItem(KEYS.token, JSON.stringify(record))
  },

  readToken(): string | null {
    const raw = sessionStorage.getItem(KEYS.token)
    if (!raw) return null
    try {
      const record: unknown = JSON.parse(raw)
      if (
        typeof record !== 'object' ||
        record === null ||
        typeof (record as StoredToken).accessToken !== 'string' ||
        typeof (record as StoredToken).expiresAt !== 'number'
      ) {
        sessionStorage.removeItem(KEYS.token)
        return null
      }
      const { accessToken, expiresAt } = record as StoredToken
      if (Date.now() >= expiresAt) {
        sessionStorage.removeItem(KEYS.token)
        return null
      }
      return accessToken
    } catch {
      sessionStorage.removeItem(KEYS.token)
      return null
    }
  },

  saveState(state: string): void {
    sessionStorage.setItem(KEYS.state, state)
  },

  consumeState(): string | null {
    const state = sessionStorage.getItem(KEYS.state)
    sessionStorage.removeItem(KEYS.state)
    return state
  },

  clear(): void {
    sessionStorage.removeItem(KEYS.token)
    sessionStorage.removeItem(KEYS.state)
  },
}
