import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { get, all } from '@/lib/db';
import Link from 'next/link';
import styles from '../student.module.css';

export default async function StudentDashboardPage() {
  await initDb();
  const session = await verifyStudentSession();

  const student = await get('SELECT id FROM students WHERE user_id = $1', [session.id]);

  let stats = { packages: 0, activePackages: 0, sessions: 0, payments: 0 };
  if (student) {
    const rows = await all(`SELECT
      (SELECT COUNT(*) FROM student_packages WHERE student_id = $1) AS packages,
      (SELECT COUNT(*) FROM student_packages WHERE student_id = $1 AND status = 'active') AS active_packages,
      (SELECT COALESCE(SUM(remaining_sessions), 0) FROM student_packages WHERE student_id = $1 AND status = 'active') AS sessions,
      (SELECT COUNT(*) FROM payments WHERE user_id = $2) AS payments`,
      [student.id, session.id]
    );
    stats = rows[0] || stats;
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Welcome back, {session.name}</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.packages}</span>
          <span className={styles.statLabel}>Total Packages</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.activePackages}</span>
          <span className={styles.statLabel}>Active Packages</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.sessions}</span>
          <span className={styles.statLabel}>Remaining Sessions</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.payments}</span>
          <span className={styles.statLabel}>Payments</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <Link href="/student/packages" className={styles.card} style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
          <h3 style={{ margin: '0 0 8px', color: 'var(--foreground, #1F2937)' }}>Browse Packages</h3>
          <p style={{ margin: 0, color: 'var(--foreground-muted, #6B7280)', fontSize: 'var(--text-sm)' }}>
            Choose a learning package that suits your needs
          </p>
        </Link>
        <Link href="/student/my-packages" className={styles.card} style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}>
          <h3 style={{ margin: '0 0 8px', color: 'var(--foreground, #1F2937)' }}>My Packages</h3>
          <p style={{ margin: 0, color: 'var(--foreground-muted, #6B7280)', fontSize: 'var(--text-sm)' }}>
            View your active packages and remaining sessions
          </p>
        </Link>
      </div>
    </div>
  );
}
