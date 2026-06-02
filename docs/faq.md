# FAQ

## Getting started

**Q: Do I need programming experience?**
No. The AI agent writes the code. You provide the app URL and describe what you want to test.

**Q: Which AI agent should I use?**
Any of them work. If you're not sure, start with Claude Code (terminal) or Cursor (IDE).
See [agent-setup.md](agent-setup.md).

**Q: What if I don't have an AI agent?**
You can still use this kit. The `prompts/` folder contains instructions written for humans too. You can follow them manually or use any chat-based AI (Claude.ai, ChatGPT, etc.) by pasting the prompts there.

---

## Tests

**Q: My tests are failing — how do I fix them?**
Paste the contents of `prompts/06-fix-errors.md` into your agent, along with the error output from `npm test`.

**Q: Some pages need login — how do I test those?**
Run `npm run auth` to save your login session. The agent will use this saved session for authenticated tests.

**Q: My app has a Cloudflare protection page — will tests work?**
Yes. The `helpers/cloudflare.ts` helper handles this. The agent uses it automatically during scanning.

**Q: Tests pass locally but fail in CI**
Check these common causes:
- `auth/` files not committed — they're gitignored by design. Set up auth in your CI pipeline.
- Missing environment variables — set `BASE_URL` and other `.env` values as CI secrets.
- Race conditions — increase `retries` in `playwright.config.ts`.

---

## Project structure

**Q: Can I add my own tests?**
Yes. Follow the patterns in `page-objects/` and `tests/`. See [writing-tests.md](writing-tests.md).

**Q: My app changed — do I need to regenerate everything?**
No. Paste `prompts/08-rescan.md` to update only the changed pages.

**Q: Can I use this for API testing?**
This kit is focused on browser UI tests. For API tests, you can add them to the `tests/` folder using Playwright's `request` context.

**Q: Can I use JavaScript instead of TypeScript?**
The kit is TypeScript-first. You can rename `.ts` to `.js` and remove the `tsconfig.json` check, but it's not recommended — TypeScript catches many common test errors.

---

## The starter kit

**Q: Will I get updates from the starter kit?**
If you used Option A (GitHub Template), your repo is independent — no automatic updates. If you want new features, check the starter kit repo and copy relevant changes manually.

**Q: Can I modify the prompts?**
Yes. The `prompts/` files are plain markdown — edit them to match your app's conventions.

**Q: What does the scaffold script do to the starter kit?**
Nothing. It creates a new folder outside the starter kit and never modifies the starter kit itself.
