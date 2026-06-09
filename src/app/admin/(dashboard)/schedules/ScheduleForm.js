import { createSchedule, updateScheduleStatus, deleteSchedule } from '@/lib/modules/schedules/actions';
import { createMeeting, removeMeeting } from '@/lib/modules/meetings/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import FormActions from '../_components/FormActions';
import DeleteForm from '../_components/DeleteForm';
import styles from '../admin.module.css';

export default function ScheduleForm({ teachers, packages, schedule, meeting }) {
  const isEdit = !!schedule;

  return (
    <div>
      <AdminPageHeader
        title={isEdit ? 'Schedule Detail' : 'New Schedule'}
        subtitle={isEdit ? `View and manage schedule` : 'Create a new class schedule'}
      />

      <div className={styles.formCard}>
        <form action={createSchedule}>
          {isEdit && <input type="hidden" name="id" value={schedule.id} />}

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Student Package *</label>
            <select name="student_package_id" className={styles.formSelect} defaultValue={schedule?.student_package_id || ''} required>
              <option value="">Select a package...</option>
              {packages.map(p => (
                <option key={p.id} value={p.id}>{p.student_name} - {p.package_name}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Teacher</label>
            <select name="teacher_id" className={styles.formSelect} defaultValue={schedule?.teacher_id || ''}>
              <option value="">Select a teacher...</option>
              {teachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Date *</label>
              <input type="date" name="date" className={styles.formInput} defaultValue={schedule?.date || ''} required />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Start Time *</label>
              <input type="time" name="start_time" className={styles.formInput} defaultValue={schedule?.start_time || ''} required />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>End Time *</label>
              <input type="time" name="end_time" className={styles.formInput} defaultValue={schedule?.end_time || ''} required />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Notes</label>
            <textarea name="notes" className={styles.formTextarea} defaultValue={schedule?.notes || ''} rows={3} />
          </div>

          <FormActions cancelHref="/admin/schedules" submitLabel={isEdit ? 'Update' : 'Create Schedule'} />
        </form>
      </div>

      {isEdit && (
        <>
          <div className={styles.formCard} style={{ marginTop: 24 }}>
            <h3 style={{ margin: '0 0 16px' }}>Online Meeting</h3>

            {meeting ? (
              <div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Provider</label>
                  <p style={{ margin: 0, fontWeight: 600 }}>{meeting.provider === 'google_meet' ? 'Google Meet' : meeting.provider === 'zoom' ? 'Zoom' : meeting.provider}</p>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Join URL</label>
                  <p style={{ margin: 0 }}>
                    <a href={meeting.join_url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} style={{ display: 'inline-block' }}>
                      Join Meeting ↗
                    </a>
                  </p>
                </div>
                {meeting.host_url && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Host URL</label>
                    <p style={{ margin: 0 }}>
                      <a href={meeting.host_url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn} style={{ display: 'inline-block' }}>
                        Start Meeting (Host) ↗
                      </a>
                    </p>
                  </div>
                )}
                {meeting.password && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Password</label>
                    <p style={{ margin: 0 }}>{meeting.password}</p>
                  </div>
                )}
                <div style={{ marginTop: 12 }}>
                  <form action={removeMeeting}>
                    <input type="hidden" name="id" value={meeting.id} />
                    <input type="hidden" name="schedule_id" value={schedule.id} />
                    <button type="submit" className={`${styles.actionBtn} ${styles.actionDanger}`}>Remove Meeting Link</button>
                  </form>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ color: 'var(--foreground-muted)', marginBottom: 16 }}>No meeting link created yet.</p>
                <form action={createMeeting}>
                  <input type="hidden" name="schedule_id" value={schedule.id} />
                  <div className={styles.formRow}>
                    <select name="provider" className={styles.formSelect} style={{ marginBottom: 0 }} required>
                      <option value="google_meet">Google Meet</option>
                      <option value="zoom">Zoom</option>
                    </select>
                    <button type="submit" className={styles.submitBtn}>Generate Meeting Link</button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {schedule.status !== 'completed' && schedule.status !== 'cancelled' && (
            <div className={styles.formCard} style={{ marginTop: 24 }}>
              <h3 style={{ margin: '0 0 16px' }}>Update Status</h3>
              <form action={updateScheduleStatus}>
                <input type="hidden" name="id" value={schedule.id} />
                <div className={styles.formRow}>
                  {schedule.status === 'scheduled' && (
                    <button type="submit" name="status" value="confirmed" className={styles.submitBtn} style={{ background: '#065F46' }}>Confirm & Generate Meeting</button>
                  )}
                  <button type="submit" name="status" value="completed" className={styles.submitBtn}>Mark Completed</button>
                  <button type="submit" name="status" value="cancelled" className={styles.submitBtn} style={{ background: '#991B1B' }}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          <div className={styles.formCard} style={{ marginTop: 24 }}>
            <DeleteForm action={deleteSchedule} id={schedule.id} redirectHref="/admin/schedules">
              <button type="submit" className={`${styles.actionBtn} ${styles.actionDanger}`}>Delete Schedule</button>
            </DeleteForm>
          </div>
        </>
      )}
    </div>
  );
}
