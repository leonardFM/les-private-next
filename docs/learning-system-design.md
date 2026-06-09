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
-- 4. MODULES (learning units within a package)
-- ============================================================
CREATE TABLE IF NOT EXISTS modules (
  id SERIAL PRIMARY KEY,
  package_id INTEGER NOT NULL REFERENCES packages(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. MATERIALS (files, videos, links within a module)
-- ============================================================
CREATE TABLE IF NOT EXISTS materials (
  id SERIAL PRIMARY KEY,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'text',  -- pdf | video | link | text | document
  content TEXT,
  file_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. HOMEWORKS (assignments)
-- ============================================================
CREATE TABLE IF NOT EXISTS homeworks (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES modules(id) ON DELETE SET NULL,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
  student_package_id INTEGER NOT NULL REFERENCES student_packages(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  max_score INTEGER DEFAULT 100,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. HOMEWORK SUBMISSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS homework_submissions (
  id SERIAL PRIMARY KEY,
  homework_id INTEGER NOT NULL REFERENCES homeworks(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  content TEXT,
  file_url TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 8. HOMEWORK GRADES
-- ============================================================
CREATE TABLE IF NOT EXISTS homework_grades (
  id SERIAL PRIMARY KEY,
  homework_submission_id INTEGER NOT NULL REFERENCES homework_submissions(id) ON DELETE CASCADE,
  teacher_id INTEGER REFERENCES teachers(id) ON DELETE SET NULL,
  score INTEGER NOT NULL,
  feedback TEXT,
  graded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_homework_grades_submission_id ON homework_grades(homework_submission_id);

-- ============================================================
-- 9. STUDENT MODULE PROGRESS
-- ============================================================
CREATE TABLE IF NOT EXISTS student_module_progress (
  id SERIAL PRIMARY KEY,
  student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'not_started',  -- not_started | in_progress | completed
  completed_at TIMESTAMPTZ,
  UNIQUE(student_id, module_id)
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_schedules_student_package_id ON schedules(student_package_id);
CREATE INDEX IF NOT EXISTS idx_schedules_student_id ON schedules(student_id);
CREATE INDEX IF NOT EXISTS idx_schedules_teacher_id ON schedules(teacher_id);
CREATE INDEX IF NOT EXISTS idx_schedules_date ON schedules(date);
CREATE INDEX IF NOT EXISTS idx_modules_package_id ON modules(package_id);
CREATE INDEX IF NOT EXISTS idx_materials_module_id ON materials(module_id);
CREATE INDEX IF NOT EXISTS idx_homeworks_student_package_id ON homeworks(student_package_id);
CREATE INDEX IF NOT EXISTS idx_homework_submissions_homework_id ON homework_submissions(homework_id);
CREATE INDEX IF NOT EXISTS idx_homework_submissions_student_id ON homework_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_student_module_progress_student_id ON student_module_progress(student_id);
```

### Entity Relationships

```
packages
  └── modules (1:N)
       └── materials (1:N)

student_packages
  ├── schedules (1:N)
  │    └── meetings (1:1)
  │    └── session_records (1:1, via schedule_id)
  ├── homeworks (1:N)
  │    └── homework_submissions (1:N)
  │         └── homework_grades (1:1)

students
  ├── schedules (1:N)
  ├── homework_submissions (1:N)
  └── student_module_progress (1:N)
       └── modules (N:N via SMP)

teachers
  ├── schedules (1:N)
  ├── homeworks (1:N)
  └── homework_grades (1:N)
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
│   │   ├── modules/               # Learning modules + materials
│   │   │   ├── actions.js
│   │   │   └── data.js
│   │   ├── homeworks/
│   │   │   ├── actions.js
│   │   │   └── data.js
│   │   └── progress/
│   │       ├── actions.js
│   │       └── data.js
│   └── ... (existing db.js, session.js, etc.)
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
│   │   ├── modules/               # Admin: Manage modules per package
│   │   │   ├── page.js
│   │   │   ├── ModuleForm.js
│   │   │   ├── new/page.js
│   │   │   └── [id]/page.js
│   │   ├── materials/             # Admin: Manage materials
│   │   │   ├── page.js
│   │   │   ├── MaterialForm.js
│   │   │   ├── new/page.js
│   │   │   └── [id]/page.js
│   │   └── homeworks/            # Admin: Manage assignments
│   │       ├── page.js
│   │       ├── HomeworkForm.js
│   │       ├── new/page.js
│   │       ├── [id]/page.js
│   │       └── grade/[submissionId]/page.js
│   │
│   ├── student/(dashboard)/
│   │   ├── schedules/             # Student: My schedule
│   │   │   └── page.js
│   │   ├── materials/             # Student: Learning materials
│   │   │   └── page.js
│   │   ├── homeworks/            # Student: Homework list + submit
│   │   │   ├── page.js
│   │   │   └── [id]/page.js
│   │   └── progress/             # Student: Progress report
│   │       └── page.js
│   │
│   └── api/
│       ├── meetings/create/route.js    # Create Zoom/Google Meet meeting
│       └── upload/route.js             # File upload (materials, submissions)
```

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
| Modules | `saveModule(formData)` | Create/update module |
| Modules | `deleteModule(formData)` | Delete module |
| Materials | `saveMaterial(formData)` | Upload/create material |
| Materials | `deleteMaterial(formData)` | Delete material |
| Homeworks | `saveHomework(formData)` | Create/update homework |
| Homeworks | `deleteHomework(formData)` | Delete homework |
| Homeworks | `submitHomework(formData)` | Student submit homework |
| Homeworks | `gradeSubmission(submissionId, score, feedback)` | Teacher grade |
| Progress | `updateModuleProgress(studentId, moduleId, status)` | Mark module progress |

### REST API Routes (for external/integration)

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/meetings/create` | Create Zoom/Google Meet meeting (internal) |
| POST | `/api/upload` | Upload file (material, submission) |

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

### Phase 3: Materials & Modules
13. Create `modules` + `materials` tables
14. Build `src/lib/modules/modules/` (actions + data)
15. Build admin CRUD for modules (per package)
16. Build admin CRUD for materials (per module)
17. Build file upload endpoint `/api/upload`
18. Build student materials view

### Phase 4: Homework System
19. Create `homeworks` + `homework_submissions` + `homework_grades` tables
20. Build `src/lib/modules/homeworks/` (actions + data)
21. Build admin homework CRUD
22. Build student homework list + submission form
23. Build admin grading interface

### Phase 5: Progress Tracking
24. Create `student_module_progress` table
25. Build `src/lib/modules/progress/` (actions + data)
26. Auto-track progress (mark module as completed when materials viewed)
27. Build student progress dashboard
28. Build admin progress overview

### Phase 6: Navigation & Polish
29. Add sidebar links for all new features (admin + student)
30. Add caching tags for new data functions
31. Add permissions checks for teachers vs admin
32. Testing & edge cases
