---
name: auth-security-skill
description: Use when reviewing authentication flows, session handling, password security, or detecting hardcoded credentials. Covers admin login, student login/register, and JWT session management.
---

# Auth Security Skill

Validate authentication and security across the LMS platform.

## Authentication Architecture

- Admin login: `src/lib/actions.js` → `login()` — bcrypt verify + JWT (jose) + cookie
- Student login: `src/lib/actions.js` → `studentLogin()` — same pattern
- Student register: `src/lib/actions.js` → `studentRegister()` — bcrypt hash + insert
- Session: Encrypted JWT cookie, verified in `src/lib/session.js`

## Security Checklist

### Password Handling
- [ ] Passwords MUST be hashed with bcrypt (cost factor ≥ 12)
- [ ] NEVER log or return passwords in responses or error messages
- [ ] Password reset flow should use time-limited tokens (not implemented yet)
- [ ] Inconsistent bcrypt cost: 10 in `scripts/seed.mjs`, 12 in `actions.js` — should be unified

### Session Management
- [ ] JWT should have expiration (check `src/lib/session.js`)
- [ ] Session cookie should have `httpOnly`, `secure`, `sameSite: 'lax'` flags
- [ ] No session data should be stored in localStorage
- [ ] Admin and student sessions use the same cookie — verify role check is correct

### Credential Exposure
- [ ] Scan for hardcoded API keys, passwords, or tokens
- [ ] `.env` is committed to git with Midtrans keys and DB URL — FLAG IMMEDIATELY
- [ ] All secrets MUST use `process.env.*` — never string literals

### Additional Protections (Missing in This Codebase)
- No CSRF tokens on server actions — recommend adding
- No rate limiting on login endpoints — recommend adding
- No input sanitization on user-submitted content — recommend adding
