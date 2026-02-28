import type { Region } from '../../domain/types'

export const OAUTH_CONFIG = {
  clientId: import.meta.env.VITE_BLIZZARD_CLIENT_ID as string,
  clientSecret: import.meta.env.VITE_BLIZZARD_CLIENT_SECRET as string,
  region: (import.meta.env.VITE_BLIZZARD_REGION ?? 'eu') as Region,
  redirectUri: `${window.location.origin}/callback`,
  authorizeUrl: 'https://oauth.battle.net/authorize',
  tokenUrl: 'https://oauth.battle.net/token',
  scopes: ['wow.profile', 'openid'],
} as const
