# Project Analysis: El's Corner (les-private-next)

## 1. Project Overview

**Business Domain:** English language course provider (Lembaga Kursus Bahasa Inggris) in Indonesia, operating under the brand **"El's Corner"**. Offers online and offline English courses for children (4-12), teens, adults, and professionals, including IELTS/TOEFL preparation.

**Tech Stack:**
- Next.js 16.2.6 (App Router)
- React 19.2.4
- JavaScript (no TypeScript)
- CSS Modules (no Tailwind CSS)
- No database, no ORM, no API routes
- All content is static, managed via a custom i18n system (`src/i18n/translations.js`, 1673 lines)

**Deployment Notes:**
- Uses `WATCHPACK_POLLING=true` for dev (common in Docker/WSL environments)
- Path alias `@/*` → `./src/*`

---

## 2. Current Architecture

### Route Structure (7 routes)

| Route | Page Component | Type | Description |
|---|---|---|---|
| `/` | `page.js` | Client | Home: Hero, features, programs preview, stats, testimonials, CTA |
| `/about` | `page.js` + `AboutClient.js` | Server + Client | Story, values, campuses, teachers |
| `/contact` | `page.js` + `ContactClient.js` | Server + Client | Contact form (WhatsApp), info panel, FAQ accordion |
| `/programs` | `page.js` + `ProgramsClient.js` | Server + Client | Filterable program listing (7 programs) |
| `/programs/kids` | `page.js` | Server | Redirects to `/kids-private` |
| `/kids-private` | `page.js` + `KidsPrivateClient.js` | Server + Client | Kids private tutoring landing page |
| `/testimonials` | `page.js` + `TestimonialsClient.js` | Server + Client | Filterable testimonials with stats |

### App Shell (Root Layout)

```
ThemeProvider → LanguageProvider → Navbar → <main>{children}</main> → Footer → WhatsAppButton
```

- **ThemeProvider**: Dark/light theme toggle, persists to localStorage, respects `prefers-color-scheme`
- **LanguageProvider**: Bilingual (id/en), persists to localStorage
- **Navbar**: Sticky header with logo, nav links, mobile hamburger drawer, theme toggle, locale toggle, WhatsApp CTA
- **Footer**: 4-column footer with quick links, program links, newsletter (client-side only), copyright
- **WhatsAppButton**: Floating WhatsApp button (bottom-right)

### Data Flow (No Backend)

All data is static, stored in `src/i18n/translations.js` as nested objects keyed by locale (`id` / `en`). Pages consume data via `useTranslation()` hook with dot-notation key lookup (e.g., `t('hero.title')`).

The only "form submission" is the contact form in `ContactClient.js`, which opens a WhatsApp chat with the form data encoded in the message URL (`wa.me/<number>?text=<message>`). No data is persisted server-side.

---

## 3. Existing Reusable Components

### Shared Components (`src/components/`)

| Component | Props | Purpose |
|---|---|---|
| **Navbar** | (none — reads from i18n/context) | Site navigation with theme/lang toggle |
| **Hero** | (none — reads from i18n) | Homepage hero section |
| **Footer** | (none — reads from i18n) | Site footer with newsletter |
| **ProgramCard** | `title, description, category, format, level, duration, price, icon` | Reusable program/course card |
| **TestimonialCard** | `name, course, rating, quote, initials` | Reusable testimonial card |
| **CTASection** | `title, description, primaryActionText, primaryMessage, secondaryActionText, secondaryActionUrl` | Call-to-action section (WhatsApp + internal link) |
| **PromotionalBanner** | (none — reads from i18n) | Homepage promo banner for kids program |
| **WhatsAppButton** | (none) | Floating WhatsApp button |

### Kids-Specific Components (`src/components/kids/`)

| Component | Purpose |
|---|---|
| **HeroSection** | Kids landing hero with metrics, graded overlay |
| **ProgramSection** | Kids program cards grid |
| **LearningJourneySection** | 3-step vertical timeline |
| **GallerySection** | Masonry image gallery |
| **TestimonialSection** | Parent testimonials |
| **FAQSection** | Accordion FAQ |
| **CTASection** | Kids-specific CTA with image |
| **StickyWA** | Mobile sticky WhatsApp bar |
| **FadeIn** | Scroll-triggered fade-in animation wrapper |

### Form Patterns

Only one form exists: **Contact Form** (`ContactClient.js`)
- Fields: Full Name, Email, Phone, Program (dropdown), Format (dropdown), Message (textarea)
- Validation: Client-side only (checks `name && email && message` presence)
- Submission: Opens WhatsApp with structured message
- Has a "submitted" success state

