// Zod validators for data integrity
import { z } from 'zod'

// Prevent accidental schema references
const allowedSchemaPattern = /^scout\.(gold_|platinum_)/

export const QueryValidator = z.object({
  query: z.string().refine(
    (q) => {
      const lower = q.toLowerCase()
      // Ensure no suqi.* references
      if (lower.includes('suqi.')) {
        return false
      }
      // Ensure only scout.gold_* or scout.platinum_* tables
      const tableMatches = lower.match(/from\s+(\w+\.\w+)/g)
      if (tableMatches) {
        return tableMatches.every(match => {
          const table = match.replace(/from\s+/i, '')
          return allowedSchemaPattern.test(table)
        })
      }
      return true
    },
    {
      message: 'Query must only reference scout.gold_* or scout.platinum_* tables'
    }
  )
})

export const DateRangeValidator = z.object({
  start: z.string().datetime(),
  end: z.string().datetime(),
})

export const FilterValidator = z.object({
  region: z.string().optional(),
  brand: z.string().optional(),
  store: z.string().optional(),
  dateRange: DateRangeValidator.optional(),
})