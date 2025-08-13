import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const TOP_ROUTES = [
  { path: '/', name: 'Dashboard Home' },
  { path: '/analytics', name: 'Analytics Dashboard' },
  { path: '/ask-suqi', name: 'Ask Suqi AI Assistant' },
  { path: '/reports', name: 'Reports Section' },
  { path: '/insights', name: 'Insights Overview' }
]

test.describe('Accessibility Tests', () => {
  TOP_ROUTES.forEach(({ path, name }) => {
    test(`${name} should have no accessibility violations`, async ({ page }) => {
      await page.goto(path)
      
      // Wait for dynamic content to load
      await page.waitForLoadState('networkidle')
      
      // Run axe accessibility scan
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      
      // Log violations for debugging
      if (accessibilityScanResults.violations.length > 0) {
        console.log(`Accessibility violations found on ${name}:`)
        accessibilityScanResults.violations.forEach((violation, index) => {
          console.log(`\n${index + 1}. ${violation.id}: ${violation.description}`)
          console.log(`   Impact: ${violation.impact}`)
          console.log(`   Help: ${violation.help}`)
          console.log(`   Help URL: ${violation.helpUrl}`)
          violation.nodes.forEach((node) => {
            console.log(`   - Element: ${node.html}`)
            console.log(`     Failure: ${node.failureSummary}`)
          })
        })
      }
      
      expect(accessibilityScanResults.violations).toEqual([])
    })

    test(`${name} should have proper keyboard navigation`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      
      // Test tab navigation
      const tabbableElements = await page.$$eval(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
        elements => elements.length
      )
      
      expect(tabbableElements).toBeGreaterThan(0)
      
      // Test focus visibility
      await page.keyboard.press('Tab')
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement
        return {
          tagName: el?.tagName,
          hasOutline: window.getComputedStyle(el).outline !== 'none',
          hasBorder: window.getComputedStyle(el).borderStyle !== 'none'
        }
      })
      
      expect(focusedElement.hasOutline || focusedElement.hasBorder).toBe(true)
    })

    test(`${name} should have proper heading structure`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      
      const headings = await page.$$eval(
        'h1, h2, h3, h4, h5, h6',
        elements => elements.map(el => ({
          level: parseInt(el.tagName[1]),
          text: el.textContent?.trim()
        }))
      )
      
      // Check for h1
      const h1Count = headings.filter(h => h.level === 1).length
      expect(h1Count).toBe(1)
      
      // Check heading hierarchy
      let previousLevel = 0
      headings.forEach(heading => {
        expect(heading.level - previousLevel).toBeLessThanOrEqual(1)
        previousLevel = heading.level
      })
    })

    test(`${name} should have proper color contrast`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .withRules(['color-contrast'])
        .analyze()
      
      expect(accessibilityScanResults.violations).toEqual([])
    })

    test(`${name} should have proper ARIA labels`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      
      // Check interactive elements have accessible names
      const elementsWithoutLabels = await page.$$eval(
        'button:not([aria-label]):not([aria-labelledby]):empty, a:not([aria-label]):not([aria-labelledby]):empty',
        elements => elements.map(el => ({
          tagName: el.tagName,
          html: el.outerHTML.substring(0, 100)
        }))
      )
      
      expect(elementsWithoutLabels).toEqual([])
      
      // Check form inputs have labels
      const inputsWithoutLabels = await page.$$eval(
        'input:not([aria-label]):not([aria-labelledby]):not([type="hidden"]), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])',
        elements => elements.map(el => {
          const id = el.id
          const hasLabel = id ? document.querySelector(`label[for="${id}"]`) !== null : false
          return hasLabel ? null : {
            tagName: el.tagName,
            type: el.getAttribute('type'),
            name: el.getAttribute('name')
          }
        }).filter(Boolean)
      )
      
      expect(inputsWithoutLabels).toEqual([])
    })
  })

  test('Mobile viewport accessibility', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('Reduced motion preferences', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    
    // Check that animations respect prefers-reduced-motion
    const hasTransitions = await page.evaluate(() => {
      const elements = document.querySelectorAll('*')
      return Array.from(elements).some(el => {
        const styles = window.getComputedStyle(el)
        const transitionDuration = parseFloat(styles.transitionDuration)
        const animationDuration = parseFloat(styles.animationDuration)
        return transitionDuration > 0 || animationDuration > 0
      })
    })
    
    expect(hasTransitions).toBe(false)
  })
})