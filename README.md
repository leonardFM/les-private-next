# Lexicon English Academy

Website lembaga kursus bahasa Inggris dengan program online & offline untuk anak, remaja, dewasa, dan persiapan TOEFL/IELTS.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** CSS Modules
- **Font:** Geist (via next/font)

## Struktur Folder

```
src/
  app/               # Halaman (App Router)
    about/           # Halaman Tentang Kami
    contact/         # Halaman Kontak + Form
    programs/        # Halaman Program Kursus
    testimonials/    # Halaman Testimoni
    globals.css      # Style global & CSS variables
    layout.js        # Root layout (Navbar + Footer)
    page.js          # Halaman utama
  components/        # Komponen reusable
    Navbar.js
    Hero.js
    ProgramCard.js
    TestimonialCard.js
    CTASection.js
    Footer.js
```

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).
