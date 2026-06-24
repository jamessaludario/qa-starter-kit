# Learn QA Automation — from zero

> No experience needed. If you've never written a test in your life, start here.
> When you'd rather *do* than read, run `npm run tour` for a hands-on version of
> everything below.

This guide explains, in plain English, what test automation is and the handful
of ideas you need to write your first test. Every piece of jargon is defined the
first time it appears, and there's a glossary at the bottom.

---

## 1. What is QA automation, and why bother?

**QA** stands for *Quality Assurance* — making sure software works the way it
should before real people use it. Traditionally a person does this by hand:
open the app, click around, fill in forms, and confirm everything behaves.

That manual checking is slow and easy to get wrong, and you have to redo it every
single time the app changes. **QA automation** is writing small programs that do
the clicking and checking for you. You write the check once; the computer can
run it a thousand times, in seconds, without getting bored or missing a step.

A practical example: imagine your app's login page. Every time a developer
changes anything, *someone* should confirm that logging in still works. An
automated test does that in about two seconds, automatically, forever.

The payoff: you catch bugs early (when they're cheap to fix), you free people
from repetitive clicking, and you can change your app with confidence because the
tests tell you the moment something breaks.

---

## 2. What is Playwright?

**Playwright** is a free, open-source tool (built by Microsoft) that lets your
code drive a real web browser — open pages, click things, type into forms, and
read what's on screen. It's the engine this whole kit runs on.

You'll also hear **headless**: that just means the browser runs invisibly in the
background instead of popping up a window. It's faster and it's how tests run on
servers. You can always add `--headed` to *watch* a test run in a real window,
which is great while you're learning.

We write our tests in **TypeScript** — JavaScript with type labels that catch
mistakes as you type. You don't need to know TypeScript deeply; you'll pick up
what you need from the examples.

---

## 3. The five words that unlock everything

Almost all of test automation is built from five small ideas.

### Test

A **test** is one named check: a short script that sets something up, does an
action, and confirms an expected result. In code it looks like this:

```typescript
test('I can add a to-do', async ({ page }) => {
  // ...the steps go here...
})
```

The text in quotes is just a human-readable name that shows up in the results.

### Selector and locator

To do anything to a button or text box, your code first has to *find* it on the
page. The rule it uses to find an element is called a **selector** — for example,
"the button whose text is *Sign In*".

A **locator** is Playwright's object that holds that rule. Creating a locator
doesn't search the page right away; it just remembers *how* to find the element.
Playwright looks (and re-looks) only when you act or assert on it. That automatic
re-checking is a big reason Playwright tests are stable.

Some good, beginner-friendly locators:

```typescript
page.getByRole('button', { name: 'Sign In' })   // a button users would click
page.getByPlaceholder('What needs to be done?')  // a text box, by its hint text
page.getByText('Forgot password?')               // any visible text
page.getByTestId('todo-title')                   // a data-testid added for tests
```

Prefer locators that match what a **user** sees (roles, text, labels). They read
clearly and don't break when the page's internal structure shifts.

### Assertion

An **assertion** is the claim that must be true for the test to pass. It's the
whole point of the test — without one, you've only clicked around and proved
nothing. In Playwright assertions start with `expect`:

```typescript
await expect(page.getByTestId('todo-title')).toHaveText('Buy milk')
```

Read that as: "*expect* the to-do title *to have text* 'Buy milk'." If it doesn't
(within a few seconds), the test fails with a clear message. Common ones:

| Assertion | Passes when… |
|-----------|--------------|
| `toBeVisible()` | the element is shown on screen |
| `toHaveText('x')` | its text is exactly `x` |
| `toContainText('x')` | its text includes `x` |
| `toHaveCount(3)` | there are exactly 3 matching elements |
| `not.toBeVisible()` | the element is **not** shown (a "negative" check) |

### Page Object (POM)

As you write more tests, you don't want the recipe for "where is the email box"
copy-pasted into fifty files. A **Page Object** (the pattern is called the *Page
Object Model*, or **POM**) is a class that gathers all the locators and actions
for one page in one place.

```typescript
export class LoginPage {
  readonly emailInput = this.page.getByLabel('Email')
  readonly password   = this.page.getByLabel('Password')
  readonly submit     = this.page.getByRole('button', { name: 'Sign In' })

  constructor(private page: Page) {}

  async login(email: string, pw: string) {
    await this.emailInput.fill(email)
    await this.password.fill(pw)
    await this.submit.click()
  }
}
```

Now your tests just say `await loginPage.login(...)`. If the Sign In button's
text ever changes, you fix it in **one** place instead of fifty. You can see real
examples in `template/page-objects/`.

---

## 4. The shape of every test: Arrange → Act → Assert

Almost every test follows the same three beats:

1. **Arrange** — get to a known starting point (`await page.goto('/')`).
2. **Act** — do what a user would do (`fill`, `press`, `click`).
3. **Assert** — check the result (`await expect(...)...`).

Once that rhythm feels automatic, you can read and write tests for any app.
Here's the whole thing in nine lines:

```typescript
test('adding a to-do works', async ({ page }) => {
  await page.goto('/')                                         // Arrange
  const box = page.getByPlaceholder('What needs to be done?')
  await box.fill('Buy milk')                                   // Act
  await box.press('Enter')
  await expect(page.getByTestId('todo-title'))
    .toHaveText('Buy milk')                                    // Assert
})
```

---

## 5. How this kit works: scan → generate → run → fix

Writing tests by hand teaches you the ideas. The reason this kit exists is to
then let an **AI agent** write lots of them for *your* app. The loop:

1. **Scan** — the agent visits every page of your app and records a map of the
   buttons, links, and fields it finds (saved to `page-maps/`). Tests only get
   written for elements that were confirmed to exist.
2. **Generate** — using those maps, the agent writes Page Objects and tests for
   you, following the kit's conventions.
3. **Run** — Playwright executes the tests in a headless browser and reports
   what passed and what failed.
4. **Fix** — when something fails, you hand the error to the agent and it repairs
   the broken locator or test. Re-scan whenever your app changes to keep the
   tests in sync.

The skill you're building now — being able to *read* a test and tell whether it's
correct — is exactly what makes you able to review, guide, and trust an agent
doing steps 1–4 at scale. See [how-it-works.md](how-it-works.md) for the full
pipeline, and [tutorial.md](tutorial.md) to practise against the kit's built-in
demo app.

---

## 6. Your next 30 minutes

1. Run `npm run tour` — build and run your first test, guided step by step.
2. Read `learn/tests/sample.todo.spec.ts` — the same ideas, annotated line by line.
3. Work through `learn/lessons/` — six bite-sized exercises, each with a solution.
4. Come back to section 5 above and try the kit's AI loop on a real app.

---

## Glossary

**Action** — something a user would do that your test performs: `click`, `fill`
(type), `press` (a key), `check` (tick a checkbox).

**Assertion** — a claim that must be true for the test to pass, written with
`expect(...)`. The part of a test that can actually fail.

**Arrange / Act / Assert** — the three-beat shape of nearly every test: set up,
do, then check.

**Headless** — running the browser invisibly, with no window. Faster than
"headed" mode and the default for automated runs.

**Locator** — Playwright's object representing *how* to find an element. Lazy: it
searches only when you act or assert on it, and re-checks automatically.

**Page Object / Page Object Model (POM)** — a class that keeps all the locators
and actions for one page in one place, so tests stay short and changes happen in
one spot.

**Playwright** — the open-source framework (by Microsoft) that drives real
browsers from your code.

**QA (Quality Assurance)** — making sure software works correctly before users
rely on it.

**Selector** — the rule that identifies an element on the page (e.g. "the button
labelled Sign In"). A locator wraps a selector.

**Spec / test spec** — a file containing tests (its name ends in `.spec.ts`).

**Test** — one named, automated check: arrange, act, assert.

**Test runner** — the tool that finds your test files, runs them, and reports
results. Here that's Playwright (`playwright test`).

**TypeScript** — JavaScript with type labels that catch mistakes early. The
language these tests are written in.

**data-testid** — a small attribute developers add to an element (like
`data-testid="todo-title"`) purely to give tests a stable handle, found with
`getByTestId(...)`.
