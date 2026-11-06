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
  test('keeps a continuous patterned surround on desktop navigation', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    await page.evaluate(() => window.scrollTo(0, 700))

    const header = page.locator('#header')
    await expect.poll(async () => Math.round((await header.boundingBox())!.y)).toBe(-320)

    const headerBox = (await header.boundingBox())!
    const navigationBox = (await page.locator('#header > div').boundingBox())!
    const bannerBox = (await page.locator('.club-banner').boundingBox())!
    const imageBox = (await page.locator('.club-banner-image').boundingBox())!

    expect(navigationBox.y).toBeCloseTo(15, 0)
    expect(headerBox.y + headerBox.height - navigationBox.y - navigationBox.height).toBeCloseTo(
      15,
      0
    )
    expect(bannerBox.y).toBeCloseTo(headerBox.y, 0)
    expect(bannerBox.height).toBeCloseTo(headerBox.height, 0)
    expect(imageBox.y).toBeLessThanOrEqual(headerBox.y)
    expect(imageBox.y + imageBox.height).toBeGreaterThanOrEqual(headerBox.y + headerBox.height)
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
