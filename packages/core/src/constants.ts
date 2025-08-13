// Core constants

export const APP_NAME = 'Suqi Analytics Platform'
export const APP_VERSION = '0.1.0'

export const ROUTES = {
  HOME: '/',
  ANALYTICS: '/analytics',
  CUSTOMERS: '/customers',
  PRODUCTS: '/products',
  STORES: '/stores',
  ASK_SUQI: '/ask-suqi',
  REPORTS: '/reports',
  DATA_SOURCES: '/data-sources',
  DATA_LINEAGE: '/data-lineage',
} as const

export const API_ENDPOINTS = {
  WRENAI: '/api/wrenai',
  INSIGHTS: '/api/insights',
  REPORTS: '/api/reports',
} as const