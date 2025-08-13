// Feature flags system

interface FeatureFlags {
  askSuqiEnabled: boolean
  advancedAnalyticsEnabled: boolean
  aiInsightsEnabled: boolean
  exportReportsEnabled: boolean
}

const defaultFlags: FeatureFlags = {
  askSuqiEnabled: true,
  advancedAnalyticsEnabled: true,
  aiInsightsEnabled: true,
  exportReportsEnabled: true,
}

export function getFeatureFlags(): FeatureFlags {
  // In production, these would come from a service or env vars
  return defaultFlags
}

export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  const flags = getFeatureFlags()
  return flags[feature] ?? false
}