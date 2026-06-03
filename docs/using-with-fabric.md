# Using the QA Starter Kit with Fabric

[Fabric](https://farpointalpha.com/fabric) is a standalone desktop AI coding tool that works with any model provider — Anthropic, OpenAI, Google, DeepSeek, OpenRouter, local models, and Fabric's own hosted models. It requires no IDE and runs on Mac, Windows, and Linux.

This guide covers everything you need to run this starter kit using Fabric.

---

## Why Fabric works well here

- **No IDE required** — open your project folder directly in Fabric
- **Free to start** — Google Gemini Flash, Mistral, and OpenRouter all have free tiers
- **Switch models mid-task** — use a cheap model for scanning, a smarter one for test generation
- **Built-in slash commands** — the `prompts/` folder is pre-wired so you can trigger workflows with `/scan-pages`, `/generate-baseline`, etc.
- **Sub-agents** — Fabric can run parallel tasks (e.g. scan + analyze codebase simultaneously)

---

## Setup

### 1. Install Fabric

Download from [farpointalpha.com/fabric](https://farpointalpha.com/fabric). Available for macOS, Windows, and Linux.

### 2. Add an API key (or use Fabric's free models)

Go to **Settings → Models** and connect at least one provider:

| Provider | Free tier? | Where to get key |
|----------|-----------|-----------------|
| **Fabric models** | Yes (included) | No key needed — sign in to Fabric |
| **Google (Gemini)** | Yes | [aistudio.google.com](https://aistudio.google.com/app/apikey) |
| **Mistral** | Yes | [console.mistral.ai](https://console.mistral.ai) |
| **OpenRouter** | Yes (free models) | [openrouter.ai](https://openrouter.ai) |
| **Anthropic** | No | [console.anthropic.com](https://console.anthropic.com) |
| **OpenAI** | No | [platform.openai.com](https://platform.openai.com/api-keys) |

> **Tip for free-tier users:** Gemini Flash is fast, generous, and free. Use it for all scanning and baseline generation steps. Only switch to a paid model if output quality isn't meeting your needs.

### 3. Open your project

In Fabric: **File → Open Project** → select your project folder (the one scaffolded from this starter kit).

Fabric will index your codebase and make it available as context in every conversation.

### 4. Configure your app

If you haven't already:
```bash
cp .env.example .env
```

Fill in `.env`:
```
BASE_URL=https://your-app.com
APP_NAME=Your App Name
APP_ROLES=guest,user,admin
```

---

## Running the QA Pipeline

### Option A: Slash commands (recommended)

Type `/` in the Fabric chat bar to see all available commands. The `prompts/` folder is pre-configured as Fabric slash commands.

Run them in order:

| Step | Command | Recommended model |
|------|---------|------------------|
| 1. Scan pages | `/scan-pages` | Gemini Flash / Fabric Small |
| 2. Scan codebase | `/scan-codebase` | Gemini Flash / Fabric Small |
| 3. Generate baseline tests | `/generate-baseline` | Fabric Large / Claude Sonnet |
| 4. Fix any errors | `/fix-errors` | Fabric Medium / Claude Haiku |
| 5. Generate e2e tests | `/generate-e2e` | Fabric Large / Claude Sonnet |
| 6. Generate regression tests | `/generate-regression` | Fabric Large / Claude Sonnet |
| 7. Clean up | `/cleanup` | Gemini Flash / Fabric Small |

> **Token tip:** Scanning steps are cheap — use free/small models. Test generation steps benefit from a smarter model. Use the model selector in the chat bar to switch without starting a new conversation.

### Option B: Paste prompts manually

1. Open any file in `prompts/`
2. Copy the full contents
3. Paste into Fabric chat
4. Press Enter

---

## Model Selection Guide

### For free-tier users

Use these models exclusively to stay within free limits:

- **Fabric Small / Medium** — built into Fabric, no API key needed
- **Gemini Flash** — Google's free tier, fast and capable
- **Free OpenRouter models** — DeepSeek R1, Qwen, and others

Scanning and cleanup tasks work well on free models. If baseline test generation produces poor output, try Fabric Large before upgrading to a paid model.

### For paid users

| Task | Best model |
|------|-----------|
| Page scanning | Gemini Flash, Claude Haiku |
| Codebase analysis | Claude Haiku, GPT-4o Mini |
| Baseline test generation | Claude Sonnet, Fabric Large |
| E2E / regression tests | Claude Sonnet, GPT-4o |
| Fixing complex errors | Claude Sonnet, GPT-4o |

---

## Using Sub-agents for Speed

Fabric can run multiple background agents in parallel. This is useful for steps that don't depend on each other, like scanning different roles simultaneously.

**Example prompt:**
```
Spawn two subagents:
1. Scan all pages as a guest user and save page maps to page-maps/guest/
2. Scan all pages as an admin user (use auth/admin-state.json) and save to page-maps/admin/

Consolidate a summary in page-maps/summary.json when both are done.
```

> Use Fabric XLarge or a capable model (Claude Sonnet, GPT-4o) when spawning subagents — smaller models may not handle orchestration reliably.

---

## Running Tests

After Fabric generates your tests, run them from the terminal inside your project folder:

```bash
npm test                  # all tests
npm run test:smoke        # smoke tests only
npm run report            # open HTML report
```

Or use Fabric's built-in terminal: open the terminal panel and run commands there directly.

---

## Tips

- **Switch models mid-conversation** — the model selector in the chat bar applies immediately. No need to start a new chat.
- **Keep conversations focused** — one conversation per task (scan, generate, fix) keeps context small and costs down.
- **Use the built-in browser** — if your app is running locally, Fabric can browse it directly during the scan step.
- **Fabric remembers your project** — once indexed, you don't need to re-explain your codebase structure each time.

---

## Troubleshooting

**Slash commands not appearing**
Make sure your project is open via **File → Open Project**, not just a folder drag. Fabric needs to index the project to pick up the `prompts/` commands.

**Model not following project structure**
Add `@workspace` or reference specific files in your prompt:
```
Using the helpers in helpers/ and page objects in page-objects/, generate baseline tests for the login page.
```

**Free model producing poor test output**
Switch to Fabric Large or Claude Haiku for generation tasks. Free models work well for scanning but may struggle with complex multi-file code generation.

**Tests fail after generation**
Run `/fix-errors` in Fabric with the error output pasted in. Most TypeScript and Playwright errors are fixable in one pass.
