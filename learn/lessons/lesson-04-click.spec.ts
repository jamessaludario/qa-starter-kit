/* ════════════════════════════════════════════════════════════════════════════
 *  LESSON 4 — Click and check
 * ════════════════════════════════════════════════════════════════════════════
 *  New idea: `click` presses a button or link; `check` ticks a checkbox.
 *  Combined with typing, these let you drive a whole feature end to end.
 * ──────────────────────────────────────────────────────────────────────────── */
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/todomvc')
  // Start each test with one to-do already added, so there's something to click.
  const newTodo = page.getByPlaceholder('What needs to be done?')
  await newTodo.fill('Tidy my desk')
  await newTodo.press('Enter')
})

// ── WORKED EXAMPLE ──────────────────────────────────────────────────────────
test('Lesson 4 example: complete a to-do by ticking its checkbox', async ({ page }) => {
  // Each row has a round checkbox with the CSS class "toggle".
  const firstItem = page.locator('.todo-list li').first()
  await firstItem.locator('.toggle').check()

  // When an item is completed, TodoMVC adds the CSS class "completed" to its row.
  // `toHaveClass` with a /pattern/ checks the class list contains "completed".
  await expect(firstItem).toHaveClass(/completed/)
})

// ── TRY IT YOURSELF ─────────────────────────────────────────────────────────
// Goal: complete the item, then DELETE it, and assert the list is empty.
// Hint: hovering a row reveals a delete button with CSS class "destroy".
//       Playwright can click hidden-until-hover buttons directly:
//         await firstItem.locator('.destroy').click()
//       Then assert: await expect(page.locator('.todo-list li')).toHaveCount(0)
test.skip('Lesson 4 exercise: delete a to-do', async ({ page }) => {
  // const firstItem = page.locator('.todo-list li').first()
  // ... delete it ...
  // await expect(page.locator('.todo-list li')).toHaveCount(0)

  throw new Error('Remove this line and write the test above.')
})

/* ── HIDDEN SOLUTION ─────────────────────────────────────────────────────────
 *
 *   test('delete a to-do', async ({ page }) => {
 *     const firstItem = page.locator('.todo-list li').first()
 *     await firstItem.hover()
 *     await firstItem.locator('.destroy').click()
 *     await expect(page.locator('.todo-list li')).toHaveCount(0)
 *   })
 *
 * ──────────────────────────────────────────────────────────────────────────── */
