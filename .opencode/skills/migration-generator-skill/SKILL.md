---
name: migration-generator-skill
description: Use when generating PostgreSQL migration scripts, detecting missing tables from code usage, or reviewing migration safety. Scans server actions and data files for table/column references not in the schema.
---

# Migration Generator Skill

Generate and review PostgreSQL migrations for the LMS platform.

## Migration File Convention

```
data/
├── migration.sql                          # Phase 1: core tables
├── migration-add-learning-tables.sql      # Phase 2: LMS tables
└── migration-YYYYMMDD-description.sql     # New migrations
```

## Migration Rules

1. **ALWAYS additive** — never drop columns or tables without a deprecation window
2. Use `IF NOT EXISTS` / `IF EXISTS` for idempotency
3. Add indexes alongside new foreign key columns
4. Wrap multi-statement migrations in transaction

```sql
BEGIN;
  ALTER TABLE students ADD COLUMN IF NOT EXISTS phone VARCHAR(20);
  CREATE INDEX IF NOT EXISTS idx_students_phone ON students(phone);
COMMIT;
```

## Detect Missing Tables from Code

Scan these patterns in action/data files:

- `await get('SELECT ... FROM <table_name>')`
- `await all('SELECT ... FROM <table_name>')`
- `await query('INSERT INTO <table_name>'`
- `await query('UPDATE <table_name>'`
- `await query('DELETE FROM <table_name>'`

Cross-reference against `schema.sql` and report any `<table_name>` not defined.

## Schema Source of Truth

`schema.sql` is the canonical schema. When generating migrations:
1. Check if the change is already in `schema.sql`
2. If not, generate an ADDITIVE migration
3. Update `schema.sql` to match
4. Do NOT edit `src/lib/db.js:initDb()` — that should be replaced with a migration-based approach
