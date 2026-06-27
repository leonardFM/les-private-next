---
name: database-query-skill
description: Use when writing, reviewing, or optimizing raw SQL queries with the `pg` driver. Covers parameterized query construction, error handling, and query logging for PostgreSQL.
---

# Database Query Skill

Safe SQL execution patterns for the LMS platform.

## Parameterized Queries (REQUIRED)

```js
// ✅ CORRECT — parameterized
const result = await db.query(
  'SELECT * FROM students WHERE email = $1 AND status = $2',
  [email, 'active']
)

// ❌ WRONG — string interpolation (SQL injection risk)
const result = await db.query(`SELECT * FROM students WHERE email = '${email}'`)
```

## Query Helpers in `src/lib/db.js`

```js
import { query, get, all } from '@/lib/db'

// Single row (returns first row or null)
const student = await get('SELECT * FROM students WHERE id = $1', [id])

// Multiple rows (returns array)
const students = await all('SELECT * FROM students WHERE program_id = $1', [programId])

// Any query (returns result object)
const result = await query('UPDATE students SET name = $1 WHERE id = $2', [name, id])
```

## Error Handling Pattern

```js
try {
  const result = await query(sql, params)
  return { success: true, data: result.rows }
} catch (error) {
  console.error('Query failed:', { sql: sql.slice(0, 100), params })
  return { success: false, error: error.message }
}
```

## Performance Checks

- Always check for missing indexes on `WHERE`, `JOIN`, and `ORDER BY` columns
- Use `EXPLAIN ANALYZE` for slow queries
- Batch queries with `WHERE id = ANY($1)` instead of N sequential queries
- Avoid `SELECT *` — name columns explicitly in production queries
