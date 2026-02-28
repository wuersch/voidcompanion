import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { PortsProvider } from './ports/context'
import { BlizzardAuthAdapter } from './adapters/blizzard-auth/BlizzardAuthAdapter'
import type { Ports } from './ports/PortsContext'

const ports: Ports = {
  auth: new BlizzardAuthAdapter(),
  api: null as unknown as Ports['api'],
  storage: null as unknown as Ports['storage'],
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PortsProvider ports={ports}>
      <App />
    </PortsProvider>
  </StrictMode>,
)
