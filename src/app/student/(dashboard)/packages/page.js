import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { get } from '@/lib/db';
import { getPackages } from '@/lib/data';
import PackageCard from './PackageCard';
import styles from '../student.module.css';

export default async function PackagesPage() {
  await initDb();
  const session = await verifyStudentSession();
  const packages = await getPackages();

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Available Packages</h1>
          <p className={styles.pageSubtitle}>Choose a package to purchase</p>
        </div>
      </div>

      {packages.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No packages available</h3>
          <p>Check back later for available packages.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
          {packages.map(pkg => (
            <PackageCard key={pkg.id} pkg={pkg} userId={session.id} />
          ))}
        </div>
      )}
    </div>
  );
}
