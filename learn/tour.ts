/* ════════════════════════════════════════════════════════════════════════════
 *  npm run tour  —  an interactive, hands-on intro to QA automation
 * ════════════════════════════════════════════════════════════════════════════
 *
 *  This walks a complete beginner through building and running their first real
 *  Playwright test, one small step at a time. It explains the WHY in plain
 *  English, writes the test with you, runs it for you, and checks your progress.
 *
 *  Design notes (for maintainers):
 *   - Zero new dependencies: just Node's built-in readline + child_process.
 *   - Resumable: progress is saved to learn/.tour-progress.json after each step.
 *   - Non-interactive friendly: if stdin isn't a terminal (CI, piped input) or
 *     TOUR_AUTO=1 is set, it auto-advances so the whole thing can be smoke-tested.
 *   - Target app: the public TodoMVC demo (no login). Override with LEARN_BASE_URL.
 * ──────────────────────────────────────────────────────────────────────────── */

import * as fs from 'fs'
import * as path from 'path'
import * as readline from 'readline'
import { spawnSync } from 'child_process'

// ── Small ANSI colour helpers (no dependency needed) ────────────────────────
const useColor = process.stdout.isTTY && !process.env.NO_COLOR
const paint = (code: string, s: string): string => (useColor ? `\x1b[${code}m${s}\x1b[0m` : s)
const bold = (s: string): string => paint('1', s)
const dim = (s: string): string => paint('2', s)
const green = (s: string): string => paint('32', s)
const cyan = (s: string): string => paint('36', s)
const yellow = (s: string): string => paint('33', s)
const red = (s: string): string => paint('31', s)

// ── Paths ───────────────────────────────────────────────────────────────────
const LEARN_DIR = __dirname
const REPO_ROOT = path.resolve(LEARN_DIR, '..')
const TEST_DIR = path.join(LEARN_DIR, 'tests')
const TEST_FILE = path.join(TEST_DIR, 'my-first-test.spec.ts')
const PROGRESS_FILE = path.join(LEARN_DIR, '.tour-progress.json')
const TARGET_URL = process.env.LEARN_BASE_URL ?? 'https://demo.playwright.dev/todomvc'

// Auto mode: advance without waiting for the user (used by CI / smoke tests).
const AUTO = !process.stdin.isTTY || process.env.TOUR_AUTO === '1'

// ── Input helpers ─────────────────────────────────────────────────────────--
let rl: readline.Interface | undefined
function getRl(): readline.Interface {
  if (!rl) rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return rl
}

function ask(question: string): Promise<string> {
  if (AUTO) {
    process.stdout.write(question + dim('(auto)\n'))
    return Promise.resolve('')
  }
  return new Promise(resolve => getRl().question(question, ans => resolve(ans.trim())))
}

async function pressEnter(label = 'Press Enter to continue'): Promise<void> {
  await ask(dim(`\n   ↪ ${label}… `))
}

// ── Progress (resumability) ─────────────────────────────────────────────────
function loadProgress(): number {
  try {
    const raw = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8')) as { step?: number }
    return typeof raw.step === 'number' ? raw.step : 0
  } catch {
    return 0
  }
}

function saveProgress(step: number): void {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify({ step, updatedAt: new Date().toISOString() }, null, 2))
}

// ── Pretty printing helpers ─────────────────────────────────────────────────
function heading(n: number, total: number, title: string): void {
  console.log('\n' + cyan('━'.repeat(64)))
  console.log(cyan(`  STEP ${n}/${total}  `) + bold(title))
  console.log(cyan('━'.repeat(64)))
}

function code(block: string): void {
  console.log()
  for (const line of block.split('\n')) console.log('    ' + yellow(line))
  console.log()
}

// ── The test file is built up across steps (always a valid, runnable file) ──
const FILE_HEADER = `import { test, expect } from '@playwright/test'

test.describe('My first test', () => {
  test.beforeEach(async ({ page }) => {
    // Open the app fresh before each test. The baseURL (in
    // learn/playwright.config.ts) is the site origin; '/todomvc' is the route.
    await page.goto('/todomvc')
  })
`

const TEST_LOADS = `
  test('the page loads and the heading says "todos"', async ({ page }) => {
    // The simplest possible check: did the page load with the right heading?
    await expect(page.getByRole('heading')).toHaveText('todos')
  })
`

const TEST_ADD = `
  test('I can add a to-do', async ({ page }) => {
    // FIND the text box (by the grey hint text the user sees inside it).
    const newTodo = page.getByPlaceholder('What needs to be done?')
    // TYPE into it, then press Enter to submit.
    await newTodo.fill('Write my first test')
    await newTodo.press('Enter')
    // ASSERT the new item shows up with our text.
    await expect(page.getByTestId('todo-title')).toHaveText('Write my first test')
  })
`

