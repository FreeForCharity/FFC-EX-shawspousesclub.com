import { expect, test } from '@playwright/test'
import { testConfig } from './test.config'

test('loads the homepage header banner', async ({ page }) => {
  await page.goto('/')

  const banner = page.locator('header').getByAltText(testConfig.logo.headerAlt, { exact: true })
  await expect(banner).toBeVisible()
  await expect
    .poll(() => banner.evaluate((image: HTMLImageElement) => image.naturalWidth))
    .toBeGreaterThan(0)
})
