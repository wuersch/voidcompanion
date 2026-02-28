import Dexie from 'dexie'
import type { Character, CharacterProgress, SyncState } from '../../domain/types'
import type { StoragePort } from '../../ports/storage'

const db = new Dexie('MidnightCompanion') as Dexie & {
  characters: Dexie.Table<Character, string>
  characterProgress: Dexie.Table<CharacterProgress & { characterId: string }, string>
  syncState: Dexie.Table<SyncState & { key: string }, string>
}

db.version(1).stores({
  characters: 'id',
  characterProgress: 'characterId',
  syncState: 'key',
})

const DEFAULT_SYNC_STATE: SyncState = {
  lastSyncTimestamp: null,
  isSyncing: false,
  error: null,
}

export class DexieStorageAdapter implements StoragePort {
  async getCharacters(): Promise<Character[]> {
    return db.characters.toArray()
  }

  async saveCharacters(characters: Character[]): Promise<void> {
    await db.transaction('rw', db.characters, async () => {
      await db.characters.clear()
      await db.characters.bulkPut(characters)
    })
  }

  async getProgress(characterId: string): Promise<CharacterProgress | null> {
    const row = await db.characterProgress.get(characterId)
    if (!row) return null
    return {
      campaign: row.campaign,
      pathfinder: row.pathfinder,
      renown: row.renown,
    }
  }

  async saveProgress(characterId: string, progress: CharacterProgress): Promise<void> {
    await db.characterProgress.put({ characterId, ...progress })
  }

  async getSyncState(): Promise<SyncState> {
    const row = await db.syncState.get('global')
    if (!row) return DEFAULT_SYNC_STATE
    return {
      lastSyncTimestamp: row.lastSyncTimestamp,
      isSyncing: row.isSyncing,
      error: row.error,
    }
  }

  async saveSyncState(state: SyncState): Promise<void> {
    await db.syncState.put({ key: 'global', ...state })
  }

  async clear(): Promise<void> {
    await db.transaction('rw', [db.characters, db.characterProgress, db.syncState], async () => {
      await db.characters.clear()
      await db.characterProgress.clear()
      await db.syncState.clear()
    })
  }
}
