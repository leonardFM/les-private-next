import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { get, all } from '@/lib/db';
import Link from 'next/link';
import styles from './dashboard.module.css';

export default async function StudentDashboardPage() {
  await initDb();
  const session = await verifyStudentSession();

  const student = await get('SELECT id, name, email, phone, created_at FROM students WHERE user_id = $1', [session.id]);

  let nextSession = null;
  let assignedTutor = null;
  let activePackage = null;
  let totalSessions = 0;
  let completedSessions = 0;
  let attendanceRate = 0;
  let upcomingSessions = [];
  let recentCompleted = [];
  let recentHomework = [];
  let unreadFeedback = 0;
  let recentMaterials = [];

  if (student) {
    const rows = await all(`SELECT
      (SELECT COUNT(*) FROM session_records WHERE student_id = $1) AS total_sessions,
      (SELECT COUNT(*) FROM session_records WHERE student_id = $1 AND status = 'completed') AS completed_sessions,
      (SELECT COUNT(*) FROM session_records WHERE student_id = $1 AND status = 'attended') AS attended_sessions`,
      [student.id]
    );
    totalSessions = rows[0]?.total_sessions || 0;
    completedSessions = rows[0]?.completed_sessions || 0;
    const attendedSessions = rows[0]?.attended_sessions || 0;
    attendanceRate = completedSessions > 0 ? Math.round((attendedSessions / completedSessions) * 100) : 0;

    activePackage = await get(`SELECT sp.*, p.name AS package_name,
      (SELECT COUNT(*) FROM session_records sr WHERE sr.student_package_id = sp.id AND sr.status = 'completed') AS used_sessions
      FROM student_packages sp
      LEFT JOIN packages p ON p.id = sp.package_id
      WHERE sp.student_id = $1 AND sp.status = 'active'
      ORDER BY sp.created_at DESC LIMIT 1`, [student.id]);

    nextSession = await get(`SELECT s.*, t.name AS teacher_name, t.initials AS teacher_initials,
      sp.package_name FROM schedules s
      LEFT JOIN teachers t ON t.id = s.teacher_id
      LEFT JOIN student_packages sp ON sp.id = s.student_package_id
      WHERE s.student_id = $1 AND s.date >= CURRENT_DATE AND s.status != 'cancelled'
      ORDER BY s.date ASC, s.start_time ASC LIMIT 1`, [student.id]);

    assignedTutor = activePackage ? await get(`SELECT t.* FROM teachers t
      JOIN schedules s ON s.teacher_id = t.id
      WHERE s.student_id = $1
      ORDER BY s.created_at DESC LIMIT 1`, [student.id]) : null;

    upcomingSessions = await all(`SELECT s.*, t.name AS teacher_name,
      sp.package_name FROM schedules s
      LEFT JOIN teachers t ON t.id = s.teacher_id
      LEFT JOIN student_packages sp ON sp.id = s.student_package_id
      WHERE s.student_id = $1 AND s.date > CURRENT_DATE AND s.status != 'cancelled'
      ORDER BY s.date ASC, s.start_time ASC LIMIT 5`, [student.id]);

    recentCompleted = await all(`SELECT s.*, t.name AS teacher_name,
      sp.package_name FROM schedules s
      LEFT JOIN teachers t ON t.id = s.teacher_id
      LEFT JOIN student_packages sp ON sp.id = s.student_package_id
      WHERE s.student_id = $1 AND s.status = 'completed'
      ORDER BY s.date DESC, s.start_time DESC LIMIT 3`, [student.id]);

    recentHomework = await all(`SELECT hw.*, hw.title, hw.due_date, hw.status
      FROM homeworks hw
      JOIN modules m ON m.id = hw.module_id
      JOIN student_packages sp ON sp.id = m.student_package_id
      WHERE sp.student_id = $1
      ORDER BY hw.due_date ASC LIMIT 3`, [student.id]);

    recentMaterials = await all(`SELECT m.title, m.type, m.created_at
      FROM materials m
      JOIN modules mod ON mod.id = m.module_id
      JOIN student_packages sp ON sp.id = mod.student_package_id
      WHERE sp.student_id = $1
      ORDER BY m.created_at DESC LIMIT 3`, [student.id]);
  }

  const isNewStudent = !activePackage;
  const memberSince = student?.created_at
    ? new Date(student.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    : '';

  function formatDate(date) {
    const d = date instanceof Date ? date : new Date(String(date).slice(0, 10) + 'T00:00:00');
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function formatTime(time) {
    return String(time).slice(0, 5);
  }

  return (
    <div className={styles.page}>
      {/* Next Session Hero Card */}
      {nextSession ? (
        <section className={styles.nextSessionHero}>
          <div className={styles.nextSessionGlow} />
          <div className={styles.nextSessionContent}>
            <span className={styles.nextSessionLabel}>Next Private Session</span>
            <h2 className={styles.nextSessionTitle}>{nextSession.package_name || 'Private Tutoring'}</h2>
            <div className={styles.nextSessionMeta}>
              <span className={styles.nextSessionMetaItem}>
                📅 {formatDate(nextSession.date)}
              </span>
              <span className={styles.nextSessionMetaItem}>
                ⏰ {formatTime(nextSession.start_time)} - {formatTime(nextSession.end_time)}
              </span>
              <span className={styles.nextSessionMetaItem}>
                👨‍🏫 {nextSession.teacher_name || 'Tutor assigned'}
              </span>
            </div>
            <div className={styles.nextSessionActions}>
              <Link href="/student/schedules" className="btn btn-accent btn-sm" style={{ padding: '10px 24px', fontSize: '14px' }}>
                View Schedule
              </Link>
              <Link href={`/student/materials`} className="btn btn-sm" style={{ padding: '10px 24px', fontSize: '14px', background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 'var(--border-radius-md)' }}>
                Prepare Materials
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className={styles.nextSessionHero}>
          <div className={styles.nextSessionGlow} />
          <div className={styles.nextSessionContent}>
            <span className={styles.nextSessionLabel}>Welcome to Private Tutoring</span>
            <h2 className={styles.nextSessionTitle}>Start Your Learning Journey</h2>
            <p className={styles.nextSessionDesc}>Book your first private 1-on-1 session and get matched with a dedicated tutor.</p>
            <div className={styles.nextSessionActions}>
              <Link href="/student/packages" className="btn btn-accent btn-sm" style={{ padding: '10px 24px', fontSize: '14px' }}>
                Browse Packages
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Stats Cards */}
      <div className={styles.statsRow}>
        <div className={`${styles.statCard} ${styles.statBlue}`}>
          <div className={styles.statIcon}>📚</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{activePackage ? `${activePackage.used_sessions || 0}/${activePackage.remaining_sessions || 0}` : '0'}</span>
            <span className={styles.statLabel}>Sessions Completed</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statGreen}`}>
          <div className={styles.statIcon}>🎯</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{totalSessions}</span>
            <span className={styles.statLabel}>Total Sessions</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statPurple}`}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{attendanceRate}%</span>
            <span className={styles.statLabel}>Attendance Rate</span>
          </div>
        </div>
        <div className={`${styles.statCard} ${styles.statOrange}`}>
          <div className={styles.statIcon}>🏆</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{activePackage?.package_name ? 'Active' : '—'}</span>
            <span className={styles.statLabel}>Package Status</span>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.gridMain}>
          {/* Active Package / Tutor */}
          {assignedTutor && (
            <section className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Your Tutor</h2>
              </div>
              <div className={styles.tutorCard}>
                <div className={styles.tutorAvatar}>
                  {assignedTutor.initials || assignedTutor.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div className={styles.tutorInfo}>
                  <span className={styles.tutorName}>{assignedTutor.name}</span>
                  <span className={styles.tutorRole}>{assignedTutor.specialization || 'Private Tutor'}</span>
                  {assignedTutor.bio && <p className={styles.tutorBio}>{assignedTutor.bio}</p>}
                </div>
              </div>
            </section>
          )}

          {/* Upcoming Sessions */}
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Upcoming Private Sessions</h2>
              <Link href="/student/schedules" className={styles.viewAll}>View All →</Link>
            </div>
            <div className={styles.sectionBody}>
              {upcomingSessions.length > 0 ? upcomingSessions.map(s => {
                const dateObj = s.date instanceof Date ? s.date : new Date(String(s.date).slice(0, 10) + 'T00:00:00');
                return (
                  <div key={s.id} className={styles.activityItem}>
                    <div className={styles.activityDate}>
                      <span className={styles.activityDay}>{dateObj.toLocaleDateString('en', { weekday: 'short' })}</span>
                      <span className={styles.activityDateNum}>{dateObj.getDate()}</span>
                    </div>
                    <div className={styles.activityInfo}>
                      <span className={styles.activityTitle}>{s.package_name || 'Private Session'}</span>
                      <span className={styles.activityMeta}>
                        {formatTime(s.start_time)} – {formatTime(s.end_time)} · {s.teacher_name || 'Tutor'}
                      </span>
                    </div>
                    <span className={`${styles.badgeSm} ${styles[`status${s.status.charAt(0).toUpperCase() + s.status.slice(1)}`] || ''}`}>
                      {s.status}
                    </span>
                  </div>
                );
              }) : (
                <div className={styles.emptySection}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
                  <p>No upcoming sessions yet.</p>
                </div>
              )}
            </div>
          </section>

          {/* Recent Feedback */}
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Completed Sessions</h2>
            </div>
            <div className={styles.sectionBody}>
              {recentCompleted.length > 0 ? recentCompleted.map(s => {
                const dateObj = s.date instanceof Date ? s.date : new Date(String(s.date).slice(0, 10) + 'T00:00:00');
                return (
                  <div key={s.id} className={styles.activityItem}>
                    <div className={styles.activityDate}>
                      <span className={styles.activityDay}>{dateObj.toLocaleDateString('en', { weekday: 'short' })}</span>
                      <span className={styles.activityDateNum}>{dateObj.getDate()}</span>
                    </div>
                    <div className={styles.activityInfo}>
                      <span className={styles.activityTitle}>{s.package_name || 'Private Session'}</span>
                      <span className={styles.activityMeta}>{s.teacher_name || 'Tutor'} · Completed</span>
                    </div>
                    <span className={`${styles.badgeSm} ${styles.statusCompleted}`}>Done</span>
                  </div>
                );
              }) : (
                <div className={styles.emptySection}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
                  <p>No completed sessions yet.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className={styles.gridSide}>
          {/* Learning Progress */}
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Learning Progress</h2>
            </div>
            <div className={styles.progressCard}>
              <div className={styles.progressItem}>
                <div className={styles.progressLabelWrap}>
                  <span className={styles.progressLabel}>Package Progress</span>
                  <span className={styles.progressPct}>{activePackage ? Math.round(((activePackage.used_sessions || 0) / ((activePackage.used_sessions || 0) + (activePackage.remaining_sessions || 0))) * 100) : 0}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${activePackage ? Math.round(((activePackage.used_sessions || 0) / Math.max((activePackage.used_sessions || 0) + (activePackage.remaining_sessions || 0), 1)) * 100) : 0}%` }} />
                </div>
              </div>
              <div className={styles.progressItem}>
                <div className={styles.progressLabelWrap}>
                  <span className={styles.progressLabel}>Attendance</span>
                  <span className={styles.progressPct}>{attendanceRate}%</span>
                </div>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: `${attendanceRate}%`, background: 'var(--success, #22C55E)' }} />
                </div>
              </div>
            </div>
          </section>

          {/* Homework */}
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Homework</h2>
              <Link href="/student/homeworks" className={styles.viewAll}>View All →</Link>
            </div>
            <div className={styles.sectionBody}>
              {recentHomework.length > 0 ? recentHomework.map(hw => (
                <div key={hw.id} className={styles.activityItem} style={{ padding: '10px 16px' }}>
                  <div className={styles.activityInfo}>
                    <span className={styles.activityTitle}>{hw.title}</span>
                    <span className={styles.activityMeta}>Due: {hw.due_date ? formatDate(hw.due_date) : 'No date'}</span>
                  </div>
                  <span className={`${styles.badgeSm} ${hw.status === 'submitted' ? styles.statusCompleted : styles.statusScheduled}`}>
                    {hw.status || 'pending'}
                  </span>
                </div>
              )) : (
                <div className={styles.emptySection}>
                  <p>No homework assigned yet.</p>
                </div>
              )}
            </div>
          </section>

          {/* Materials */}
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Learning Materials</h2>
              <Link href="/student/materials" className={styles.viewAll}>View All →</Link>
            </div>
            <div className={styles.sectionBody}>
              {recentMaterials.length > 0 ? recentMaterials.map((mat, i) => (
                <div key={i} className={styles.activityItem} style={{ padding: '10px 16px' }}>
                  <div className={styles.activityInfo}>
                    <span className={styles.activityTitle}>{mat.title}</span>
                    <span className={styles.activityMeta}>{mat.type || 'Material'}</span>
                  </div>
                </div>
              )) : (
                <div className={styles.emptySection}>
                  <p>No materials yet.</p>
                </div>
              )}
            </div>
          </section>

          {/* Member Info */}
          <section className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Profile</h2>
            </div>
            <div className={styles.profileCard}>
              <div className={styles.profileRow}>
                <span className={styles.profileLabel}>Name</span>
                <span className={styles.profileValue}>{student?.name || session.name}</span>
              </div>
              <div className={styles.profileRow}>
                <span className={styles.profileLabel}>Email</span>
                <span className={styles.profileValue}>{session.email}</span>
              </div>
              {memberSince && (
                <div className={styles.profileRow}>
                  <span className={styles.profileLabel}>Member Since</span>
                  <span className={styles.profileValue}>{memberSince}</span>
                </div>
              )}
              <Link href="/student/profile" className={styles.profileLink}>Edit Profile →</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}