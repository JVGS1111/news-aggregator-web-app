import { test, expect } from '@playwright/test'

test('Access the custom news feed page', async ({ page }) => {
  await page.goto('/custom-news-feed', { waitUntil: 'networkidle' })
  const header = page.getByRole('img', { name: 'News Aggregator' })
  expect(header).toBeVisible()
})

test('Access preferences tab', async ({ page }) => {
  await page.goto('/custom-news-feed', { waitUntil: 'networkidle' })
  const prefTabBtn = page.getByRole('button', { name: 'Preferences' })
  await prefTabBtn.click()

  expect(
    page.getByRole('heading', { name: 'Edit your article preferences' }),
  ).toBeVisible()
})

test('Add author preference', async ({ page }) => {
  await page.goto('/custom-news-feed', { waitUntil: 'networkidle' })
  const prefTabBtn = page.getByRole('button', { name: 'Preferences' })
  await prefTabBtn.click()
  const authorInput = page.getByPlaceholder('Add your authors')
  const addAuthorBtn = page.getByTestId('add-author')
  await authorInput.fill('Test')
  await addAuthorBtn.click()

  const badger = page.getByTestId('author-badger')
  badger.isVisible()
  expect(await badger.isVisible()).toBe(true)
})

test('Change category and source preference', async ({ page }) => {
  await page.goto('/custom-news-feed', { waitUntil: 'networkidle' })
  const prefTabBtn = page.getByRole('button', { name: 'Preferences' })
  await prefTabBtn.click()

  const categoryChk = page.getByText('World')
  const sourceChk = page.getByText('The Guardian')
  let savePrefBtn = page.getByRole('button', { name: 'Save' })

  await categoryChk.check()
  await sourceChk.check()
  expect(await savePrefBtn.isEnabled()).toBe(true)
  await savePrefBtn.click()
  savePrefBtn = page.getByRole('button', { name: 'Save' })
  expect(await savePrefBtn.isDisabled()).toBe(true)
})
