# AI Agent Setup Guide

This kit works with any AI coding agent. Follow the instructions for your agent below.

---

## Claude Code

**Best for:** terminal users, full automation

**Setup:**
```bash
npm install -g @anthropic/claude-code
cd your-project-tests
claude .
```

**How to use prompts:**
The `.claude/CLAUDE.md` file is read automatically when you open the project.
For manual prompts: type or paste into the Claude chat.

**Tip:** Claude Code reads your entire codebase — it will understand your Page Objects and helpers without you explaining them.

---

## Cursor

**Best for:** IDE users who want inline suggestions

**Setup:**
1. Download Cursor from [cursor.com](https://cursor.com)
2. Open your project folder: `File → Open Folder`
3. The `.cursor/rules/` folder is read automatically

**How to use prompts:**
- Press `Ctrl+L` (or `Cmd+L`) to open Cursor chat
- Paste any prompt from the `prompts/` folder

**Tip:** Use Cursor's Composer (`Ctrl+I` / `Cmd+I`) for multi-file changes like generating a full test suite.

---

## VS Code + GitHub Copilot

**Best for:** users already working in VS Code

**Setup:**
1. Install the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension
2. Open your project folder in VS Code
3. The `.github/copilot-instructions.md` file is read automatically

**How to use prompts:**
- Open Copilot Chat: `Ctrl+Alt+I` (or `Cmd+Option+I`)
- Paste any prompt from the `prompts/` folder

**Tip:** Add `@workspace` before any prompt so Copilot reads your full codebase:
```
@workspace <paste prompt here>
```

---

## Windsurf

**Best for:** users who prefer Windsurf IDE

**Setup:**
1. Download Windsurf from [windsurf.ai](https://windsurf.ai)
2. Open your project folder
3. The `.windsurf/rules.md` file is read automatically

**How to use prompts:**
- Open the Cascade panel
- Paste any prompt from the `prompts/` folder

---

## Fabric

**Best for:** users who want a standalone desktop app with built-in multi-model support and no IDE required

**Setup:**
1. Download Fabric from [farpointalpha.com/fabric](https://farpointalpha.com/fabric)
2. Open Fabric and go to **File → Open Project** — select your project folder
3. Add an API key in **Settings → Models** (free options: Google Gemini, Mistral, OpenRouter)

**How to use prompts:**
- Type `/` in the chat bar to see available slash commands — the `prompts/` folder is pre-wired as Fabric commands
- Or paste any prompt from `prompts/` directly into the chat

**Slash commands available:**
| Command | What it does |
|---------|-------------|
| `/scan-pages` | Scans all pages of your app |
| `/scan-codebase` | Analyzes your app source code |
| `/generate-baseline` | Generates baseline smoke tests |
| `/generate-e2e` | Generates end-to-end flow tests |
| `/generate-regression` | Generates regression tests |
| `/fix-errors` | Fixes TypeScript or Playwright errors |
| `/cleanup` | Cleans up and deduplicates tests |
| `/rescan` | Rescans after app changes |

**Tip:** Fabric supports any model provider. For free usage, select Gemini Flash (Google) or a free OpenRouter model. Switch to Claude Sonnet or GPT-4 only for complex generation tasks.

See the full guide: [using-with-fabric.md](using-with-fabric.md)

---

## Antigravity

**Best for:** teams using Antigravity

**Setup:**
The `.antigravity/config.yml` is pre-configured by the scaffold script.

**How to use prompts:**
- Paste prompts into the Antigravity chat interface
- Or reference prompt files directly in your config

---

## Any other agent

Works with any agent that accepts text prompts.

**How to use:**
1. Open your agent
2. Open any file in `prompts/`
3. Copy the entire contents
4. Paste into your agent chat
5. Wait for it to finish
6. Run: `npm test`

**Recommended starting prompt:** `prompts/00-quick-start.md`

---

## Switching agents mid-project

You can use any agent at any time — the prompts are agent-agnostic. If you want to add a specific agent's config folder (e.g. switch from Copilot to Cursor), copy the relevant folder from the starter kit:

```
# From inside the starter kit:
cp -r .cursor /path/to/your-project/
```
