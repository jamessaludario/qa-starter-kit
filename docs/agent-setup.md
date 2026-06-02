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
