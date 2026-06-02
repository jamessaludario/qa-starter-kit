# Running Tests

## Quick commands

```bash
npm test                         # run all tests
npm run test:smoke               # run @smoke tests only
npm run test:regression          # run @regression tests only
npm run test:headed              # run with visible browser
npm run test:ui                  # open Playwright UI mode
npm run report                   # open last HTML report
npm run typecheck                # check TypeScript without running tests
```

## Run specific files

```bash
npx playwright test tests/baseline/guest/home.spec.ts
npx playwright test tests/e2e/
npx playwright test --grep "login"
```

## Run in headed mode (see the browser)

```bash
npm run test:headed
```

Useful for debugging failing tests.

## Playwright UI mode

```bash
npm run test:ui
```

Opens an interactive UI where you can run individual tests, see screenshots, and step through actions.

## View the report

After any test run, open the HTML report:

```bash
npm run report
```

## Debug a failing test

```bash
npx playwright test tests/path/to/test.spec.ts --debug
```

This opens a browser with the Playwright Inspector — you can step through each action.

## Environment variables

You can override settings at runtime:

```bash
BASE_URL=https://staging.my-app.com npm test
```

## CI/CD

The `playwright.config.ts` is already configured for CI:
- `forbidOnly: true` — fails if `test.only` is committed
- `retries: 2` — retries flaky tests twice in CI
- `workers: 1` — runs serially in CI to avoid resource issues

Set the `CI` environment variable to activate CI mode:
```bash
CI=true npm test
```
