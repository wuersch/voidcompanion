import type { AuthPort } from '../../ports/auth'
import { OAUTH_CONFIG } from './config'
import { sessionStore } from './session'

function generateState(): string {
  const bytes = new Uint8Array(16)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

export class BlizzardAuthAdapter implements AuthPort {
  login(): void {
    const state = generateState()
    sessionStore.saveState(state)

    const params = new URLSearchParams({
      client_id: OAUTH_CONFIG.clientId,
      redirect_uri: OAUTH_CONFIG.redirectUri,
      response_type: 'code',
      scope: OAUTH_CONFIG.scopes.join(' '),
      state,
    })

    window.location.href = `${OAUTH_CONFIG.authorizeUrl}?${params.toString()}`
  }

  async handleCallback(
    params: URLSearchParams,
    signal?: AbortSignal,
  ): Promise<void> {
    const error = params.get('error')
    if (error) {
      history.replaceState({}, '', '/')
      throw new Error(
        `OAuth error: ${params.get('error_description') ?? error}`,
      )
    }

    const code = params.get('code')
    if (!code) {
      history.replaceState({}, '', '/')
      throw new Error('No authorization code in callback')
    }

    const receivedState = params.get('state')
    if (!receivedState) {
      history.replaceState({}, '', '/')
      throw new Error('No state parameter in callback')
    }

    const storedState = sessionStore.consumeState()
    if (!storedState || storedState !== receivedState) {
      history.replaceState({}, '', '/')
      throw new Error('OAuth state mismatch — possible CSRF attack')
    }

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: OAUTH_CONFIG.redirectUri,
      client_id: OAUTH_CONFIG.clientId,
      client_secret: OAUTH_CONFIG.clientSecret,
    })

    try {
      const response = await fetch(OAUTH_CONFIG.tokenUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal,
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(
          `Token exchange failed (${response.status}): ${text}`,
        )
      }

      const data = (await response.json()) as {
        access_token: string
        expires_in: number
      }
      sessionStore.saveToken(data.access_token, data.expires_in)

      history.replaceState({}, '', '/')
    } catch (err) {
      history.replaceState({}, '', '/')
      throw err
    }
  }

  getAccessToken(): string | null {
    return sessionStore.readToken()
  }

  isAuthenticated(): boolean {
    return this.getAccessToken() !== null
  }

  logout(): void {
    sessionStore.clear()
    window.location.href = '/'
  }
}
