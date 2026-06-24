# `learn/` — the beginner track

Brand new to test automation? You're in the right place. Nothing in this folder
touches the rest of the starter kit — it's a safe sandbox for learning.

## Start here

```bash
npm run tour
```

An interactive, step-by-step walkthrough that builds your very first working test
with you and runs it. Takes about 10 minutes. You can quit any time with `Ctrl+C`
and pick up where you left off.

## What's in here

| Path | What it is |
|------|-----------|
| `tour.ts` | The interactive tour you launch with `npm run tour`. |
| `tests/sample.todo.spec.ts` | A complete, working test explained line by line. Run it with `npm run learn:sample`. |
| `lessons/` | Six bite-sized lessons, one new idea each: load → find → type → click → assert → negative case. Each has a "try it yourself" exercise and a hidden solution. Run with `npm run learn:lessons`. |
| `playwright.config.ts` | Points the lessons at the public TodoMVC demo site. |

## What we test against

The free, public [TodoMVC demo](https://demo.playwright.dev/todomvc) — no login,
no account, no setup. You add to-dos, complete them, and check the results. It's
the cleanest possible place to learn the core ideas before testing a real app.

## The plain-language guide

For the concepts in writing — what a test, locator, assertion, and page object
actually are — read [`../docs/learn-qa-automation.md`](../docs/learn-qa-automation.md).
