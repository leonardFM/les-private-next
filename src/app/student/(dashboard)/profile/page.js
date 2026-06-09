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

      <div className={styles.card} style={{ maxWidth: 600 }}>
        <table className={styles.table} style={{ minWidth: 'auto' }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: 600, width: 140, padding: '12px 20px' }}>Name</td>
              <td style={{ padding: '12px 20px' }}>{profile.name}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, width: 140, padding: '12px 20px' }}>Email</td>
              <td style={{ padding: '12px 20px' }}>{profile.email}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, width: 140, padding: '12px 20px' }}>Phone</td>
              <td style={{ padding: '12px 20px' }}>{profile.phone || '-'}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, width: 140, padding: '12px 20px' }}>Member Since</td>
              <td style={{ padding: '12px 20px' }}>{new Date(profile.created_at).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
