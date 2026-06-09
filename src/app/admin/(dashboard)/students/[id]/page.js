import { all, get } from '@/lib/db';
import Link from 'next/link';
import StudentForm from '../StudentForm';
import PackageForm from '../PackageForm';
import SessionForm from '../SessionForm';
import { updatePackageStatus } from '@/lib/actions';
import styles from '../../admin.module.css';

function getBadgeClass(status) {
  const map = {
    active: styles.badgeContacted,
    completed: styles.badgeConverted,
    expired: styles.badgeClosed,
    cancelled: styles.badgeClosed,
  };
  return map[status] || styles.badgeNew;
}

export default async function StudentDetailPage({ params }) {
  const { id } = await params;
  const student = await get('SELECT * FROM students WHERE id = $1', [id]);
  if (!student) return <div className={styles.emptyState}><h3>Student not found</h3></div>;

  const [packages, programs] = await Promise.all([
    all('SELECT * FROM student_packages WHERE student_id = $1 ORDER BY created_at DESC', [id]),
    all("SELECT id, title, duration FROM programs WHERE active = 1"),
  ]);

  let packagesWithSessions = packages;
  if (packages.length > 0) {
    const packageIds = packages.map(p => p.id);
    const placeholders = packageIds.map((_, i) => `$${i + 1}`).join(',');
    const allSessions = await all(
      `SELECT * FROM session_records WHERE student_package_id IN (${placeholders}) ORDER BY session_date DESC`,
      packageIds
    );
    const sessionsByPackage = {};
    for (const s of allSessions) {
      if (!sessionsByPackage[s.student_package_id]) sessionsByPackage[s.student_package_id] = [];
      sessionsByPackage[s.student_package_id].push(s);
    }
    packagesWithSessions = packages.map(pkg => ({
      ...pkg,
      sessions: sessionsByPackage[pkg.id] || [],
    }));
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{student.name}</h1>
          <p className={styles.pageSubtitle}>{student.email} {student.phone ? `• ${student.phone}` : ''}</p>
        </div>
        <Link href="/admin/students" className={styles.backBtn}>← Back</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        <StudentForm student={student} />
        <PackageForm studentId={id} programs={programs} />
      </div>

      <h2 className={styles.sectionHeading}>Packages</h2>

      {packagesWithSessions.length > 0 ? packagesWithSessions.map(pkg => (
        <div key={pkg.id} className={styles.formCard} style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{pkg.package_name}</h3>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--foreground-muted)' }}>
                Started {new Date(pkg.start_date).toLocaleDateString()}
                {pkg.end_date ? ` • Ends ${new Date(pkg.end_date).toLocaleDateString()}` : ''}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span className={`${styles.badge} ${getBadgeClass(pkg.status)}`}>{pkg.status}</span>
              <span style={{ fontSize: 24, fontWeight: 800, color: pkg.remaining_sessions <= 3 ? 'var(--danger-color)' : 'var(--primary-blue)' }}>
                {pkg.remaining_sessions}<span style={{ fontSize: 14, fontWeight: 400, color: 'var(--foreground-muted)' }}>/{pkg.total_sessions}</span>
              </span>
            </div>
          </div>

          <form action={async (formData) => {
            'use server';
            formData.set('id', pkg.id);
            formData.set('student_id', id);
            await updatePackageStatus(formData);
          }} style={{ display: 'flex', gap: 12, alignItems: 'flex-end', marginBottom: 16 }}>
            <div className={styles.formGroup} style={{ margin: 0, flex: 1 }}>
              <label className={styles.formLabel}>Remaining Sessions</label>
              <input name="remaining_sessions" type="number" className={styles.formInput} defaultValue={pkg.remaining_sessions} min={0} max={pkg.total_sessions} />
            </div>
            <div className={styles.formGroup} style={{ margin: 0, flex: 1 }}>
              <label className={styles.formLabel}>Status</label>
              <select name="status" className={styles.formSelect} defaultValue={pkg.status}>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button type="submit" className={styles.actionBtn}>Update</button>
          </form>

          {pkg.sessions.length > 0 && (
            <>
              <h4 style={{ margin: '0 0 12px', fontSize: 14, fontWeight: 600, color: 'var(--foreground-muted)' }}>Session History</h4>
              <div className={styles.tableWrapper}>
                <div className={styles.tableScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pkg.sessions.map(s => (
                        <tr key={s.id}>
                          <td>{new Date(s.session_date).toLocaleDateString()}</td>
                          <td>{s.notes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      )) : (
        <div className={styles.emptyState}>
          <h3>No packages assigned</h3>
          <p>Assign a package to this student to start tracking sessions.</p>
        </div>
      )}

      <SessionForm studentId={id} packages={packagesWithSessions} />
    </div>
  );
}
