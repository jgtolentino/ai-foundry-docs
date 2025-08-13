// Telemetry with dual-emit for migration period

interface TelemetryEvent {
  event: string
  properties?: Record<string, any>
}

class Telemetry {
  private dualEmitEnabled = true
  private dualEmitEndDate = new Date('2024-08-28') // 2 weeks from now

  capture(event: string, properties?: Record<string, any>) {
    // Primary event
    this.sendEvent(event, properties)

    // Dual-emit for migration period
    if (this.shouldDualEmit()) {
      // Map new event names to legacy names
      const legacyEvent = this.mapToLegacyEvent(event)
      if (legacyEvent !== event) {
        this.sendEvent(legacyEvent, { ...properties, _alias: true })
      }
    }
  }

  private shouldDualEmit(): boolean {
    return this.dualEmitEnabled && new Date() < this.dualEmitEndDate
  }

  private mapToLegacyEvent(event: string): string {
    const mappings: Record<string, string> = {
      'Suqi.': 'Scout.',
      'AskSuqi.': 'RetailBot.',
    }

    for (const [newPrefix, oldPrefix] of Object.entries(mappings)) {
      if (event.startsWith(newPrefix)) {
        return event.replace(newPrefix, oldPrefix)
      }
    }

    return event
  }

  private sendEvent(event: string, properties?: Record<string, any>) {
    // In production, this would send to PostHog/Segment/etc
    if (typeof window !== 'undefined' && (window as any).posthog) {
      (window as any).posthog.capture(event, properties)
    } else {
      console.log('[Telemetry]', event, properties)
    }
  }
}

export const telemetry = new Telemetry()