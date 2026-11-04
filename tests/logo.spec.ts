import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

test.describe('Logo and Image Visibility', () => {
  test('should display logo in header', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Find the logo in the Header
    // The logo is in a Link element that points to "/" with img alt text
    const headerLogo = page.locator(`header a[href="/"] img[alt="${testConfig.logo.headerAlt}"]`)

    // Verify the logo exists
    await expect(headerLogo).toBeVisible()

    // Verify the logo has the correct alt text
    await expect(headerLogo).toHaveAttribute('alt', testConfig.logo.headerAlt)
  })

  test('shows the homepage hero heading', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('#hero').getByRole('heading', { level: 1 })).toBeVisible()
  })
})
