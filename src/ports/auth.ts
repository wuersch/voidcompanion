export interface AuthPort {
  login(): void
  handleCallback(params: URLSearchParams, signal?: AbortSignal): Promise<void>
  getAccessToken(): string | null
  isAuthenticated(): boolean
  logout(): void
}
