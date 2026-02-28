import { useState, useCallback, useEffect } from 'react'
import { usePorts } from '../ports/usePorts'
import type { Character, SyncState } from '../domain/types'

const DEFAULT_SYNC_STATE: SyncState = {
  lastSyncTimestamp: null,
  isSyncing: false,
  error: null,
}

export function useSync() {
  const { api, auth, storage } = usePorts()
  const [syncState, setSyncState] = useState<SyncState>(DEFAULT_SYNC_STATE)

  useEffect(() => {
    storage.getSyncState().then(setSyncState).catch(() => {})
  }, [storage])

  const sync = useCallback(async (): Promise<Character[]> => {
    const token = auth.getAccessToken()
    if (!token) {
      throw new Error('Session expired — please log in again')
    }

    const syncing: SyncState = { lastSyncTimestamp: syncState.lastSyncTimestamp, isSyncing: true, error: null }
    setSyncState(syncing)
    await storage.saveSyncState(syncing)

    try {
      const characters = await api.getAccountCharacters(token)
      await storage.saveCharacters(characters)

      const done: SyncState = { lastSyncTimestamp: new Date(), isSyncing: false, error: null }
      setSyncState(done)
      await storage.saveSyncState(done)

      return characters
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sync failed'
      const failed: SyncState = { lastSyncTimestamp: syncState.lastSyncTimestamp, isSyncing: false, error: message }
      setSyncState(failed)
      await storage.saveSyncState(failed)
      throw err
    }
  }, [api, auth, storage, syncState.lastSyncTimestamp])

  return { syncState, sync }
}
