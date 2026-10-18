import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Social Links Tests
 *
 * These tests verify that:
 * 1. Social media links are present and functional
 * 2. Defunct platforms (like Google+) are not present
 * 3. All social icons link to correct destinations
 *
 * Note: Test expectations use values from test.config.ts for easy customization
 */

test.describe('Footer Social Links', () => {
  test('should not contain Google+ social link', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Check that Google+ link is not present
    const googlePlusLink = page.locator('footer a[href*="plus.google.com"]')
    await expect(googlePlusLink).toHaveCount(0)

    // Also check that Google Plus label is not present
    const googlePlusLabel = page.locator('footer a[aria-label="Google Plus"]')
    await expect(googlePlusLabel).toHaveCount(0)
  })

  // The expected links are the site's own (siteConfig.social, via test.config),
  // so the spec holds on the template and on every charity site.
  test('should display active social media links', async ({ page }) => {
    test.skip(testConfig.socialLinks.length === 0, 'No social links configured for this site')
    await page.goto('/')

    for (const { href, label } of testConfig.socialLinks) {
      const link = page.locator(`footer a[href="${href}"]`)
      await expect(link).toBeVisible()
      await expect(link).toHaveAttribute('aria-label', label)
    }
  })

  test('should render one icon per configured social link', async ({ page }) => {
    await page.goto('/')

    const selector = testConfig.socialLinks
      .map(({ label }) => `footer a[aria-label="${label}"]`)
      .join(', ')
    if (!selector) return
    await expect(page.locator(selector)).toHaveCount(testConfig.socialLinks.length)
  })
})
