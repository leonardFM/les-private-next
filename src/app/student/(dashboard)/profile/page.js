import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { getStudentProfile } from '@/lib/data';
import styles from '../student.module.css';

export default async function ProfilePage() {
  await initDb();
  const session = await verifyStudentSession();
  const profile = await getStudentProfile(session.id);

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Profile</h1>
          <p className={styles.pageSubtitle}>Your account information</p>
        </div>
      </div>

      <div className={styles.infoCard}>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Name</span>
          <span className={styles.infoValue}>{profile.name}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Email</span>
          <span className={styles.infoValue}>{profile.email}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Phone</span>
          <span className={styles.infoValue}>{profile.phone || '-'}</span>
        </div>
        <div className={styles.infoRow}>
          <span className={styles.infoLabel}>Member Since</span>
          <span className={styles.infoValue}>{new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>
    </div>
  );
}
