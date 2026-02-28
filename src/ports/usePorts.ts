import { useContext } from 'react'
import { PortsContext } from './PortsContext'
import type { Ports } from './PortsContext'

export type { Ports }

export function usePorts(): Ports {
  const ports = useContext(PortsContext)
  if (!ports) {
    throw new Error('usePorts must be used within a <PortsProvider>')
  }
  return ports
}
