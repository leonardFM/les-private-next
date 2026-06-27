---
name: api-analysis-skill
description: Use when auditing server actions and API routes for redundant logic, missing error handling, or optimization opportunities. Covers both `'use server'` actions and route handlers.
---

# API Analysis Skill

Audit and optimize server actions and API routes.

## Server Action Audit Checklist

- [ ] Are `'use server'` directives at file level (correct) or spread per function?
- [ ] Does every mutation action call `revalidatePath()` with the correct path?
- [ ] Does the action validate input types before processing?
- [ ] Is `Object.fromEntries(formData)` used? (includes ALL form fields — be explicit)
- [ ] Are error states returned as `{ success: false, error: message }` — not thrown?
- [ ] Is there CSRF protection? (Currently MISSING in this codebase)
- [ ] Is auth verified at the top of the action before any processing?

## API Route Audit Checklist

- [ ] Does the route verify authentication? (Missing in `/api/upload` and `/api/meetings/create`)
- [ ] Are HTTP methods restricted (GET/POST only)?
- [ ] Is there request validation (body schema, content-type)?
- [ ] Are errors returned as proper HTTP responses with status codes?
- [ ] Is the route idempotent where expected? (webhook MUST be)
- [ ] Is there rate limiting on mutation endpoints?

## Redundancy Detector

`src/lib/actions.js` (310 lines) contains ALL admin CRUD. Check if any function could use a generic handler:

```js
// Pattern match — if you see this pattern 10+ times, extract it:
export async function saveXxx(formData) {
  const data = Object.fromEntries(formData)
  if (data.id) {
    await db.query('UPDATE xxx SET ... WHERE id = $1', [...values, data.id])
  } else {
    await db.query('INSERT INTO xxx (...) VALUES (...)', [...values])
  }
  revalidatePath('/admin/xxx')
  return { success: true }
}
```

Generic replacement:
```js
import { upsert } from '@/lib/crud'

export async function saveXxx(formData) {
  return upsert('xxx', Object.fromEntries(formData), '/admin/xxx')
}
```
