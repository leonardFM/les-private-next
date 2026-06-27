---
name: component-refactor-skill
description: Use when normalizing Next.js components, removing duplicate UI logic, or consolidating CSS Modules. Detects repeated patterns across the component tree.
---

# Component Refactor Skill

Normalize and consolidate UI components for the LMS platform.

## Known Duplications to Fix

1. **Midtrans Snap.js loading** — Duplicated in:
   - `src/app/admin/(dashboard)/payments/_components/PaymentButton.js`
   - `src/app/student/(dashboard)/packages/PackageCard.js`
   
   **Fix**: Extract shared `useMidtransSnap` hook into `src/lib/hooks/useMidtransSnap.js`

2. **CSS Module patterns** — Check for duplicated styles across `.module.css` files:
   - Look for identical `.container`, `.card`, `.grid` patterns
   - Extract to shared CSS Modules in `src/components/`

3. **Admin list pages** — All follow same structure:
   ```jsx
   <AdminPageHeader />
   <AdminTable /> or <EmptyState />
   ```
   Consider a generic `<AdminList resource="..." columns={[...]} />` component

## Refactor Checklist

- [ ] Component is used in 2+ places → extract to `src/components/`
- [ ] Component has internal state that could be lifted or replaced with URL params
- [ ] Client component doesn't use any hooks or event handlers → convert to Server Component
- [ ] CSS Module class names are duplicated across files → extract shared styles
- [ ] Same utility function exists in multiple files → move to `src/lib/utils.js`
