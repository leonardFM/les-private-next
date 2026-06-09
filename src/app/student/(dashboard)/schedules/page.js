import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { getSchedules } from '@/lib/modules/schedules/data';
import { getMeetingsByScheduleIds } from '@/lib/modules/meetings/data';
import { get } from '@/lib/db';
import styles from '../student.module.css';

const STATUS_BADGES = {
  scheduled: styles.badgeNew,
  confirmed: styles.badgeActive,
  completed: styles.badgeCompleted,
  cancelled: styles.badgeCancelled,
};

export default async function StudentSchedulesPage() {
  await initDb();
  const session = await verifyStudentSession();

  const student = await get('SELECT id FROM students WHERE user_id = $1', [session.id]);
  const schedules = student
    ? await getSchedules({ studentId: student.id })
    : [];

  const scheduleIds = schedules.map(s => s.id);
  const meetings = await getMeetingsByScheduleIds(scheduleIds);

  const grouped = {};
  for (const s of schedules) {
    const date = s.date;
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(s);
  }

  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Schedule</h1>
          <p className={styles.pageSubtitle}>Your upcoming and past class schedules</p>
        </div>
      </div>

      {schedules.length === 0 ? (
        <div className={styles.emptyState}>
          <h3>No schedules yet</h3>
          <p>Your class schedules will appear here once they are assigned.</p>
        </div>
      ) : (
        sortedDates.map(date => (
          <div key={date} className={styles.card} style={{ marginBottom: 16 }}>
            <div style={{ padding: '12px 16px', background: 'var(--bg-soft, #F5F9FF)', fontWeight: 700, fontSize: 'var(--text-sm)', borderBottom: '1px solid var(--border-color, #E5E7EB)' }}>
              {new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div style={{ padding: 0, overflow: 'hidden' }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Teacher</th>
                    <th>Package</th>
                    <th>Meeting</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {grouped[date].map(s => {
                    const meeting = meetings[s.id];
                    return (
                      <tr key={s.id}>
                        <td style={{ fontWeight: 600 }}>{s.start_time?.slice(0, 5)} - {s.end_time?.slice(0, 5)}</td>
                        <td>{s.teacher_name || 'Unassigned'}</td>
                        <td>{s.package_name || '-'}</td>
                        <td>
                          {meeting ? (
                            <a href={meeting.join_url} target="_blank" rel="noopener noreferrer"
                              style={{
                                display: 'inline-block',
                                padding: '4px 12px',
                                background: '#065F46',
                                color: '#fff',
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600,
                                textDecoration: 'none',
                              }}>
                              Join ↗
                            </a>
                          ) : (
                            <span style={{ color: 'var(--foreground-muted)', fontSize: 12 }}>-</span>
                          )}
                        </td>
                        <td>
                          <span className={`${styles.badge} ${STATUS_BADGES[s.status] || styles.badgeNew}`}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
