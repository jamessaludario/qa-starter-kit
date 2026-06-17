# QA Automation Starter Kit

> Clone once. Generate tests for any web app.
> No prior automation experience needed.

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge&logo=github)](https://github.com/jamessaludario/qa-starter-kit/generate)

---

## What is this?

A hybrid learning playground and ready-made **Playwright + TypeScript** test suite setup. It allows you to:
1. **Learn QA Automation**: Start the built-in local Sandbox Demo App, follow step-by-step tutorial guides, and write Page Object Models and tests manually.
2. **Accelerate with AI Agents**: Scan pages automatically, write baseline test scripts, and repair broken locators using AI coding agents (Claude, Cursor, Antigravity, etc.).

**The kit provides:**
- 🎮 **Local Sandbox App**: A beautiful mock SaaS app to write and run tests against safely.
- 📚 **Beginner Tutorial**: A step-by-step guide explaining selectors, POM, assertions, and test runners.
- 🤖 **AI Scaffolder & Prompts**: Standardized prompts to guide AI agents in scanning and writing code.
- 📂 **Clear POM Structure**: Organized folder design to scale testing for small or large apps.

---

## Supported AI Agents

This kit works with any of these:

| Agent            | How to use                          |
|------------------|-------------------------------------|
| Claude Code      | Open terminal in project folder     |
| Cursor           | Open folder in Cursor IDE           |
| VS Code Copilot  | Open folder in VS Code              |
| Windsurf         | Open folder in Windsurf IDE         |
| Antigravity      | Follow `.antigravity/config.yml`    |
| Any other agent  | Use prompts in `prompts/` folder    |

See [docs/agent-setup.md](docs/agent-setup.md) for per-agent instructions.

---

## Quick Start

## Quick Start

### 🏁 Learn Automation (Recommended first step)

You can run and test the built-in Sandbox App immediately:

1. Clone this repository:
   ```bash
   git clone https://github.com/jamessaludario/qa-starter-kit
   cd qa-starter-kit
   ```
2. Install dependencies and browser engines:
   ```bash
   npm install
   npx playwright install
   ```
3. Start the local Sandbox App:
   ```bash
   npm run demo
   ```
4. Open [docs/tutorial.md](docs/tutorial.md) and follow the step-by-step instructions to run your first tests!

---

### 🚀 Scaffold tests for YOUR web app

When you are ready to test your own live website or repository:

1. Clone or click **"Use this template"** on GitHub to create a fresh repository.
2. Run `npm install` and copy the environment template:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in `PROJECT_NAME`, `BASE_URL` (your app's URL), and user roles.
4. Scaffold your new tests workspace:
   ```bash
   npm run scaffold
   ```
5. Open the newly created `../<your-app-name>-tests` folder in your AI agent and run the quick start prompt:
   ```markdown
   prompts/00-quick-start.md
   ```

---

## Commands

> Run these from **your generated project folder** (after scaffolding)

```bash
npm run demo            # start the local sandbox demo app (http://localhost:3000)
npm test                # run all tests (including tutorial tests)
npm run test:ui         # launch Playwright interactive UI runner
npm run test:smoke      # run quick smoke check tests
npm run scan            # print scan prompt for your AI agent
npm run report          # open HTML test execution report
npx playwright install  # install browser binaries (first time only)
```

---

## Folder Structure

```
your-app-tests/
├── tests/
│   ├── baseline/        ← page load + element visibility tests
│   │   ├── guest/
│   │   ├── user/
│   │   └── admin/
│   ├── e2e/             ← full user flow tests
│   ├── regression/      ← edge cases and negative tests
│   └── marketing/       ← landing page / public page tests
├── page-objects/        ← Page Object Models (one file per page)
│   ├── base/
│   ├── guest/
│   ├── user/
│   └── admin/
├── helpers/             ← shared utilities
├── fixtures/            ← Playwright fixtures
├── constants/           ← routes, selectors, etc.
├── types/               ← TypeScript types
├── setup/               ← auth setup
├── prompts/             ← copy-paste prompts for your agent
├── docs/                ← documentation
├── page-maps/           ← generated (gitignored)
├── code-context/        ← generated (gitignored)
├── auth/                ← session files (gitignored)
└── .env                 ← your config (gitignored)
```

See [docs/folder-structure.md](docs/folder-structure.md) for full details.

---

## How it works

1. **Scan** — your agent visits every page and saves a map of elements
2. **Generate** — your agent writes Page Object Models and test specs
3. **Run** — Playwright executes all tests in headless Chrome
4. **Fix** — paste the error prompt; your agent fixes failures
5. **Repeat** — re-scan after app changes to keep tests in sync

See [docs/how-it-works.md](docs/how-it-works.md) for the full pipeline.

---

## Two modes explained

**Mode 1 — GitHub Template (Option A)**
- You create a fresh repo from this template on GitHub
- Your repo is 100% independent
- You never pull from the starter kit again
- Best for: most users

**Mode 2 — Scaffold Script (Option B)**
- You clone the starter kit locally and run `npm run scaffold`
- This creates a **new separate folder** for your app tests
- The starter kit folder is never modified
- Best for: users who want to keep the starter kit as local reference

---

## Need help?

- [Beginner Tutorial Guide](docs/tutorial.md)
- [Getting Started](docs/getting-started.md)
- [How it Works](docs/how-it-works.md)
- [Agent Setup Guide](docs/agent-setup.md)
- [Writing Tests](docs/writing-tests.md)
- [Running Tests](docs/running-tests.md)
- [FAQ](docs/faq.md)

---

## License

MIT
