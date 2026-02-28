export interface AuthPort {
  login(): void
  handleCallback(params: URLSearchParams): Promise<void>
  getAccessToken(): string | null
  isAuthenticated(): boolean
  logout(): void
}
