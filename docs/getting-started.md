# Getting Started

This guide walks you through setting up your QA automation project from scratch.

## Before you start

You need:
- Node.js 18 or higher — [nodejs.org](https://nodejs.org)
- Git — [git-scm.com](https://git-scm.com)
- An AI coding agent (see [agent-setup.md](agent-setup.md))
- A web app you want to test

## Step 1 — Create your project

**Option A (recommended): GitHub Template**

1. Go to the starter kit repo on GitHub
2. Click **"Use this template"** → **"Create a new repository"**
3. Name your repo (e.g. `my-app-tests`)
4. Clone your new repo:
   ```bash
   git clone https://github.com/YOU/my-app-tests
   cd my-app-tests
   ```

**Option B: Scaffold Script**

1. Clone the starter kit:
   ```bash
   git clone https://github.com/YOUR_ORG/qa-starter-kit
   cd qa-starter-kit
   npm install
   ```
2. Run the scaffold:
   ```bash
   npm run scaffold
   ```
3. Follow the prompts — it will create a new folder for your project

## Step 2 — Install dependencies

```bash
npm install
npx playwright install
```

## Step 3 — Configure your app

```bash
cp .env.example .env
```

Open `.env` and fill in at minimum:
```
BASE_URL=https://your-app.com
APP_NAME=Your App Name
APP_ROLES=guest,user,admin
```

## Step 4 — Set up auth (if your app has login)

```bash
npm run auth
```

This opens a browser. Log in manually, then press Enter in the terminal.
Your session is saved to `auth/` and used by all future test runs.

## Step 5 — Generate tests

Open your AI agent in the project folder and paste the contents of `prompts/00-quick-start.md`.

The agent will:
1. Scan all pages of your app
2. Create Page Object Models
3. Write baseline tests for every page
4. Run the tests and report results

## Step 6 — Run tests

```bash
npm test                 # all tests
npm run test:smoke       # smoke tests only (~5 min)
npm run report           # open HTML report
```

## What's next?

- [How it Works](how-it-works.md) — understand the full pipeline
- [Writing Tests](writing-tests.md) — write custom tests
- [Agent Setup](agent-setup.md) — configure your specific agent
- [FAQ](faq.md) — common questions
