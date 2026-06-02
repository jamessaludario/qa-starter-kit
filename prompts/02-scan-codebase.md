# Prompt 02 — Scan Codebase

Analyze the app's source code to find routes, components, and auth logic.

## Setup

Read `.env` and note:
- `APP_REPO_PATH` — path to the app's source code
- Skip this prompt entirely if `APP_REPO_PATH` is blank

## Steps

1. Navigate to `APP_REPO_PATH`
2. Identify the framework (Next.js, React, Vue, Laravel, Rails, etc.)
3. Find all routes/pages defined in the codebase

4. Save routes to `code-context/routes.json`:
```json
{
  "framework": "nextjs",
  "routes": [
    { "path": "/dashboard", "file": "app/dashboard/page.tsx", "auth": true },
    { "path": "/login", "file": "app/login/page.tsx", "auth": false }
  ]
}
```

5. Find all major UI components
6. Save to `code-context/components.json`:
```json
{
  "components": [
    { "name": "UserTable", "file": "components/UserTable.tsx", "usedIn": ["/users"] }
  ]
}
```

7. Find auth logic — how sessions/tokens are checked
8. Save a summary to `code-context/summary.json`:
```json
{
  "framework": "nextjs",
  "totalRoutes": 0,
  "authMechanism": "JWT in cookie",
  "protectedRoutes": ["..."],
  "publicRoutes": ["..."],
  "testableFeatures": ["..."]
}
```

## When done

Tell me:
- Framework detected
- Total routes found
- Auth mechanism identified
- Any routes that look critical and should have e2e tests

