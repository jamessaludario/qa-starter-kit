# How it Works

The QA Automation Starter Kit uses a 5-stage pipeline. Your AI agent runs each stage by following prompt files in the `prompts/` folder.

## The Pipeline

```
SCAN → ANALYZE → GENERATE → RUN → MAINTAIN
```

### Stage 1 — Scan Pages (`prompts/01-scan-pages.md`)

Your agent visits every page of your app using Playwright and saves a structured map of each page to `page-maps/`.

Each page map records:
- URL and page title
- All headings, links, buttons, and form fields
- Whether auth is required to access the page

This is the foundation — tests are only written for elements that were confirmed to exist.

### Stage 2 — Scan Codebase (`prompts/02-scan-codebase.md`)

If you provide your app's source code path in `.env`, the agent analyzes it to find:
- All routes/pages defined in code
- UI components and where they're used
- Auth logic and session handling
- Features that are high-value to test

Results are saved to `code-context/`.

### Stage 3 — Generate Tests

The agent generates three types of tests:

**Baseline tests** (`prompts/03-generate-baseline.md`)
- Does every page load without errors?
- Are the key elements visible?
- Do auth guards redirect unauthenticated users?

**End-to-end tests** (`prompts/04-generate-e2e.md`)
- Can users complete critical flows? (sign up, checkout, core task)
- Do multi-step forms work end-to-end?

**Regression tests** (`prompts/05-generate-regression.md`)
- What happens with invalid inputs?
- Are error messages shown correctly?
- Do edge cases (empty state, single item, max values) work?

### Stage 4 — Run

```bash
npm test
```

Playwright runs all tests in headless Chrome. Results are shown in the terminal and a full HTML report is generated at `playwright-report/`.

### Stage 5 — Maintain

When your app changes:
- Run `npm run rescan` to print the rescan prompt
- Paste it into your agent
- The agent updates page maps, fixes broken selectors, and generates tests for new pages

## Key design decisions

**Page Object Model** — All page selectors live in `page-objects/`, never in test files. When your app UI changes, you update one Page Object and all tests that use it are fixed.

**Prompts as source of truth** — Every agent task has a standardized prompt in `prompts/`. This means any agent (Claude, Cursor, Copilot, etc.) follows the same process.

**Generated files are gitignored** — `page-maps/`, `code-context/`, `auth/`, and `snapshots/` are never committed. They're regenerated on demand. Only the test code is committed.
