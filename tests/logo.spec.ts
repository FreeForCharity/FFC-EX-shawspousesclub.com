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

test.describe('Header scroll layout', () => {
  test('keeps the compact navigation at the top after the image scrolls away', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, 700))
    const navigation = page.locator('#header > div')
    await expect.poll(async () => Math.round((await navigation.boundingBox())!.y)).toBe(0)
    await expect(page.locator('.club-nav-brand')).toBeVisible()
    const headerBox = (await page.locator('#header').boundingBox())!
    const bannerBox = (await page.locator('.club-banner').boundingBox())!
    expect(bannerBox.y).toBeCloseTo(headerBox.y, 0)
    expect(headerBox.height - bannerBox.height).toBeCloseTo(70, 0)
  })

  test('scrolls the entire mobile header away', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    const header = page.locator('#header')
    const initialBox = (await header.boundingBox())!

    await page.evaluate((distance) => window.scrollTo(0, distance), initialBox.height + 100)

    await expect
      .poll(async () => {
        const box = (await header.boundingBox())!
        return box.y + box.height
      })
      .toBeLessThan(0)
  })
})
