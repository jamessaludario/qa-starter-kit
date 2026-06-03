# Using the QA Starter Kit with IDE Agents

This guide covers how to use this starter kit with AI agents that live inside your code editor: **Cursor**, **Windsurf**, and **VS Code + GitHub Copilot**.

For a standalone desktop tool that works without an IDE, see [using-with-fabric.md](using-with-fabric.md).

---

## How IDE agents work with this kit

IDE agents read your project files as context automatically. Each agent has a dedicated config file that this starter kit ships with:

| Agent | Config file auto-read |
|-------|-----------------------|
| Cursor | `.cursor/rules/` |
| Windsurf | `.windsurf/rules.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |

This means you don't need to paste your full project structure or rules into every prompt — the agent already knows them when you open the project.

---

## Cursor

**Download:** [cursor.com](https://cursor.com)

### Setup

1. Open your project folder: **File → Open Folder**
2. The `.cursor/rules/` folder is read automatically — no extra config needed

### Running the QA pipeline

Use **Composer** (`Ctrl+I` / `Cmd+I`) for multi-file tasks like test generation. Use **Chat** (`Ctrl+L` / `Cmd+L`) for questions and single-file edits.

**Recommended flow:**

1. Open Composer
2. Paste the contents of `prompts/00-quick-start.md` — Cursor will run the full pipeline
3. Let it finish, then run: `npm run test:smoke`
4. If errors appear, paste `prompts/06-fix-errors.md` into Composer with the error output

**Running individual steps:**
Paste any prompt file directly into Composer:
- `prompts/01-scan-pages.md` → scans all pages
- `prompts/03-generate-baseline.md` → generates baseline tests
- `prompts/04-generate-e2e.md` → generates e2e tests

### Model selection

| Task | Recommended model |
|------|------------------|
| Scanning / analysis | cursor-small, GPT-4o Mini |
| Test generation | claude-sonnet-4-5, GPT-4o |
| Fixing errors | claude-haiku, GPT-4o Mini |

> **Token tip:** Use `cursor-small` or a fast model for scanning steps. Switch to a smarter model for generation. In Cursor, change the model in the top-right of the Composer panel.

### Tips

- Use **Cursor Tab** (autocomplete) while editing test files — it picks up your project's patterns
- Reference files directly in your prompt: `@page-objects/LoginPage.ts` to keep context focused
- For large generation tasks, break the pipeline into steps rather than running `00-quick-start.md` all at once — this avoids hitting context limits on smaller models

---

## Windsurf

**Download:** [windsurf.ai](https://windsurf.ai)

### Setup

1. Open your project folder in Windsurf
2. The `.windsurf/rules.md` file is read automatically

### Running the QA pipeline

Use the **Cascade** panel (right side) for agentic tasks. Cascade can read files, make edits, and run terminal commands — it works best for the full pipeline.

**Recommended flow:**

1. Open Cascade
2. Paste `prompts/00-quick-start.md` — Cascade will handle the full pipeline end to end
3. Cascade will open a terminal and run TypeScript checks automatically
4. Review the output and run: `npm run test:smoke`

**Running individual steps:**
Paste individual prompt files into Cascade as needed.

### Model selection

Windsurf uses its own model infrastructure. In the Cascade model selector:

| Task | Recommended model |
|------|------------------|
| Scanning | Cascade Base |
| Test generation | Cascade, Claude Sonnet via Windsurf |
| Fixing errors | Cascade Base |

> **Token tip:** Windsurf's Cascade Base model is fast and included in the free plan. Use it for scanning and error fixing. Switch to a smarter model only for test generation.

### Tips

- Cascade keeps terminal output in context — if a test fails, just say "fix the failing test" and it reads the error automatically
- Windsurf's autocomplete (inline) learns from your open files — keep relevant page objects open while editing tests
- Use **Write mode** in Cascade for large multi-file changes, **Chat mode** for questions

---

## VS Code + GitHub Copilot

**Extension:** [GitHub Copilot on VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)

### Setup

1. Install the GitHub Copilot extension
2. Sign in with your GitHub account
3. Open your project folder in VS Code
4. The `.github/copilot-instructions.md` file is read automatically by Copilot Chat

### Running the QA pipeline

Use **Copilot Chat** (`Ctrl+Alt+I` / `Cmd+Option+I`) with `@workspace` to give Copilot full codebase context.

**Recommended flow:**

1. Open Copilot Chat
2. Prefix your prompt with `@workspace` so Copilot reads all project files:
   ```
   @workspace <paste contents of prompts/00-quick-start.md>
   ```
3. For each subsequent step, include `@workspace` again
4. Run tests from the VS Code integrated terminal: `npm run test:smoke`

**Running individual steps:**
```
@workspace <paste contents of prompts/01-scan-pages.md>
```

### Model selection

Copilot model selection is in the Copilot Chat panel header (gear icon or model dropdown):

| Task | Recommended model |
|------|------------------|
| Scanning | GPT-4o Mini, Claude Haiku |
| Test generation | GPT-4o, Claude Sonnet |
| Fixing errors | GPT-4o Mini, Claude Haiku |

> **Token tip:** Copilot's free plan includes limited completions per month. Use GPT-4o Mini for scanning and error fixing to preserve quota for test generation where quality matters most.

### Tips

- Always use `@workspace` — without it, Copilot only sees the currently open file
- Reference specific files with `#file:page-objects/LoginPage.ts` to narrow context and save tokens
- Use **Copilot Edits** (`Ctrl+Shift+I`) for multi-file generation — it's more reliable than Chat for creating several test files at once
- The free GitHub Copilot tier includes enough quota to run this pipeline — use smaller models to stay within limits

---

## Switching between agents

You can use different agents at different times — the `prompts/` files are agent-agnostic plain text. If you want to copy an agent's config folder into your project:

```bash
# From inside the starter kit directory:
cp -r .cursor /path/to/your-project/
cp -r .windsurf /path/to/your-project/
cp -r .github /path/to/your-project/
```

---

## General tips for IDE agents

**Keep context focused.** IDE agents read your whole project, which costs tokens. Reference specific files (`@file`, `#file`, `@page-objects/...`) when you only need one thing.

**Break the pipeline into steps.** Running `00-quick-start.md` all at once is convenient but uses the most tokens. Running each `prompts/0x-*.md` file individually is more efficient and easier to debug.

**Use smaller models for cheaper steps.** Scanning pages and fixing TypeScript errors don't need GPT-4o. Save your quota/budget for the steps that produce code.

**Check TypeScript after every generation step.** Run `npx tsc --noEmit` before asking the agent to fix errors — this gives it precise error messages to work with rather than guessing.
