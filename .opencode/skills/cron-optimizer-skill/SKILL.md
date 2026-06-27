---
name: cron-optimizer-skill
description: Use when analyzing Vercel cron job usage, optimizing execution cost, or detecting heavy/long-running cron jobs. Also covers scheduling best practices for serverless functions.
---

# Cron Optimizer Skill

Analyze and optimize Vercel cron job functions.

## Vercel Cron Configuration

Cron jobs are defined in `vercel.json` (if present) as:

```json
{
  "crons": [
    { "path": "/api/crons/cleanup", "schedule": "0 0 * * *" }
  ]
}
```

Each cron maps to an API route in `src/app/api/crons/`.

## Optimization Rules

1. **Consolidate cron jobs** — Multiple crons running at similar times should be merged into a single function to reduce cold starts
2. **Set appropriate timeouts** — Vercel serverless functions have a max duration (10s on Hobby, 60s on Pro, 300s on Enterprise via `maxDuration`)
3. **Avoid heavy work in crons** — Offload intensive processing to background queues or defer when possible
4. **Idempotency** — Crons MUST be idempotent (Vercel may retry on failure)
5. **Cost awareness** — Each cron invocation counts toward serverless function execution time

## Monitoring Checklist

- [ ] Does the cron have error logging? (should log start, end, and errors)
- [ ] Does the cron have a timeout mechanism? (hanging crons waste execution budget)
- [ ] Could this cron run less frequently? (e.g., daily vs hourly)
- [ ] Is there a manual trigger endpoint for testing? (useful for debugging)
- [ ] Are cron results persisted (last run time, status, output count)?

## Common Optimization

```js
// ❌ Heavy: process everything in one go
export async function GET() {
  const allRecords = await getAllRecords() // could be millions
  for (const record of allRecords) { /* process */ }
}

// ✅ Light: batch processing with limits
export async function GET() {
  const batch = await getRecords({ limit: 100, status: 'pending' })
  for (const record of batch) { /* process */ }
  // Schedule next batch or rely on next cron run
}
```