const TEST_COMPLETE = `
  test('I can complete a to-do', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?')
    await newTodo.fill('Celebrate finishing the tour')
    await newTodo.press('Enter')
    // CLICK the round checkbox on the row to mark it done.
    await page.locator('.todo-list li .toggle').first().check()
    // ASSERT the row is now marked completed.
    await expect(page.locator('.todo-list li').first()).toHaveClass(/completed/)
  })
`

const FILE_FOOTER = `})
`

function writeTestFile(...tests: string[]): void {
  fs.mkdirSync(TEST_DIR, { recursive: true })
  fs.writeFileSync(TEST_FILE, FILE_HEADER + tests.join('') + FILE_FOOTER)
}

// ── Running Playwright ──────────────────────────────────────────────────────
function runTheTest(): boolean {
  console.log(dim('\n   Running:  npx playwright test --config learn/playwright.config.ts my-first-test.spec.ts\n'))
  const result = spawnSync(
    'npx',
    ['playwright', 'test', '--config', 'learn/playwright.config.ts', 'my-first-test.spec.ts'],
    { cwd: REPO_ROOT, stdio: 'inherit', shell: process.platform === 'win32' },
  )
  return result.status === 0
}

// ── Steps ───────────────────────────────────────────────────────────────────
type Step = () => Promise<void>

const steps: Step[] = [
  // 0 — Welcome
  async () => {
    console.log(bold('\n  Welcome to QA automation. 👋'))
    console.log(
      `
  In the next ~10 minutes you'll build a real, working automated test and watch
  it run in a real browser — no prior experience needed.

  We'll test a free practice website called ` + bold('TodoMVC') + ` (a tiny to-do list).
  It needs no login and no setup, so nothing can get in your way.

  A test does three things, always in this order:
    ` + green('1. Arrange') + ` — get to a known starting point (open the page)
    ` + green('2. Act') + `     — do what a user would do (type, click)
    ` + green('3. Assert') + `  — check the result is correct (the part that can fail)

  Keep that rhythm in mind. Everything below is just those three beats.`,
    )
    await pressEnter("Press Enter when you're ready to start")
  },

  // 1 — The target app
  async () => {
    console.log(
      `
  Our practice app lives at:
    ` + cyan(TARGET_URL) + `

  Open it in your browser if you'd like to see it first. Add a to-do, tick it
  off, delete it. That's the entire app — and it's everything we need to learn
  the core ideas.`,
    )
    await pressEnter('Take a look, then press Enter')
  },

  // 2 — Create the test file (load a page)
  async () => {
    console.log(
      `
  Let's create your test file. We'll start with the smallest useful test:
  just open the page and check the heading. This is the ` + green('Arrange + Assert') + ` part.

  Here's what we're writing into ` + bold('learn/tests/my-first-test.spec.ts') + `:`,
    )
    code(`test('the page loads and the heading says "todos"', async ({ page }) => {
  await expect(page.getByRole('heading')).toHaveText('todos')
})`)
    console.log(
      `  • ` + bold('test(...)') + ` defines one test with a human-readable name.
  • ` + bold('page') + ` is a browser tab Playwright controls for you.
  • ` + bold('getByRole(\'heading\')') + ` is a ` + bold('locator') + ` — a recipe for finding an element.
  • ` + bold('expect(...).toHaveText(...)') + ` is the ` + bold('assertion') + ` — the check that can pass or fail.`,
    )
    writeTestFile(TEST_LOADS)
    if (fs.existsSync(TEST_FILE)) {
      console.log(green('\n  ✓ Created learn/tests/my-first-test.spec.ts'))
    } else {
      console.log(red('\n  ✗ Hmm, the file did not get created. Check folder permissions.'))
    }
    await pressEnter()
  },

  // 3 — Locate + type + assert (add a to-do)
  async () => {
    console.log(
      `
  Now the interesting part: acting like a user. We'll add a to-do and check it
  appears. This is ` + green('Arrange → Act → Assert') + ` in full.

  Adding this second test to your file:`,
    )
    code(`test('I can add a to-do', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?')
  await newTodo.fill('Write my first test')   // TYPE
  await newTodo.press('Enter')                // SUBMIT
  await expect(page.getByTestId('todo-title'))
    .toHaveText('Write my first test')        // ASSERT
})`)
    console.log(
      `  • ` + bold('getByPlaceholder(...)') + ` finds the box by the hint text inside it.
  • ` + bold('fill(...)') + ` types text; ` + bold('press(\'Enter\')') + ` submits it.
  • ` + bold('getByTestId(...)') + ` finds an element by a ` + dim('data-testid') + ` that developers
    add specifically so tests have a stable handle.
  • Notice we never told it how long to wait — ` + bold('expect') + ` waits automatically.`,
    )
    writeTestFile(TEST_LOADS, TEST_ADD)
    console.log(green('\n  ✓ Updated your test file with the "add a to-do" test'))
    await pressEnter()
  },

  // 4 — Click (complete a to-do)
  async () => {
    console.log(
      `
  One more test, to practise ` + bold('clicking') + `. We'll complete a to-do by ticking
  its checkbox, then assert the row is marked done.

  Adding this third test:`,
    )
    code(`test('I can complete a to-do', async ({ page }) => {
  const newTodo = page.getByPlaceholder('What needs to be done?')
  await newTodo.fill('Celebrate finishing the tour')
  await newTodo.press('Enter')
  await page.locator('.todo-list li .toggle').first().check()  // CLICK
  await expect(page.locator('.todo-list li').first())
    .toHaveClass(/completed/)                                  // ASSERT
})`)
    console.log(
      `  • ` + bold('.first()') + ` picks the first matching element when several match.
  • ` + bold('check()') + ` ticks a checkbox (` + bold('click()') + ` works for buttons and links).
  • ` + bold('toHaveClass(/completed/)') + ` confirms the row's styling changed to "done".`,
    )
    writeTestFile(TEST_LOADS, TEST_ADD, TEST_COMPLETE)
    console.log(green('\n  ✓ Your test file now has three tests. Time to run it!'))
    await pressEnter('Press Enter to RUN your tests')
  },

  // 5 — Run it
  async () => {
    console.log(bold('\n  Running your tests now…'))
    console.log(dim('  (A headless browser opens invisibly, does everything, and closes.)'))
    const passed = runTheTestSafe()
    if (passed) {
      console.log(green('\n  ✅ All three tests passed. You just automated a browser. Seriously — well done.'))
    } else {
      console.log(yellow('\n  ⚠ The run didn\'t come back green. That\'s normal and useful — it\'s exactly'))
      console.log(yellow('    what real QA work looks like. The most common cause here is no internet'))
      console.log(yellow('    connection to the demo site. Check the output above, then re-run with:'))
      console.log(dim('      npm run tour'))
    }
    await pressEnter()
  },

  // 6 — Read the report
  async () => {
    console.log(
      `
  Playwright saved a rich HTML report of that run — screenshots, timings, and a
  step-by-step trace of every action. Open it any time with:`,
    )
    code('npm run learn:report')
    console.log(
      `  When a test fails, this report is the first place you look. It shows you
  exactly which step broke and what the page looked like at that moment.`,
    )
    await pressEnter()
  },

  // 7 — Where to go next
  async () => {
    console.log(bold('\n  🎓 That\'s the whole core loop: load → find → type → click → assert → run → read.'))
    console.log(
      `
  Where to go next:
    • ` + cyan('learn/tests/sample.todo.spec.ts') + ` — the same ideas, explained line by line.
        Run it with ` + bold('npm run learn:sample') + `.
    • ` + cyan('learn/lessons/') + ` — six short lessons, each adding one idea, each with a
        "try it yourself". Run them with ` + bold('npm run learn:lessons') + `.
    • ` + cyan('docs/learn-qa-automation.md') + ` — the plain-language guide + glossary.

  And how this connects to the rest of the kit: once you can read a test, you can
  let an AI agent write hundreds of them for your own app. That's the
  ` + green('scan → generate → run → fix') + ` loop in the main README. You now know enough to
  review and trust what the agent produces — which is the whole point.

  Your practice test lives at learn/tests/my-first-test.spec.ts. Tweak it, break
  it, fix it. That's how this sticks.` + bold('\n\n  Happy testing. 🚀\n'),
    )
    await pressEnter('Press Enter to finish')
  },
]

