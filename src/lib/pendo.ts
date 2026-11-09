type PendoTrackProperties = Record<string, string | number | boolean>

declare global {
  interface Window {
    pendo?: {
      track: (event: string, properties?: PendoTrackProperties) => void
    }
  }
}

export function trackPendoEvent(
  event: string,
  properties?: PendoTrackProperties,
) {
  try {
    window.pendo?.track(event, properties)
  } catch {
    // Analytics must never break the user flow.
  }
}
