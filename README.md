# QA Automation Starter Kit

> Clone once. Generate tests for any web app.
> No prior automation experience needed.

[![Use this template](https://img.shields.io/badge/Use%20this%20template-2ea44f?style=for-the-badge&logo=github)](https://github.com/jamessaludario/qa-starter-kit/generate)

---

## What is this?

A ready-made Playwright + TypeScript setup that uses AI agents to scan your app and write test scripts for you.

**You bring:**
- A web app URL
- An AI coding agent (any of the ones listed below)

**The kit gives you:**
- Automatic page scanning
- Auto-generated test scripts
- A clear folder structure
- Copy-paste prompts for every task
- Documentation written for humans

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

### Option A — GitHub Template (recommended)

1. Click **"Use this template"** on GitHub
2. Name your new repo (e.g. `my-app-tests`)
3. Clone **your** new repo:
   ```bash
   git clone https://github.com/YOU/my-app-tests
   ```
4. `cd my-app-tests && npm install`
5. `cp .env.example .env`
6. Fill in `BASE_URL` in `.env`
7. Open in your AI agent and paste `prompts/00-quick-start.md`

### Option B — Scaffold Script

1. Clone this starter kit:
   ```bash
   git clone https://github.com/YOUR_ORG/qa-starter-kit
   ```
2. `cd qa-starter-kit && npm install`
3. `cp .env.example .env`
4. Fill in `PROJECT_NAME` and `BASE_URL` in `.env`
5. Run: `npm run scaffold`
6. `cd ../<your-project-name>-tests`
7. Follow the instructions printed by the scaffold

---

## Commands

> Run these from **your generated project folder** (after scaffolding)

```bash
npm test                # run all tests
npm run test:smoke      # quick smoke check (~5 min)
npm run scan            # print scan prompt for your agent
npm run report          # open HTML test report
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

- [Getting Started](docs/getting-started.md)
- [How it Works](docs/how-it-works.md)
- [Agent Setup Guide](docs/agent-setup.md)
- [Writing Tests](docs/writing-tests.md)
- [Running Tests](docs/running-tests.md)
- [FAQ](docs/faq.md)

---

## License

MIT
