import { createContext } from 'react'
import type { ApiPort } from './api'
import type { AuthPort } from './auth'
import type { StoragePort } from './storage'

export type Ports = {
  api: ApiPort
  auth: AuthPort
  storage: StoragePort
}

export const PortsContext = createContext<Ports | null>(null)
