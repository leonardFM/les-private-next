import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { getStudentPackages } from '@/lib/data';
import styles from '../student.module.css';

const STATUS_BADGES = {
  active: styles.badgeActive,
  completed: styles.badgeCompleted,
  cancelled: styles.badgeCancelled,
};

export default async function MyPackagesPage() {
  await initDb();
  const session = await verifyStudentSession();
  const packages = await getStudentPackages(session.id);

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Packages</h1>
          <p className={styles.pageSubtitle}>Your purchased learning packages</p>
        </div>
      </div>

      {packages.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No packages yet</h3>
          <p>Purchase a package to get started with your learning journey.</p>
        </div>
      ) : (
        <div className={styles.card} style={{ padding: 0, overflow: 'hidden' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Package</th>
                <th>Total Sessions</th>
                <th>Remaining</th>
                <th>Status</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {packages.map(pkg => (
                <tr key={pkg.id}>
                  <td style={{ fontWeight: 600 }}>{pkg.package_name}</td>
                  <td>{pkg.total_sessions}</td>
                  <td>{pkg.remaining_sessions}</td>
                  <td>
                    <span className={`${styles.badge} ${STATUS_BADGES[pkg.status] || ''}`}>
                      {pkg.status}
                    </span>
                  </td>
                  <td>{pkg.start_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
