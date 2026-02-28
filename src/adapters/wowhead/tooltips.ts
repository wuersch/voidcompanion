const WOWHEAD_SCRIPT_URL = 'https://wow.zamimg.com/js/tooltips.js'

declare global {
  interface Window {
    whTooltips?: { colorLinks: boolean; iconizeLinks: boolean }
    $WowheadPower?: { refreshLinks: () => void }
  }
}

/** Load the Wowhead tooltip script (idempotent, HMR-safe). */
export function loadWowheadTooltips(): void {
  if (document.querySelector(`script[src="${WOWHEAD_SCRIPT_URL}"]`)) return

  window.whTooltips = { colorLinks: false, iconizeLinks: false }

  const script = document.createElement('script')
  script.src = WOWHEAD_SCRIPT_URL
  script.async = true
  document.head.appendChild(script)
}

/** Re-scan the DOM for new Wowhead links after React renders. */
export function refreshWowheadTooltips(): void {
  window.$WowheadPower?.refreshLinks()
}
