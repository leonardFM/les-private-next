import Link from 'next/link';
import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { get } from '@/lib/db';
import { getStudentHomeworks } from '@/lib/modules/homeworks/data';
import styles from '../student.module.css';

export default async function StudentHomeworksPage() {
  await initDb();
  const session = await verifyStudentSession();

  const student = await get('SELECT id FROM students WHERE user_id = $1', [session.id]);
  const homeworks = student ? await getStudentHomeworks(student.id) : [];

  const statusLabel = (h) => {
    if (h.score !== null) return { text: `Graded: ${h.score}`, cls: styles.badgeActive };
    if (h.submission_id) return { text: 'Submitted', cls: styles.badgeNew };
    return { text: 'Pending', cls: styles.badgeCancelled };
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Homework</h1>
          <p className={styles.pageSubtitle}>View and submit your assignments</p>
        </div>
      </div>

      {homeworks.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No homework yet</h3>
          <p>Your assignments will appear here once they are created.</p>
        </div>
      ) : (
        homeworks.map(h => {
          const status = statusLabel(h);
          return (
            <Link key={h.id} href={`/student/homeworks/${h.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div className={styles.card} style={{ marginBottom: 12, cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 700 }}>{h.title}</h3>
                    <p style={{ margin: '4px 0 0', fontSize: 'var(--text-xs)', color: 'var(--foreground-muted)' }}>
                      {h.module_title || 'General'} {h.due_date ? `• Due: ${new Date(h.due_date).toLocaleDateString()}` : ''}
                    </p>
                  </div>
                  <span className={`${styles.badge} ${status.cls}`}>{status.text}</span>
                </div>
                {h.description && (
                  <p style={{ margin: '8px 0 0', fontSize: 'var(--text-sm)', color: 'var(--foreground-muted)' }}>
                    {h.description.length > 100 ? h.description.substring(0, 100) + '...' : h.description}
                  </p>
                )}
                {h.feedback && (
                  <div style={{ marginTop: 8, padding: 8, background: '#F5F9FF', borderRadius: 6, fontSize: 'var(--text-xs)' }}>
                    <strong>Feedback:</strong> {h.feedback}
                  </div>
                )}
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
