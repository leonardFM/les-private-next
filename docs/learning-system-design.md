# Learning System Design - El's Corner

## 1. Database Schema

### New Tables

```sql
-- ============================================================
-- 1. TEACHERS
-- ============================================================
CREATE TABLE IF NOT EXISTS teachers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  bio TEXT,
  specialization TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. SCHEDULES (extends session_records)
-- ============================================================
CREATE TABLE IF NOT EXISTS schedules (
  id SERIAL PRIMARY KEY,
  student_package_id INTEGER NOT NULL REFERENCES student_packages(id) ON DELETE CASCADE,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled',  -- scheduled | confirmed | completed | cancelled
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Link schedule to session_record (attendance)
ALTER TABLE session_records ADD COLUMN IF NOT EXISTS schedule_id INTEGER REFERENCES schedules(id) ON DELETE SET NULL;

-- ============================================================
-- 3. MEETINGS (Zoom/Google Meet integration)
-- ============================================================
CREATE TABLE IF NOT EXISTS meetings (
  id SERIAL PRIMARY KEY,
  schedule_id INTEGER NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,
  provider TEXT NOT NULL DEFAULT 'none',  -- zoom | google_meet | none
  meeting_id TEXT,
  join_url TEXT NOT NULL,
  host_url TEXT,
  password TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_meetings_schedule_id ON meetings(schedule_id);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_schedules_student_package_id ON schedules(student_package_id);
CREATE INDEX IF NOT EXISTS idx_schedules_student_id ON schedules(student_id);
CREATE INDEX IF NOT EXISTS idx_schedules_teacher_id ON schedules(teacher_id);
CREATE INDEX IF NOT EXISTS idx_schedules_date ON schedules(date);
```

> **Catatan:** Tabel `modules`, `materials`, `homeworks`, `homework_submissions`, `homework_grades`, dan `student_module_progress` telah dihapus dari platform. Fitur homework, learning modules, dan materials sudah tidak ada.

### Entity Relationships

```
student_packages
  └── schedules (1:N)
       └── meetings (1:1)
       └── session_records (1:1, via schedule_id)

students
  └── schedules (1:N)

teachers
  └── schedules (1:N)
```

---

## 2. Folder Structure

```
src/
├── lib/
│   ├── modules/                    # Feature-module data & actions
│   │   ├── teachers/
│   │   │   ├── actions.js          # Server Actions (CRUD)
│   │   │   └── data.js            # Data access (cached reads)
│   │   ├── schedules/
│   │   │   ├── actions.js
│   │   │   └── data.js
│   │   ├── meetings/
│   │   │   ├── actions.js          # Zoom/Google Meet API calls
│   │   │   └── data.js
│   │   └── ... (existing db.js, session.js, etc.)
│
├── app/
│   ├── admin/(dashboard)/
│   │   ├── teachers/               # Admin: Manage teachers
│   │   │   ├── page.js
│   │   │   ├── TeacherForm.js
│   │   │   ├── new/page.js
│   │   │   └── [id]/page.js
│   │   ├── schedules/             # Admin: All schedules (calendar view)
│   │   │   ├── page.js
│   │   │   └── [id]/page.js
│   │
│   ├── student/(dashboard)/
│   │   ├── schedules/             # Student: My schedule
│   │   │   └── page.js
│   │
│   └── api/
│       └── meetings/create/route.js    # Create Zoom/Google Meet meeting
```

> **Catatan:** Fitur homeworks, modules, materials, dan progress sudah dihapus dari admin maupun student portal.

---

## 3. API Endpoints & Server Actions

### Server Actions (mutation, server-side)

| Feature | Action | Description |
|---------|--------|-------------|
| Teachers | `saveTeacher(formData)` | Create/update teacher |
| Teachers | `deleteTeacher(formData)` | Delete teacher |
| Schedules | `createSchedule(formData)` | Book a schedule |
| Schedules | `updateSchedule(id, data)` | Reschedule / change status |
| Schedules | `cancelSchedule(id)` | Cancel schedule |
| Meetings | `createMeeting(scheduleId, provider)` | Auto-generate Zoom/Meet link |

### REST API Routes (for external/integration)

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/meetings/create` | Create Zoom/Google Meet meeting (internal) |

---

## 4. Migration Plan (Step-by-Step)

### Phase 1: Foundation (Teachers & Schedules)
1. Create `teachers` table + seed data
2. Create `schedules` table + index
3. Add `schedule_id` to `session_records`
4. Build `src/lib/modules/teachers/` (actions + data)
5. Build admin CRUD for teachers (list, create, edit, delete)
6. Build `src/lib/modules/schedules/` (actions + data)
7. Build admin schedule management (calendar/grid view)
8. Build student schedule view

### Phase 2: Online Classes
9. Create `meetings` table
10. Build `src/lib/modules/meetings/` (Zoom/Google Meet API)
11. Add "Join Meeting" button to schedules
12. Auto-generate meeting link when schedule is confirmed

### Phase 3: Navigation & Polish
13. Add sidebar links for all new features (admin + student)
14. Add caching tags for new data functions
15. Add permissions checks for teachers vs admin
16. Testing & edge cases
