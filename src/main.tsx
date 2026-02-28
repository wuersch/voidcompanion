import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { PortsProvider } from './ports/context'
import { BlizzardAuthAdapter } from './adapters/blizzard-auth/BlizzardAuthAdapter'
import { BlizzardApiAdapter } from './adapters/blizzard-api/BlizzardApiAdapter'
import { DexieStorageAdapter } from './adapters/dexie-storage/DexieStorageAdapter'
import { OAUTH_CONFIG } from './adapters/blizzard-auth/config'
import type { Ports } from './ports/PortsContext'

const ports: Ports = {
  auth: new BlizzardAuthAdapter(),
  api: new BlizzardApiAdapter(OAUTH_CONFIG.region),
  storage: new DexieStorageAdapter(),
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortsProvider ports={ports}>
      <App />
    </PortsProvider>
  </StrictMode>,
)
