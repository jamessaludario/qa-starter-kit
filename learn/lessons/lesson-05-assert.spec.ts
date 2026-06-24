/* ════════════════════════════════════════════════════════════════════════════
 *  LESSON 5 — Assert (the part that decides pass or fail)
 * ════════════════════════════════════════════════════════════════════════════
 *  New idea: an ASSERTION is a claim that must be true. If it isn't, the test
 *  fails. Without assertions a test proves nothing — it just clicks around.
 *
 *  Playwright's web assertions (expect(locator).toXxx) automatically wait and
 *  retry for a few seconds, so you rarely need manual "wait" calls. A few you'll
 *  use constantly:
 *      toBeVisible()        — the element is shown
 *      toHaveText('...')    — its text is exactly this
 *      toContainText('...') — its text includes this
 *      toHaveCount(n)       — there are exactly n matching elements
 *      toHaveClass(/x/)     — its class list contains x
 * ──────────────────────────────────────────────────────────────────────────── */
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

// ── WORKED EXAMPLE ──────────────────────────────────────────────────────────
test('Lesson 5 example: the counter text updates as items are added', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?')
  const counter = page.getByTestId('todo-count')

  await newTodo.fill('Task A')
  await newTodo.press('Enter')
  // Exact text match — note the singular "item".
  await expect(counter).toHaveText('1 item left')

  await newTodo.fill('Task B')
  await newTodo.press('Enter')
  // Now plural. `toContainText` would also pass here; toHaveText is stricter.
  await expect(counter).toHaveText('2 items left')
})

// ── TRY IT YOURSELF ─────────────────────────────────────────────────────────
// Goal: add one to-do and assert the item's text CONTAINS the word "important"
//       (use toContainText, which matches a substring rather than the whole text).
test.skip('Lesson 5 exercise: assert a substring', async ({ page }) => {
  // const newTodo = page.getByPlaceholder('What needs to be done?')
  // await newTodo.fill('Something important to do')
  // await newTodo.press('Enter')
  // await expect(page.getByTestId('todo-title')).toContainText('important')

  throw new Error('Remove this line and write the test above.')
})

/* ── HIDDEN SOLUTION ─────────────────────────────────────────────────────────
 *
 *   test('assert a substring', async ({ page }) => {
 *     const newTodo = page.getByPlaceholder('What needs to be done?')
 *     await newTodo.fill('Something important to do')
 *     await newTodo.press('Enter')
 *     await expect(page.getByTestId('todo-title')).toContainText('important')
 *   })
 *
 * ──────────────────────────────────────────────────────────────────────────── */
