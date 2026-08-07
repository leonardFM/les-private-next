import { get, all } from '@/lib/db';
import Link from 'next/link';
import styles from './admin.module.css';

async function getStats() {
  const [
    counts,
    expiring,
    recentTeachers,
    upcomingSchedules,
  ] = await Promise.all([
    get(`
      SELECT
        (SELECT COUNT(*) FROM teachers)::int AS total_teachers,
        (SELECT COUNT(*) FROM programs)::int AS total_programs,
        (SELECT COUNT(*) FROM testimonials)::int AS total_testimonials,
        (SELECT COUNT(*) FROM faqs)::int AS total_faqs,
        (SELECT COUNT(*) FROM students)::int AS total_students,
        (SELECT COUNT(*) FROM student_packages WHERE status = 'active')::int AS active_packages
    `),
    all(`SELECT sp.*, s.name AS student_name FROM student_packages sp
      JOIN students s ON s.id = sp.student_id
      WHERE sp.status = 'active' AND sp.remaining_sessions <= 3
      ORDER BY sp.remaining_sessions ASC LIMIT 5`),
    all('SELECT * FROM teachers ORDER BY created_at DESC LIMIT 5'),
    all(`SELECT s.id, s.date, s.start_time, s.end_time, s.status, s.notes,
      st.name AS student_name, t.name AS teacher_name
      FROM schedules s
      JOIN students st ON st.id = s.student_id
      LEFT JOIN teachers t ON t.id = s.teacher_id
      WHERE s.date >= CURRENT_DATE AND s.date <= CURRENT_DATE + 6
      ORDER BY s.date, s.start_time LIMIT 6`),
  ]);

  return {
    totalTeachers: counts.total_teachers,
    totalPrograms: counts.total_programs,
    totalTestimonials: counts.total_testimonials,
    totalFaqs: counts.total_faqs,
    totalStudents: counts.total_students,
    activePackages: counts.active_packages,
    recentTeachers,
    expiringPackages: expiring,
    upcomingSchedules,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getStats();

  return (
    <div className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Overview of your English course website</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/admin/students/new" className={styles.addBtn}>+ Add Student</Link>
          <Link href="/admin/schedules/new" className={styles.addBtnOutline}>+ Schedule</Link>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statBlue}`}>
          <div className={styles.statIcon}>👨‍🎓</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{stats.totalStudents}</span>
            <span className={styles.statLabel}>Total Students</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statGreen}`}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{stats.activePackages}</span>
            <span className={styles.statLabel}>Active Packages</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statPurple}`}>
          <div className={styles.statIcon}>👩‍🏫</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{stats.totalTeachers}</span>
            <span className={styles.statLabel}>Teachers</span>
          </div>
        </div>
        
        <div className={`${styles.statCard} ${styles.statTeal}`}>
          <div className={styles.statIcon}>📅</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{stats.upcomingSchedules.length}</span>
            <span className={styles.statLabel}>Upcoming (7 days)</span>
          </div>
        </div>
      </div>

      <div className={styles.dashboardGrid}>
        <div className={styles.dashboardMain}>
          {stats.recentTeachers.length > 0 ? (
            <div className={styles.sectionCard}>
              <div className={styles.sectionCardHeader}>
                <h2 className={styles.sectionHeading}>Recent Teachers</h2>
                <Link href="/admin/teachers" className={styles.viewAll}>View All →</Link>
              </div>
              <div className={styles.tableWrapper}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Specialization</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentTeachers.map((teacher) => (
                        <tr key={teacher.id}>
                          <td><strong>{teacher.name}</strong></td>
                          <td className={styles.cellMuted}>{teacher.email}</td>
                          <td>{teacher.specialization || '-'}</td>
                          <td className={styles.cellMuted}>{new Date(teacher.created_at).toLocaleDateString()}</td>
                          <td>
                            <Link href={`/admin/teachers/${teacher.id}`} className={styles.actionBtn}>View</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.sectionCard}>
              <div className={styles.sectionCardHeader}>
                <h2 className={styles.sectionHeading}>Recent Teachers</h2>
              </div>
              <div className={styles.emptyState}>
                <h3>No teachers yet</h3>
                <p>Teachers will appear here once they are added.</p>
              </div>
            </div>
          )}

          {stats.expiringPackages.length > 0 && (
            <div className={styles.sectionCard}>
              <div className={styles.sectionCardHeader}>
                <h2 className={styles.sectionHeading}>
                  <span className={styles.alertDot} /> Packages Running Low
                </h2>
                <span className={styles.badgeCount}>{stats.expiringPackages.length} need attention</span>
              </div>
              <div className={styles.tableWrapper}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Package</th>
                        <th>Sessions Left</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.expiringPackages.map((pkg) => (
                        <tr key={pkg.id}>
                          <td><strong>{pkg.student_name}</strong></td>
                          <td>{pkg.package_name}</td>
                          <td>
                            <span className={`${styles.sessionCount} ${pkg.remaining_sessions <= 1 ? styles.sessionCritical : styles.sessionLow}`}>
                              {pkg.remaining_sessions}
                            </span>
                          </td>
                          <td>
                            <Link href={`/admin/students/${pkg.student_id}`} className={styles.actionBtn}>View</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.dashboardSide}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionCardHeader}>
              <h2 className={styles.sectionHeading}>Quick Actions</h2>
            </div>
            <div className={styles.quickActions}>
              <Link href="/admin/students/new" className={styles.quickActionItem}>
                <span className={styles.quickActionIcon}>👨‍🎓</span>
                <div>
                  <span className={styles.quickActionLabel}>Add Student</span>
                  <span className={styles.quickActionDesc}>Register new student</span>
                </div>
              </Link>
              <Link href="/admin/teachers/new" className={styles.quickActionItem}>
                <span className={styles.quickActionIcon}>👩‍🏫</span>
                <div>
                  <span className={styles.quickActionLabel}>Add Teacher</span>
                  <span className={styles.quickActionDesc}>Hire new teacher</span>
                </div>
              </Link>
              <Link href="/admin/schedules/new" className={styles.quickActionItem}>
                <span className={styles.quickActionIcon}>📅</span>
                <div>
                  <span className={styles.quickActionLabel}>Create Schedule</span>
                  <span className={styles.quickActionDesc}>Schedule a session</span>
                </div>
              </Link>
            </div>
          </div>

          {stats.upcomingSchedules.length > 0 && (
            <div className={styles.sectionCard}>
              <div className={styles.sectionCardHeader}>
                <h2 className={styles.sectionHeading}>Upcoming Schedule</h2>
                <Link href="/admin/schedules" className={styles.viewAll}>View All →</Link>
              </div>
              <div className={styles.scheduleList}>
                {stats.upcomingSchedules.map((s) => (
                  <Link href={`/admin/schedules/${s.id}`} key={s.id} className={styles.scheduleItem}>
                    <div className={styles.scheduleDate}>
                      <span className={styles.scheduleDay}>
                        {new Date(s.date).toLocaleDateString('en', { weekday: 'short' })}
                      </span>
                      <span className={styles.scheduleDateNum}>
                        {new Date(s.date).getDate()}
                      </span>
                    </div>
                    <div className={styles.scheduleInfo}>
                      <span className={styles.scheduleTitle}>{s.student_name}</span>
                      <span className={styles.scheduleMeta}>
                        {s.start_time?.slice(0, 5)} - {s.end_time?.slice(0, 5)}
                        {s.teacher_name ? ` · ${s.teacher_name}` : ''}
                      </span>
                    </div>
                    <span className={`${styles.scheduleStatus} ${styles[`scheduleStatus${s.status.charAt(0).toUpperCase() + s.status.slice(1)}`] || ''}`}>
                      {s.status}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className={styles.sectionCard}>
            <div className={styles.sectionCardHeader}>
              <h2 className={styles.sectionHeading}>At a Glance</h2>
            </div>
            <div className={styles.glanceGrid}>
              <div className={styles.glanceItem}>
                <span className={styles.glanceValue}>{stats.totalPrograms}</span>
                <span className={styles.glanceLabel}>Programs</span>
              </div>
              <div className={styles.glanceItem}>
                <span className={styles.glanceValue}>{stats.totalTestimonials}</span>
                <span className={styles.glanceLabel}>Testimonials</span>
              </div>
              <div className={styles.glanceItem}>
                <span className={styles.glanceValue}>{stats.totalFaqs}</span>
                <span className={styles.glanceLabel}>FAQs</span>
              </div>
              <div className={styles.glanceItem}>
                <span className={styles.glanceValue}>{stats.totalTeachers}</span>
                <span className={styles.glanceLabel}>Total Teachers</span>
              </div>
              <div className={styles.glanceItem}>
                <span className={styles.glanceValue}>{stats.activePackages}</span>
                <span className={styles.glanceLabel}>Active Packages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
