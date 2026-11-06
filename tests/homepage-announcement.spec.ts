import { test, expect } from '@playwright/test'

test('approved homepage, persistent dismissal, and event destinations', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Where friendship meets purpose.'
  )
  await expect(page.getByRole('heading', { name: 'Our Mission' })).toBeVisible()
  await expect(page.locator('.club-nav-brand')).toContainText('COMMUNITY • CONNECTION • SERVICE')
  const banner = page.getByRole('complementary', { name: 'Club announcement' })
  await expect(banner).toBeVisible()
  for (const name of ['Monthly Social', 'Cookie Drive', 'Charity Auction']) {
    const href = await banner.getByRole('link', { name: new RegExp(name) }).getAttribute('href')
    expect(href).toBeTruthy()
    const response = await page.request.get(href!.split('#')[0])
    expect(response.ok()).toBeTruthy()
  }
  await banner.getByRole('button', { name: 'Dismiss club announcement' }).click()
  await expect(banner).toHaveCount(0)
  await page.reload()
  await expect(banner).toHaveCount(0)
})

test('mobile navigation and announcement fit the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await expect(page.getByRole('complementary', { name: 'Club announcement' })).toBeVisible()
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
  ).toBeTruthy()
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.locator('#mobile-menu')).toBeVisible()
})
