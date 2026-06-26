/* ════════════════════════════════════════════════════════════════════════════
 *  LESSON 6 — Negative cases (checking something is NOT there)
 * ════════════════════════════════════════════════════════════════════════════
 *  New idea: good tests don't only confirm things appear — they confirm things
 *  DON'T appear when they shouldn't. These "negative" checks catch a whole class
 *  of bugs (leftover data, things that fail to disappear, error states).
 *
 *  The tools: add `.not` to flip an assertion, or assert a count of 0.
 *      await expect(thing).not.toBeVisible()
 *      await expect(list).toHaveCount(0)
 * ──────────────────────────────────────────────────────────────────────────── */
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/todomvc')
})

// ── WORKED EXAMPLE ──────────────────────────────────────────────────────────
test('Lesson 6 example: a completed item can be cleared and is then gone', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?')
  await newTodo.fill('Temporary task')
  await newTodo.press('Enter')

  // Complete it, then use TodoMVC's "Clear completed" button.
  await page.locator('.todo-list li .toggle').first().check()
  await page.getByRole('button', { name: 'Clear completed' }).click()

  // NEGATIVE CHECK: the list should now be empty.
  await expect(page.locator('.todo-list li')).toHaveCount(0)
  // And the text we added should no longer be visible anywhere.
  await expect(page.getByText('Temporary task')).not.toBeVisible()
})

// ── TRY IT YOURSELF ─────────────────────────────────────────────────────────
// Goal: confirm that before you add anything, the counter element is NOT visible.
// Hint: with an empty list TodoMVC hides the footer entirely, so
//       page.getByTestId('todo-count') should not be visible.
test.skip('Lesson 6 exercise: no counter on an empty list', async ({ page }) => {
  // await expect(page.getByTestId('todo-count')).not.toBeVisible()

  throw new Error('Remove this line and write the test above.')
})

/* ── HIDDEN SOLUTION ─────────────────────────────────────────────────────────
 *
 *   test('no counter on an empty list', async ({ page }) => {
 *     await expect(page.getByTestId('todo-count')).not.toBeVisible()
 *   })
 *
 * ──────────────────────────────────────────────────────────────────────────── */
