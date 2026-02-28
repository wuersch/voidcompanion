import type { Character, CharacterProgress, SyncState } from '../domain/types'

export interface StoragePort {
  getCharacters(): Promise<Character[]>
  saveCharacters(characters: Character[]): Promise<void>
  getProgress(characterId: string): Promise<CharacterProgress | null>
  saveProgress(characterId: string, progress: CharacterProgress): Promise<void>
  getSyncState(): Promise<SyncState>
  saveSyncState(state: SyncState): Promise<void>
  clear(): Promise<void>
}
