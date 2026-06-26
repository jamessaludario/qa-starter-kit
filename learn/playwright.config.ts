import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright config for the BEGINNER LEARNING track (`npm run tour`, mini-lessons,
 * and the annotated sample test).
 *
 * This is completely separate from the template/ test suite — it exists only to
 * give first-time learners something safe and public to test against, with zero
 * login or setup hurdles.
 *
 * Target app: the official Playwright TodoMVC demo.
 *   https://demo.playwright.dev/todomvc
 * It is free, public, requires no account, and is perfect for practising the
 * core loop: load a page → find an element → type → click → assert.
 *
 * baseURL is the site ORIGIN (https://demo.playwright.dev); the specs navigate
 * to the '/todomvc' route on top of it (e.g. page.goto('/todomvc')). Point the
 * lessons at a different origin by setting LEARN_BASE_URL; the default works
 * out of the box.
 */
const BASE_URL = process.env.LEARN_BASE_URL ?? 'https://demo.playwright.dev'

export default defineConfig({
  // Where the lesson/sample/your-first-test specs live.
  testDir: '.',
  testMatch: ['tests/**/*.spec.ts', 'lessons/**/*.spec.ts'],

  // Beginners run one thing at a time — keep output calm and readable.
  fullyParallel: false,
  workers: 1,
  retries: 0,

  // A friendly line reporter in the terminal + an HTML report you can open later.
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],

  outputDir: 'test-results',

  use: {
    baseURL: BASE_URL,
    // Headless = the browser runs invisibly in the background. Fast, and what
    // real test suites use. Run with `--headed` any time you want to watch it.
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
})
