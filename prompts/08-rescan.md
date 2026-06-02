# Prompt 08 — Rescan After App Changes

Use this when the app has been updated and tests may be out of date.

## When to use this

- After a new feature was added
- After a page was redesigned
- After a route was renamed
- After tests started failing due to app changes

## Steps

1. Run existing tests first: `npx playwright test --reporter=list`
   - Note which tests are failing before any changes

2. Rescan pages that changed (or all pages if unsure):
   - Follow `prompts/01-scan-pages.md` for just the affected pages
   - Save new page maps to `page-maps/` (overwrite old ones)

3. Compare old vs new page maps:
   - Which elements were added?
   - Which elements were removed or renamed?
   - Which routes changed?

4. Update Page Objects to match new selectors:
   - Update properties in `page-objects/`
   - Do NOT update test assertions yet

5. Update route constants if URLs changed:
   - Update `constants/routes.ts`

6. Run tests again: `npx playwright test --reporter=list`
   - Tests should pass now if only selectors/routes changed
   - If tests still fail, the app behavior changed → update assertions

7. Generate new tests for any new pages found:
   - Follow `prompts/03-generate-baseline.md` for new pages only

8. Run `npx tsc --noEmit` — zero errors required

## When done

Tell me:
- Which pages changed
- Which Page Objects were updated
- How many new tests were added
- Final test pass rate