// Wrap runTheTest so a crash (e.g. playwright not installed) doesn't kill the tour.
function runTheTestSafe(): boolean {
  try {
    return runTheTest()
  } catch (err) {
    console.log(red('\n  Could not launch Playwright: ' + (err instanceof Error ? err.message : String(err))))
    console.log(yellow('  Make sure you ran:  npm install  &&  npx playwright install'))
    return false
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main(): Promise<void> {
  const total = steps.length
  let start = loadProgress()

  if (start > 0 && start < total) {
    console.log(yellow(`\n  Welcome back! You left off at step ${start + 1} of ${total}.`))
    const answer = AUTO ? '' : await ask('  Type ' + bold('r') + ' to restart from the beginning, or Enter to resume: ')
    if (answer.toLowerCase() === 'r') start = 0
  } else if (start >= total) {
    // Finished previously — start fresh.
    start = 0
  }

  for (let i = start; i < total; i++) {
    if (i > 0 || start === 0) heading(i + 1, total, STEP_TITLES[i])
    await steps[i]!()
    saveProgress(i + 1)
  }

  // Tour complete — clear progress so a future run starts clean.
  try {
    fs.unlinkSync(PROGRESS_FILE)
  } catch {
    /* nothing to clean up */
  }

  rl?.close()
}

const STEP_TITLES = [
  'Welcome',
  'Meet the practice app',
  'Write your first check (load a page)',
  'Add a to-do (find → type → assert)',
  'Complete a to-do (click)',
  'Run your tests',
  'Read the report',
  'Where to go next',
]

main().catch(err => {
  console.error(red('\nThe tour hit an unexpected error:'), err)
  rl?.close()
  process.exit(1)
})
