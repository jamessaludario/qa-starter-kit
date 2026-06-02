# Agent Prompts Reference

All prompts are in the `prompts/` folder. Copy any prompt's contents and paste it into your AI agent.

## Prompt index

| File | When to use |
|------|-------------|
| `00-quick-start.md` | First time setup — runs the full pipeline |
| `01-scan-pages.md` | Scan all pages of your app |
| `02-scan-codebase.md` | Analyze app source code |
| `03-generate-baseline.md` | Generate page load tests |
| `04-generate-e2e.md` | Generate user flow tests |
| `05-generate-regression.md` | Generate edge case tests |
| `06-fix-errors.md` | Fix failing tests |
| `07-cleanup.md` | Clean up and improve test quality |
| `08-rescan.md` | Update tests after app changes |

## Recommended workflow

**First time:**
1. Paste `00-quick-start.md` — this runs everything end-to-end

**After first setup:**
- App changed? → Paste `08-rescan.md`
- Tests failing? → Paste `06-fix-errors.md`
- Want more e2e tests? → Paste `04-generate-e2e.md`
- Tests messy? → Paste `07-cleanup.md`

## Tips for any agent

- Always give the agent access to your full project folder (not just one file)
- If the agent seems confused, tell it to read `.env` first
- After the agent finishes, always run `npm test` to verify
- If a run fails midway, paste the error output and then paste `06-fix-errors.md`
