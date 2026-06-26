/* ════════════════════════════════════════════════════════════════════════════
 *  LESSON 1 — Load a page
 * ════════════════════════════════════════════════════════════════════════════
 *  New idea: every test starts by opening a page in a browser.
 *
 *  Run just this lesson:
 *      npm run learn:lessons -- lesson-01
 *  Watch it in a real browser:
 *      npm run learn:lessons -- lesson-01 --headed
 * ──────────────────────────────────────────────────────────────────────────── */
import { test, expect } from '@playwright/test'

// ── WORKED EXAMPLE (this one already passes) ────────────────────────────────
test('Lesson 1 example: open TodoMVC and check the page title', async ({ page }) => {
  // `page.goto('/todomvc')` opens the app. The baseURL in the config is the
  // site origin; '/todomvc' is the route added on top of it.
  await page.goto('/todomvc')

  // Every web page has a title (the text shown on the browser tab).
  // `toHaveTitle` checks it. TodoMVC's tab simply reads "React • TodoMVC".
  await expect(page).toHaveTitle(/TodoMVC/)
})

// ── TRY IT YOURSELF ─────────────────────────────────────────────────────────
// This test is skipped so the suite stays green. Delete the `.skip` to turn it
// on, then make it pass.
//
// Goal: open the page and assert that the big heading reads "todos".
// Hint: TodoMVC shows a heading element you can find with
//       page.getByRole('heading'). Headings are assertable with toHaveText.
test.skip('Lesson 1 exercise: the heading says "todos"', async ({ page }) => {
  // 1. Open the page:
  // await page.goto('/todomvc')

  // 2. Assert the heading text. Replace the next line with your assertion:
  // await expect(page.getByRole('heading')).toHaveText('todos')

  throw new Error('Remove this line and write the test above.')
})

/* ── HIDDEN SOLUTION (peek only if you're stuck) ─────────────────────────────
 *
 *   test('the heading says "todos"', async ({ page }) => {
 *     await page.goto('/todomvc')
 *     await expect(page.getByRole('heading')).toHaveText('todos')
 *   })
 *
 * ──────────────────────────────────────────────────────────────────────────── */
