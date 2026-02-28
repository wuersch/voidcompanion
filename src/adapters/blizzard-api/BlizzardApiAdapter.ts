import type { Character, FactionRenown } from '../../domain/types'
import type { Region } from '../../domain/types'
import type { ApiPort, CharacterAchievementData } from '../../ports/api'
import type {
  RawAccountProfile,
  RawCharacterMedia,
  RawAchievements,
  RawCompletedQuests,
  RawReputations,
} from './types'
import {
  transformAccountCharacters,
  extractAvatarUrl,
  transformAchievements,
  transformCompletedQuests,
  transformReputations,
} from './transforms'

function apiHost(region: Region): string {
  return region === 'us'
    ? 'https://us.api.blizzard.com'
    : `https://${region}.api.blizzard.com`
}

export class BlizzardApiAdapter implements ApiPort {
  private host: string
  private namespace: string

  constructor(region: Region) {
    this.host = apiHost(region)
    this.namespace = `profile-${region}`
  }

  private async apiFetch<T>(path: string, token: string): Promise<T> {
    const separator = path.includes('?') ? '&' : '?'
    const url = `${this.host}${path}${separator}namespace=${this.namespace}&locale=en_US`
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!response.ok) {
      throw new Error(`Blizzard API ${response.status}: ${path}`)
    }
    return response.json() as Promise<T>
  }

  async getAccountCharacters(token: string): Promise<Character[]> {
    const raw = await this.apiFetch<RawAccountProfile>(
      '/profile/user/wow',
      token,
    )
    const characters = transformAccountCharacters(raw)

    // Fetch avatars in parallel — individual failures are non-fatal
    const mediaResults = await Promise.allSettled(
      characters.map((c) =>
        this.apiFetch<RawCharacterMedia>(
          `/profile/wow/character/${c.realm}/${encodeURIComponent(c.name.toLowerCase())}/character-media`,
          token,
        ),
      ),
    )

    for (let i = 0; i < characters.length; i++) {
      const result = mediaResults[i]
      if (result.status === 'fulfilled') {
        characters[i].avatarUrl = extractAvatarUrl(result.value)
      }
    }

    return characters
  }

  async getCharacterMedia(
    token: string,
    realm: string,
    name: string,
  ): Promise<{ avatarUrl: string }> {
    const raw = await this.apiFetch<RawCharacterMedia>(
      `/profile/wow/character/${realm}/${encodeURIComponent(name.toLowerCase())}/character-media`,
      token,
    )
    return { avatarUrl: extractAvatarUrl(raw) }
  }

  async getCharacterAchievements(
    token: string,
    realm: string,
    name: string,
  ): Promise<CharacterAchievementData> {
    const raw = await this.apiFetch<RawAchievements>(
      `/profile/wow/character/${realm}/${encodeURIComponent(name.toLowerCase())}/achievements`,
      token,
    )
    return transformAchievements(raw)
  }

  async getCompletedQuests(
    token: string,
    realm: string,
    name: string,
  ): Promise<number[]> {
    const raw = await this.apiFetch<RawCompletedQuests>(
      `/profile/wow/character/${realm}/${encodeURIComponent(name.toLowerCase())}/quests/completed`,
      token,
    )
    return transformCompletedQuests(raw)
  }

  async getReputations(
    token: string,
    realm: string,
    name: string,
  ): Promise<FactionRenown[]> {
    const raw = await this.apiFetch<RawReputations>(
      `/profile/wow/character/${realm}/${encodeURIComponent(name.toLowerCase())}/reputations`,
      token,
    )
    return transformReputations(raw)
  }
}