---

## 4. Existing Design System

Located in `src/app/globals.css` (466 lines) — entirely CSS Custom Properties driven.

### Design Tokens

| Category | Tokens |
|---|---|
| **Brand Colors** | `--primary-blue: #004AAD`, `--accent-yellow: #FFDE59` |
| **Semantic** | `--primary`, `--accent`, `--background`, `--foreground`, `--card-bg`, `--border-color`, `--success` |
| **Shadows** | `--shadow-sm/md/lg/xl` (blue-tinted) |
| **Border Radius** | `--border-radius-sm: 12px`, `--md: 20px`, `--lg: 32px`, `--xl: 40px` |
| **Transitions** | `--transition-fast/normal/bounce` |
| **Layout** | `--container-max-width: 1200px` |

### Dark Mode
- Triggered via `[data-theme='dark']` attribute on `<html>`
- Also respects `prefers-color-scheme: dark` with `:root:not([data-theme='light'])` fallback
- All tokens override for dark backgrounds

### Global Utility Classes
- `.container` — max-width 1200px centered
- `.section` — 100px padding, relative positioning
- `.section-header`, `.section-tag`, `.section-title`, `.section-subtitle`
- `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-accent`
- `.bg-yellow`, `.bg-blue` — alternating section backgrounds
- `.card-playful` — card base with hover animation
- Various animation utilities: `.animate-fade-in`, `.animate-float`, `.animate-blob`, `.animate-scale-in`

### Animations
Keyframes defined: `fadeIn`, `float`, `floatSlow`, `blob`, `pulseGlow`, `wiggle`, `scaleIn`, `slideInLeft`, `slideInRight`

### Responsive Breakpoints
Found in CSS modules: 480px, 600px, 680px, 768px, 968px, 1024px

---

## 5. Existing Data Models (Embedded in translations.js)

All entities are defined as static arrays/objects in `translations.js`. These are the de facto data models:

### Program Entity
```js
{
  title: string,
  description: string,
  category: "General" | "Academic" | "Professional" | "Young Learners" | "Kids",
  format: string,
  level: string,
  duration: string,
  price: string,
  icon: string
}
```
(7 instances in `programsPage.programs`, 3 in `home.programs.cards`)

### Testimonial Entity
```js
{
  name: string,
  course?: string,
  childAge?: string,    // kids testimonials
  rating: number,        // 4 or 5
  quote: string,
  initials: string
}
```
(6 instances in `testimonialsPage.testimonials`, 3 in `home.testimonials.cards`, 3 in `kidsPage.testimonials.cards`, 3 in `kids.testimonials.cards`)

### Teacher Entity
```js
{
  initials: string,
  name: string,
  role: string,
  bio: string
}
```
(4 instances in `about.teachers`)

### Campus Entity
```js
{
  icon: string,
  name: string,
  desc: string
}
```
(3 instances in `about.campuses`)

### FAQ Entity
```js
{
  q: string,
  a: string
}
```
(4 in `contact.faqs`, 5 in `kidsPage.faqs.items`, 3 in `kids.faq.items`)

### Feature/Value Entity
```js
{
  icon: string,
  title: string,
  desc: string
}
```
(3 in `home.features.cards`, 3 in `about.values`, 6 in `kidsPage.advantages.cards`, 6 in `kidsPage.whyUs.reasons`)

### Stat Entity
```js
{
  value: string,
  label: string
}
```
(4 in `home.stats`, 3 in `testimonialsPage.stats`, 4 in `kidsPage.hero.stats`)

### Contact Info Entity
```js
{
  icon: string,
  title: string,
  val: string
}
```
(4 in `contact.infos`)

### Age Group Entity
```js
{
  age: string,
  title: string,
  desc: string,
  color: string
}
```
(3 in `kidsPage.ages.groups`)

### Kids Program Card Entity
```js
{
  title: string,
  icon: string,
  desc: string
}
```
(4 in `kids.programs.cards`)

---

## 6. Existing Admin Workflows

**None.** There is zero admin functionality in the current project. All content is hardcoded in `translations.js`. To update any content (programs, testimonials, teachers, FAQs, etc.), a developer must:
1. Edit `src/i18n/translations.js`
2. Rebuild the application

There is no authentication, no dashboard, no content management interface, no media library, no user management, and no analytics.

---

## 7. Existing User Workflows

