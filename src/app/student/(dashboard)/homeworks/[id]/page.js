import { notFound } from 'next/navigation';
import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { get } from '@/lib/db';
import { getStudentHomeworkById } from '@/lib/modules/homeworks/data';
import { submitHomework } from '@/lib/modules/homeworks/actions';
import styles from '../../student.module.css';

export default async function StudentHomeworkDetailPage({ params }) {
  await initDb();
  const { id } = await params;
  const session = await verifyStudentSession();

  const student = await get('SELECT id FROM students WHERE user_id = $1', [session.id]);
  if (!student) notFound();

  const homework = await getStudentHomeworkById(id, student.id);
  if (!homework) notFound();

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>{homework.title}</h1>
          <p className={styles.pageSubtitle}>
            {homework.package_name} {homework.due_date ? `• Due: ${new Date(homework.due_date).toLocaleDateString()}` : ''}
            {homework.module_title ? ` • Module: ${homework.module_title}` : ''}
          </p>
        </div>
      </div>

      <div className={styles.card} style={{ marginBottom: 16 }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 'var(--text-base)' }}>Description</h3>
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {homework.description || 'No description provided.'}
        </p>
        <div style={{ marginTop: 12, fontSize: 'var(--text-sm)', color: 'var(--foreground-muted)' }}>
          Max Score: <strong>{homework.max_score}</strong>
        </div>
      </div>

      {homework.submission_id ? (
        <div className={styles.card} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 'var(--text-base)' }}>Your Submission</h3>
            {homework.score !== null ? (
              <span className={`${styles.badge} ${styles.badgeActive}`} style={{ fontSize: 14 }}>
                Score: {homework.score}/{homework.max_score}
              </span>
            ) : (
              <span className={`${styles.badge} ${styles.badgeNew}`}>Waiting for grade</span>
            )}
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground-muted)', marginBottom: 8 }}>
            Submitted: {new Date(homework.submitted_at).toLocaleString()}
          </p>

          {homework.submission_content && (
            <div style={{ padding: 12, background: 'var(--bg-soft, #F5F9FF)', borderRadius: 8, marginBottom: 12, fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap' }}>
              {homework.submission_content}
            </div>
          )}

          {homework.submission_file_url && (
            <div style={{ marginBottom: 12 }}>
              <a href={homework.submission_file_url} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', padding: '8px 16px', background: 'var(--primary-blue, #004AAD)', color: '#fff', borderRadius: 6, fontSize: 'var(--text-sm)', fontWeight: 600, textDecoration: 'none' }}>
                Download Attachment ↗
              </a>
            </div>
          )}

          {homework.feedback && (
            <div style={{ padding: 12, background: '#F0FDF4', borderRadius: 8, fontSize: 'var(--text-sm)' }}>
              <strong>Teacher Feedback:</strong> {homework.feedback}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.card}>
          <h3 style={{ margin: '0 0 16px', fontSize: 'var(--text-base)' }}>Submit Your Work</h3>
          <form action={submitHomework}>
            <input type="hidden" name="homework_id" value={homework.id} />
            <input type="hidden" name="student_id" value={student.id} />

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 'var(--text-sm)' }}>Your Answer</label>
              <textarea name="content" rows={6}
                style={{
                  width: '100%', padding: 12, border: '1px solid var(--border-color, #E5E7EB)',
                  borderRadius: 8, fontSize: 'var(--text-sm)', resize: 'vertical', boxSizing: 'border-box',
                }}
                placeholder="Write your answer here..." />
            </div>

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 6, fontWeight: 600, fontSize: 'var(--text-sm)' }}>Attachment URL (optional)</label>
              <input type="text" name="file_url"
                style={{
                  width: '100%', padding: 12, border: '1px solid var(--border-color, #E5E7EB)',
                  borderRadius: 8, fontSize: 'var(--text-sm)', boxSizing: 'border-box',
                }}
                placeholder="/uploads/your-file.pdf" />
            </div>

            <button type="submit"
              style={{
                padding: '12px 24px', background: 'var(--primary-blue, #004AAD)', color: '#fff',
                border: 'none', borderRadius: 8, fontSize: 'var(--text-sm)', fontWeight: 600, cursor: 'pointer',
              }}>
              Submit Homework
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
