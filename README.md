# El's Corner — Lexicon English Academy

> Learning Management System & Marketing Website untuk lembaga kursus bahasa Inggris dengan program online & offline.

---

## Fitur

### 🌐 Situs Publik
- **Beranda** — Hero section, fitur unggulan, program cards, statistik, CTA
- **Tentang Kami** — Cerita, nilai-nilai, profil pengajar
- **Program** — Daftar program dengan filter kategori
- **Kids Private** — Landing page khusus program anak
- **Testimonial** — Testimoni siswa dengan filter jenis kursus
- **Kontak** — Formulir kontak (WhatsApp), FAQ accordion
- **Floating WhatsApp** — Tombol WhatsApp mengambang
- **Dark/Light Mode** — Toggle tema gelap/terang
- **Bahasa** — Toggle Indonesia/Inggris

### 🔐 Admin Dashboard (`/admin`)
- Login dengan JWT session
- Dashboard overview (statistik, guru terbaru, jadwal mendatang)
- **CRUD** — Program, Testimonial, FAQ, Guru, Siswa, Leads
- **Manajemen Siswa** — Assign paket, catat sesi, lihat sisa sesi
- **Manajemen Jadwal** — Buat/edit, filter status
- **Manajemen Pembayaran** — Lihat transaksi, filter status
- **Manajemen PR** — Buat tugas, lihat pengumpulan, beri nilai
- **Manajemen Leads** — Kelola inquiry dari form kontak
- **Pengaturan** — Nomor WhatsApp, info kontak, nama situs

### 👨‍🎓 Student Portal (`/student`)
- Registrasi & login
- Dashboard (sesi berikutnya, statistik, PR terbaru, materi)
- Beli paket via Midtrans
- Riwayat pembayaran
- Jadwal dengan link meeting
- Materi pembelajaran per modul
- PR dengan pengumpulan & grading
- Manajemen profil

### 💳 Pembayaran
- Integrasi **Midtrans Snap API**
- Webhook untuk update status pembayaran
- Aktivasi paket otomatis setelah pembayaran sukses
- Verifikasi signature webhook

### 🌍 Internasionalisasi (i18n)
- Sistem i18n kustom (context-based)
- Bahasa Indonesia & Inggris
- Konten dinamis bilingual (disimpan sebagai JSON di database)

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Bahasa** | JavaScript |
| **Styling** | CSS Modules + CSS Custom Properties |
| **Database** | PostgreSQL 17 (via `pg`) |
| **Autentikasi** | JWT (via `jose`) |
| **Password** | `bcryptjs` |
| **Pembayaran** | Midtrans (`midtrans-client`) |
| **Font** | Geist (via `next/font`) |
| **Linting** | ESLint 9 |

---

## Struktur Folder

```
src/
├── app/
│   ├── (public)/          # Halaman publik
│   │   ├── page.js        # Beranda
│   │   ├── about/
│   │   ├── programs/
│   │   ├── kids-private/
│   │   ├── testimonials/
│   │   └── contact/
│   ├── admin/             # Halaman admin
│   │   ├── login/
│   │   ├── page.js        # Dashboard
│   │   ├── students/
│   │   ├── teachers/
│   │   ├── schedules/
│   │   ├── programs/
│   │   ├── testimonials/
│   │   ├── faqs/
│   │   ├── leads/
│   │   ├── payments/
│   │   ├── homeworks/
│   │   └── settings/
│   ├── student/           # Student portal
│   │   ├── login/
│   │   ├── register/
│   │   ├── dashboard/
│   │   ├── schedules/
│   │   ├── packages/
│   │   ├── payments/
│   │   ├── homeworks/
│   │   ├── materials/
│   │   ├── my-packages/
│   │   └── profile/
│   └── api/               # API routes
│       ├── payments/
│       └── meetings/
├── components/            # Komponen reusable
├── context/               # React context (Theme, i18n)
├── i18n/                  # Sistem terjemahan
└── lib/                   # Shared library
    ├── db.js              # Koneksi PostgreSQL
    ├── session.js         # JWT session
    ├── dal.js             # Admin session verification
    ├── student-dal.js     # Student session verification
    ├── data.js            # Data access layer
    ├── actions.js         # Server Actions
    ├── midtrans.js        # Integrasi Midtrans
    ├── constants.js       # Konstanta
    └── modules/           # Modul fitur
        ├── teachers/
        ├── schedules/
        ├── meetings/
        ├── materials/
        └── homeworks/
```

---

## Database Schema

**18 tabel** di PostgreSQL:

