import { test, expect } from '@playwright/test'

test('Access the home page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const header = page.getByRole('img', { name: 'News Aggregator' })
  expect(header).toBeVisible()
})

test('Open search modal and search', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const button = page.getByTestId('dialog-button')
  await button.click()

  const searchinput = page.getByPlaceholder('Search')
  const submit = page.getByTestId('submit_btn')

  await searchinput.fill('Brazil')
  await submit.click()

  await page.waitForTimeout(3000)
  const list = page.getByRole('list').nth(1)

  const article = await list.getByTestId('article-card').all()

  await expect(article.length).toBeGreaterThan(1)
})

test('Open search modal and search with filters', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const button = page.getByTestId('dialog-button')
  await button.click()

  const searchinput = page.getByPlaceholder('Search')
  const submit = page.getByTestId('submit_btn')
  const filterBtn = page.getByTestId('open_close_filters')
  const categoryBtn = page
    .locator('button')
    .filter({ hasText: 'Select a category' })
  const sourceFilter = page
    .locator('button')
    .filter({ hasText: 'Select a source' })
  await searchinput.fill('Economy')
  await filterBtn.click()
  await categoryBtn.click()
  const categoryBusiness = page.getByLabel('Business')

  await categoryBusiness.click()
  await sourceFilter.click()
  const sourceTheGuardian = page.getByLabel('The Guardian')
  await sourceTheGuardian.click()

  await submit.click()

  await page.waitForTimeout(3000)
  const list = page.getByRole('list').nth(1)

  const article = await list.getByTestId('article-card').all()

  await expect(article.length).toBeGreaterThan(1)
})

test('Access news feed', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const link = page.getByRole('link', { name: 'News feed' })
  await link.click()
  await page.waitForTimeout(1000)

  expect(page.url()).toContain('/custom-news-feed')
})

test('Change to next page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const nextPageBtn = page.getByRole('button', { name: 'Next' })
  await nextPageBtn.click()
  await page.waitForTimeout(1000)
  const previousBtn = page.getByRole('button', { name: 'Previous' })

  expect(await previousBtn.isEnabled()).toBe(true)
})
