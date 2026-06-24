/* ════════════════════════════════════════════════════════════════════════════
 *  THE ANNOTATED SAMPLE TEST  —  read this top to bottom
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  This is one complete, working Playwright test, explained line by line.
 *  It's the "look at the finished thing" companion to the interactive tour
 *  (`npm run tour`). Nothing here is magic — by the end you'll recognise every
 *  piece.
 *
 *  What it tests: the public TodoMVC demo app at
 *      https://demo.playwright.dev/todomvc
 *  No login, no setup. We add a to-do, complete it, and check the counter —
 *  the same kind of thing a real test does against a real app.
 *
 *  Run it with:
 *      npm run learn:sample
 *  Watch it happen in a real browser window with:
 *      npm run learn:sample -- --headed
 * ──────────────────────────────────────────────────────────────────────────── */

// `test` lets us define a test. `expect` lets us make assertions (claims that
// must be true). We import both from Playwright's test library.
import { test, expect } from '@playwright/test'

// `test.describe` groups related tests under one heading. Think of it as a
// labelled folder that shows up in the report. The text is just a human label.
test.describe('TodoMVC — my first real test', () => {

  // `test.beforeEach` runs once before EVERY test in this group. It's the ideal
  // place to get to a known starting point — here, opening the app fresh.
  // `async ({ page }) => { ... }` hands us a `page`: a single browser tab that
  // Playwright controls for us.
  test.beforeEach(async ({ page }) => {
    // `page.goto` navigates the tab to a URL. We pass '/' because the baseURL
    // (the TodoMVC site) is already set in learn/playwright.config.ts, so '/'
    // means "the home page of that site". `await` means "wait for this to
    // finish before moving on" — almost every Playwright action needs `await`.
    await page.goto('/')
  })

  test('adding a to-do shows it in the list', async ({ page }) => {
    // ── 1. FIND an element ────────────────────────────────────────────────
    // A "locator" is a saved description of how to find an element on the page.
    // It does NOT search yet — it just remembers the recipe. We find the text
    // box by the placeholder text the user sees inside it.
    const newTodo = page.getByPlaceholder('What needs to be done?')

    // ── 2. TYPE into it ───────────────────────────────────────────────────
    // `fill` clears the box and types the given text. Pressing Enter is how
    // TodoMVC submits a new item, so we press it afterwards.
    await newTodo.fill('Buy milk')
    await newTodo.press('Enter')

    // ── 3. ASSERT what should now be true ─────────────────────────────────
    // `getByTestId` finds elements by their `data-testid` attribute — a label
    // developers add specifically so tests have a stable hook. The TodoMVC item
    // text carries data-testid="todo-title".
    // `expect(...).toHaveText(...)` waits (up to a few seconds) until the item
    // actually reads "Buy milk". If it never does, the test fails with a clear
    // message. This automatic waiting is why Playwright tests are stable.
    await expect(page.getByTestId('todo-title')).toHaveText('Buy milk')
  })

  test('completing a to-do empties the "items left" counter', async ({ page }) => {
    // Add two to-dos so we can watch the counter change.
    const newTodo = page.getByPlaceholder('What needs to be done?')
    await newTodo.fill('Write my first test')
    await newTodo.press('Enter')
    await newTodo.fill('Celebrate')
    await newTodo.press('Enter')

    // The footer shows a live count like "2 items left". We locate it by its
    // test id and assert the starting state.
    const counter = page.getByTestId('todo-count')
    await expect(counter).toHaveText('2 items left')

    // ── CLICK an element ──────────────────────────────────────────────────
    // Each to-do row has a round checkbox (CSS class "toggle"). We grab the
    // first one and click it to mark that item done.
    await page.locator('.todo-list li .toggle').first().check()

    // After completing one item, the counter should drop to "1 item left".
    // (Notice "item", singular — TodoMVC changes the wording. Real apps have
    // little details like this; assertions catch when they break.)
    await expect(counter).toHaveText('1 item left')
  })

  test('a brand-new session starts with no to-dos', async ({ page }) => {
    // A "negative" check: proving something is NOT there is just as important
    // as proving something is. `toHaveCount(0)` asserts the list is empty.
    await expect(page.locator('.todo-list li')).toHaveCount(0)
  })
})

/* ────────────────────────────────────────────────────────────────────────────
 *  THE SHAPE OF EVERY TEST
 *
 *  Almost every test you'll ever write follows the same three beats, often
 *  called Arrange → Act → Assert:
 *
 *    1. Arrange  — get to a known starting point   (page.goto)
 *    2. Act      — do the thing a user would do     (fill, press, click)
 *    3. Assert   — check the result is correct       (expect ... toHaveText)
 *
 *  Once this rhythm feels natural, you can read and write tests for any app.
 *  Next stop: the mini-lessons in learn/lessons/ — one new idea at a time.
 * ──────────────────────────────────────────────────────────────────────────── */