| Tabel | Deskripsi |
|---|---|
| `users` | Akun admin & siswa (email, password_hash, role) |
| `students` | Data siswa |
| `teachers` | Profil pengajar |
| `programs` | Program kursus (bilingual JSON) |
| `testimonials` | Testimoni (bilingual JSON) |
| `faqs` | FAQ (bilingual JSON, sortable) |
| `settings` | Pengaturan key-value |
| `leads` | Inquiry form kontak |
| `packages` | Paket yang bisa dibeli |
| `student_packages` | Paket yang dimiliki siswa |
| `session_records` | Catatan sesi/kehadiran |
| `payments` | Transaksi Midtrans |
| `schedules` | Jadwal kelas |
| `meetings` | Link meeting online |
| `modules` | Modul pembelajaran |
| `materials` | Materi pembelajaran |
| `homeworks` | Tugas/PR |
| `homework_submissions` | Pengumpulan tugas |
| `homework_grades` | Penilaian tugas |

---

## Cara Install & Menjalankan

### Prasyarat

- Node.js (>= 18)
- PostgreSQL 17 (atau gunakan Docker)
- Akun Midtrans (sandbox/production)

### 1. Clone & Install

```bash
git clone <repo-url>
cd les-private-next
npm install
```

### 2. Setup Database

```bash
# Opsi A: Pakai Docker
docker compose up -d

# Opsi B: Pakai PostgreSQL lokal
# pastikan DATABASE_URL di .env sudah sesuai
```

### 3. Inisialisasi & Seed

```bash
# Buat tabel
npm run init-db

# Seed data awal (admin, program, testimonial, FAQ)
npm run seed

# Seed data learning (guru, jadwal, modul, PR)
npm run seed-learning
```

### 4. Jalankan

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

### 5. Build Production

```bash
npm run build
npm start
```

---

## Environment Variables

Buat file `.env` (sudah tersedia):

| Variabel | Deskripsi |
|---|---|
| `DATABASE_URL` | Connection string PostgreSQL |
| `SESSION_SECRET` | Secret key untuk JWT (opsional) |
| `MIDTRANS_SERVER_KEY` | Server key Midtrans |
| `MIDTRANS_CLIENT_KEY` | Client key Midtrans |
| `MIDTRANS_IS_PRODUCTION` | `true`/`false` |
| `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` | Client key (public) |
| `NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION` | `true`/`false` |

---

## Akun Default (Development)

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@els-corner.com | admin123 |
| **Siswa** | budi@example.com | student123 |
| **Siswa** | siti@example.com | student123 |
| **Siswa** | david@example.com | student123 |

---

## Scripts

| Script | Perintah | Deskripsi |
|---|---|---|
| `dev` | `WATCHPACK_POLLING=true next dev --webpack` | Dev server |
| `build` | `next build` | Build production |
| `start` | `next start` | Start production |
| `lint` | `eslint` | Linting |
| `seed` | `node scripts/seed.mjs` | Seed data awal |
| `seed-learning` | `node scripts/seed-learning.mjs` | Seed data learning |
| `init-db` | `node scripts/init-db.mjs` | Inisialisasi tabel |

---

## Arsitektur

### Server Actions
Semua operasi CRUD menggunakan **Next.js Server Actions** (`'use server'`), bukan REST API — memungkinkan progressive enhancement dan akses database langsung dari komponen.

### Domain-Driven Modules
Logika fitur diorganisir per domain di `src/lib/modules/`:
- Setiap modul memiliki `data.js` (query read) dan `actions.js` (mutasi write)
- Pemisahan concerns yang jelas

### Bilingual JSON
Konten yang perlu diterjemahkan disimpan sebagai JSON:
```json
{ "id": "Nama Program", "en": "Program Name" }
```
Dengan helper `t()` untuk parsing di komponen.

### Autentikasi
- JWT session (via `jose`) disimpan di httpOnly cookie
- Masa berlaku 7 hari
- Verifikasi terpisah untuk admin (`dal.js`) dan student (`student-dal.js`)

### Keamanan
- Password di-hash dengan bcryptjs
- Session cookies httpOnly
- Webhook signature verification (Midtrans)
- Parameterized queries (mencegah SQL injection)

---

## URL Penting

| Halaman | URL |
|---|---|
| Situs Publik | `http://localhost:3000` |
| Admin Login | `http://localhost:3000/admin/login` |
| Student Login | `http://localhost:3000/student/login` |
| Adminer (DB GUI) | `http://localhost:8080` (via Docker) |

---

## Lisensi

Hak cipta milik El's Corner — Lexicon English Academy.
