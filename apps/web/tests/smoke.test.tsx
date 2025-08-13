import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
  test.describe('Redirect Tests', () => {
    test('should redirect /retailbot to /ask-suqi', async ({ page }) => {
      const response = await page.goto('/retailbot')
      expect(response?.status()).toBe(200)
      expect(page.url()).toContain('/ask-suqi')
    })

    test('should redirect /scout-analytics/* to /suqi-analytics/*', async ({ page }) => {
      const routes = [
        '/scout-analytics/dashboard',
        '/scout-analytics/reports/weekly',
        '/scout-analytics/insights'
      ]

      for (const route of routes) {
        const response = await page.goto(route)
        expect(response?.status()).toBe(200)
        expect(page.url()).toContain(route.replace('scout-analytics', 'suqi-analytics'))
      }
    })
  })

  test.describe('Ask Suqi SSE Tests', () => {
    test('Ask Suqi page should load successfully', async ({ page }) => {
      await page.goto('/ask-suqi')
      
      // Check page title
      await expect(page).toHaveTitle(/Ask Suqi/)
      
      // Check main elements exist
      await expect(page.locator('h1:has-text("Ask Suqi")')).toBeVisible()
      await expect(page.locator('textarea[placeholder*="Ask"]')).toBeVisible()
      await expect(page.locator('button:has-text("Send")')).toBeVisible()
    })

    test('Ask Suqi should handle SSE streaming', async ({ page }) => {
      await page.goto('/ask-suqi')
      
      // Type a question
      const textarea = page.locator('textarea[placeholder*="Ask"]')
      await textarea.fill('What are the top selling products this week?')
      
      // Set up SSE listener
      const sseMessages: string[] = []
      page.on('response', response => {
        if (response.url().includes('/api/ask-suqi') && response.headers()['content-type']?.includes('text/event-stream')) {
          response.body().then(body => {
            const text = body.toString()
            sseMessages.push(text)
          })
        }
      })
      
      // Click send button
      await page.locator('button:has-text("Send")').click()
      
      // Wait for response to appear
      await page.waitForSelector('.response-container', { timeout: 10000 })
      
      // Verify streaming response
      expect(sseMessages.length).toBeGreaterThan(0)
      
      // Check response content
      const responseContent = await page.locator('.response-container').textContent()
      expect(responseContent).toBeTruthy()
    })

    test('Ask Suqi should handle errors gracefully', async ({ page }) => {
      await page.goto('/ask-suqi')
      
      // Intercept API calls to simulate error
      await page.route('**/api/ask-suqi', route => {
        route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Internal Server Error' })
        })
      })
      
      // Type and send a question
      const textarea = page.locator('textarea[placeholder*="Ask"]')
      await textarea.fill('Test error handling')
      await page.locator('button:has-text("Send")').click()
      
      // Check error message appears
      await expect(page.locator('text=/error|Error|failed|Failed/')).toBeVisible({ timeout: 5000 })
    })
  })

  test.describe('Production URL Tests', () => {
    const prodUrls = [
      process.env.PROD_WEB_URL || 'https://suqi-web.vercel.app',
      process.env.PROD_DOCS_URL || 'https://suqi-docs.vercel.app'
    ]

    prodUrls.forEach(url => {
      test(`Production site ${url} should be accessible`, async ({ page }) => {
        // Skip if running locally without prod URLs
        if (url.includes('localhost')) {
          test.skip()
        }
        
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' })
        expect(response?.status()).toBe(200)
        
        // Check for no console errors
        const errors: string[] = []
        page.on('console', msg => {
          if (msg.type() === 'error') {
            errors.push(msg.text())
          }
        })
        
        await page.waitForTimeout(2000)
        expect(errors).toEqual([])
      })
    })
  })

  test.describe('API Health Checks', () => {
    test('API endpoints should be healthy', async ({ request }) => {
      const endpoints = [
        '/api/health',
        '/api/analytics/overview',
        '/api/ask-suqi/models'
      ]

      for (const endpoint of endpoints) {
        const response = await request.get(endpoint)
        expect(response.status()).toBeLessThan(400)
      }
    })
  })

  test.describe('Performance Tests', () => {
    test('Page load performance should be acceptable', async ({ page }) => {
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 0,
          firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
        }
      })

      // Performance thresholds
      expect(metrics.firstContentfulPaint).toBeLessThan(3000) // FCP < 3s
      expect(metrics.domContentLoaded).toBeLessThan(5000) // DOM < 5s
    })
  })
})