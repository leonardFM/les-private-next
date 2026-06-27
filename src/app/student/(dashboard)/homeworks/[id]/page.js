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
        <h3 style={{ margin: '0 0 12px', fontSize: 'var(--text-base)', fontWeight: 700 }}>Description</h3>
        <p style={{ margin: 0, fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
          {homework.description || 'No description provided.'}
        </p>
        <div style={{ marginTop: 12, fontSize: 'var(--text-sm)', color: 'var(--foreground-muted)' }}>
          Max Score: <strong>{homework.max_score}</strong>
        </div>
      </div>

      {homework.submission_id ? (
        <div className={styles.card} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 'var(--text-base)', fontWeight: 700 }}>Your Submission</h3>
            {homework.score !== null ? (
              <span className={`${styles.badge} ${styles.badgeActive}`} style={{ fontSize: 14, padding: '6px 14px' }}>
                Score: {homework.score}/{homework.max_score}
              </span>
            ) : (
              <span className={`${styles.badge} ${styles.badgeNew}`} style={{ padding: '6px 14px' }}>Waiting for grade</span>
            )}
          </div>

          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--foreground-muted)', marginBottom: 12 }}>
            Submitted: {new Date(homework.submitted_at).toLocaleString()}
          </p>

          {homework.submission_content && (
            <div style={{ padding: 14, background: 'var(--bg-soft, #F5F9FF)', borderRadius: 8, marginBottom: 12, fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              {homework.submission_content}
            </div>
          )}

          {homework.submission_file_url && (
            <div style={{ marginBottom: 12 }}>
              <a href={homework.submission_file_url} target="_blank" rel="noopener noreferrer"
                className={`${styles.linkBtn} ${styles.linkBtnPrimary}`}>
                Download Attachment ↗
              </a>
            </div>
          )}

          {homework.feedback && (
            <div style={{ padding: 14, background: '#F0FDF4', borderRadius: 8, fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
              <strong>Teacher Feedback:</strong> {homework.feedback}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.card} style={{ maxWidth: 720 }}>
          <h3 style={{ margin: '0 0 20px', fontSize: 'var(--text-base)', fontWeight: 700 }}>Submit Your Work</h3>
          <form action={submitHomework}>
            <input type="hidden" name="homework_id" value={homework.id} />
            <input type="hidden" name="student_id" value={student.id} />

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Your Answer</label>
              <textarea name="content" rows={6} className={styles.formTextarea} placeholder="Write your answer here..." />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Attachment URL (optional)</label>
              <input type="text" name="file_url" className={styles.formInput} placeholder="/uploads/your-file.pdf" />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Submit Homework
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
