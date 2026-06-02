# Prompt 01 — Scan Pages

Scan every page of the app and save a structured map of each page.

## Setup

Read `.env` and note:
- `BASE_URL` — where to start scanning
- `APP_ROLES` — which roles to scan as (e.g. guest, user, admin)
- `ADMIN_BASE_URL` — scan this too if it is set

## Steps

1. Start at `BASE_URL` as an unauthenticated guest
2. Click every link, button, and nav item you find
3. For each page discovered, save a page map to `page-maps/<role>/<page-name>.json`

Each page map must include:
```json
{
  "url": "https://...",
  "title": "Page Title",
  "role": "guest",
  "timestamp": "2024-01-01T00:00:00Z",
  "elements": {
    "headings": ["..."],
    "links": [{ "text": "...", "href": "..." }],
    "buttons": [{ "text": "...", "selector": "..." }],
    "forms": [{ "id": "...", "fields": ["..."] }],
    "images": [{ "alt": "...", "src": "..." }]
  },
  "authRequired": false,
  "notes": ""
}
```

4. If `APP_ROLES` includes authenticated roles:
   - Check if `auth/<role>-state.json` exists
   - If it does, load that auth state and scan again as that role
   - Save maps to `page-maps/<role>/`
   - Note any pages that are only visible when logged in

5. Save a summary to `page-maps/summary.json`:
```json
{
  "scannedAt": "2024-01-01T00:00:00Z",
  "totalPages": 0,
  "byRole": {
    "guest": ["..."],
    "user": ["..."],
    "admin": ["..."]
  },
  "authRequiredPages": ["..."],
  "errors": []
}
```

## When done

Tell me:
- Total pages found
- Pages per role
- Any pages that errored or could not be scanned
- Any pages that require auth but have no auth state yet

