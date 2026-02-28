import type { ReactNode } from 'react'
import { PortsContext } from './PortsContext'
import type { Ports } from './PortsContext'

export type { Ports }

export function PortsProvider({
  ports,
  children,
}: {
  ports: Ports
  children: ReactNode
}) {
  return <PortsContext.Provider value={ports}>{children}</PortsContext.Provider>
}