| User Action | Workflow |
|---|---|
| Browse courses | Visit `/programs` → filter by category → click WhatsApp CTA on any card |
| Learn about the school | Visit `/about` → read story/values/teachers/campuses |
| Contact/inquire | Visit `/contact` → fill form → WhatsApp opens with pre-filled message |
| View testimonials | Visit `/testimonials` → filter by course type → read reviews |
| Kids program inquiry | Visit `/kids-private` → scroll through sections → click any WhatsApp CTA |
| Change language | Click locale toggle in navbar (id ↔ en) |
| Change theme | Click theme toggle in navbar (light ↔ dark) |

**Key insight:** Every conversion action (CTA, form submission, enrollment) routes through WhatsApp. There is no checkout, no payment, no user accounts, and no registration flow.

---

## 8. Missing Admin Functionality (Gap Analysis)

### Critical Gaps
1. **No authentication/authorization** — no admin login, no session management, no role-based access
2. **No content management** — all content is hardcoded in one file; no CMS, no CRUD for any entity
3. **No dashboard** — no admin landing page, no overview/stats
4. **No lead management** — contact form submissions go to WhatsApp only; no lead tracking, no database
5. **No program management** — programs are static; no way to add/edit/remove programs
6. **No testimonial management** — testimonials are hardcoded; no moderation or approval workflow
7. **No teacher management** — teacher profiles are static
8. **No FAQ management** — FAQ items are hardcoded
9. **No media library** — images in `/public/image/` are static files with hash names; no upload interface

### Secondary Gaps
10. **No newsletter management** — newsletter "subscription" is client-side only (visual feedback, no actual subscription)
11. **No analytics dashboard** — no way to view page visits, conversion rates, or lead sources
12. **No user/student management** — no student records, no enrollment tracking
13. **No notification system** — no way to notify admins of new inquiries
14. **No SEO management** — page metadata is hardcoded in each page.js
15. **No settings management** — no way to update site-wide settings (phone number, social links, address)

---

## 9. Recommended Dashboard Structure

Given this is a marketing/lead-gen website for a language school, the dashboard should prioritize:

### Tier 1 (MVP — Essential)

```
/admin
├── /login                    — Authentication (email/password or Google OAuth)
├── /dashboard                — Overview: total inquiries, recent leads, quick stats
├── /leads                    — Inquiries from contact form (table with status, date, program)
│   └── /leads/:id            — Lead detail view
├── /programs                 — CRUD for programs
│   ├── /programs             — List all programs
│   └── /programs/new         — Add program form
│   └── /programs/:id/edit    — Edit program form
├── /testimonials             — CRUD for testimonials
│   ├── /testimonials         — List all testimonials
│   └── /testimonials/new     — Add testimonial form
│   └── /testimonials/:id/edit
├── /faqs                     — CRUD for FAQs
│   ├── /faqs                 — List all FAQs
│   └── /faqs/new
│   └── /faqs/:id/edit
└── /settings                 — Site settings (phone, email, social links, address)
```

### Tier 2 (Enhanced)

```
├── /teachers                 — CRUD for teacher profiles
│   └── /teachers/new
│   └── /teachers/:id/edit
├── /campuses                 — CRUD for campus/location info
├── /students                 — View/Manage student records (basic)
├── /newsletter               — Newsletter subscriber management
├── /media                    — Media library (image uploads)
└── /pages                    — Simple page content editor (hero, about, etc.)
```

### Tier 3 (Advanced)

```
├── /analytics                — Page views, conversion tracking
├── /notifications            — Inquiry alerts, email notifications
├── /seo                      — Meta title/description editor per page
├── /users                    — Admin user management
└── /backup                   — Content export/import
```

### Dashboard Technical Recommendations

1. **Architecture**: Use Next.js App Router with parallel routes for the admin panel
2. **Authentication**: NextAuth.js with credentials + Google OAuth providers
3. **Database**: SQLite (via Prisma, Drizzle, or better-sqlite3) for simplicity, or Supabase for managed DB
4. **Admin UI**: Build on existing design system (CSS Modules + CSS vars), or consider a minimal UI library
5. **Forms**: Use the contact form pattern as template — consistent styling with `.formCard`, `.input`, `.select`, `.textarea`
6. **API**: Create `src/app/api/` route handlers using Next.js App Router API routes
7. **Media Upload**: Use `next/image` compatible storage (local in `/public/uploads/` or cloud storage)
8. **State**: React state for forms, consider SWR/React Query for data fetching
9. **Layout**: Admin layout with sidebar navigation, separate from the public layout. Use route groups: `(public)` and `(admin)`
