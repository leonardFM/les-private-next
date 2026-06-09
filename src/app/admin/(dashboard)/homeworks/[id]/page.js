import { notFound } from 'next/navigation';
import { initDb, get } from '@/lib/db';
import { verifySession } from '@/lib/dal';
import { getHomeworkById, getSubmissionsByHomeworkId, getStudentPackagesForHomework, getModules } from '@/lib/modules/homeworks/data';
import { getTeachers } from '@/lib/modules/teachers/data';
import { gradeSubmission } from '@/lib/modules/homeworks/actions';
import HomeworkForm from '../HomeworkForm';
import AdminPageHeader from '@/app/admin/_components/AdminPageHeader';
import styles from '../../admin.module.css';

export default async function AdminHomeworkDetailPage({ params }) {
  await initDb();
  const { id } = await params;
  const session = await verifySession();

  const [homework, submissions, teachers, packages, modules] = await Promise.all([
    getHomeworkById(id),
    getSubmissionsByHomeworkId(id),
    getTeachers(),
    getStudentPackagesForHomework(),
    getModules(),
  ]);

  if (!homework) notFound();

  const adminUser = await get('SELECT id FROM users WHERE id = $1', [session.id]);

  return (
    <div>
      <HomeworkForm teachers={teachers} packages={packages} modules={modules} homework={homework} />

      <div style={{ marginTop: 32 }}>
        <AdminPageHeader title="Submissions" subtitle={`Student submissions for: ${homework.title}`} />

        {submissions.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No submissions yet</h3>
            <p>Student submissions will appear here once submitted.</p>
          </div>
        ) : (
          submissions.map(sub => (
            <div key={sub.id} className={styles.formCard} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 'var(--text-base)' }}>{sub.student_name}</h3>
                  <p style={{ margin: '4px 0 0', fontSize: 'var(--text-xs)', color: 'var(--foreground-muted)' }}>
                    Submitted: {new Date(sub.submitted_at).toLocaleString()}
                  </p>
                </div>
                {sub.score !== null ? (
                  <span className={styles.badge} style={{ background: '#D1FAE5', color: '#065F46', fontSize: 14 }}>
                    Score: {sub.score}/{homework.max_score}
                  </span>
                ) : (
                  <span className={styles.badge} style={{ background: '#FEF3C7', color: '#92400E' }}>Pending</span>
                )}
              </div>

              {sub.content && (
                <div style={{ padding: 12, background: 'var(--bg-soft, #F5F9FF)', borderRadius: 8, marginBottom: 12, fontSize: 'var(--text-sm)', whiteSpace: 'pre-wrap' }}>
                  {sub.content}
                </div>
              )}

              {sub.file_url && (
                <div style={{ marginBottom: 12 }}>
                  <a href={sub.file_url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>Download Attachment ↗</a>
                </div>
              )}

              <div style={{ borderTop: '1px solid var(--border-color, #E5E7EB)', paddingTop: 16, marginTop: 4 }}>
                <form action={gradeSubmission}>
                  <input type="hidden" name="submission_id" value={sub.id} />
                  <input type="hidden" name="homework_id" value={homework.id} />
                  <input type="hidden" name="teacher_id" value={adminUser?.id || ''} />
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Score (max {homework.max_score})</label>
                      <input type="number" name="score" className={styles.formInput} defaultValue={sub.score || ''} min="0" max={homework.max_score} required />
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Feedback</label>
                      <input type="text" name="feedback" className={styles.formInput} defaultValue={sub.feedback || ''} placeholder="Optional feedback" />
                    </div>
                  </div>
                  <button type="submit" className={styles.submitBtn}>{sub.score !== null ? 'Update Grade' : 'Submit Grade'}</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
