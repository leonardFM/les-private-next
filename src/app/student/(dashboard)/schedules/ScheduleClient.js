'use client';

import { useState, useMemo } from 'react';
import styles from './schedules.module.css';

const STATUS_CONFIG = {
  scheduled: { label: 'Scheduled', className: 'statusScheduled' },
  confirmed: { label: 'Confirmed', className: 'statusConfirmed' },
  completed: { label: 'Completed', className: 'statusCompleted' },
  cancelled: { label: 'Cancelled', className: 'statusCancelled' },
};

function getInitials(name) {
  if (!name) return '?';
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function formatTime(t) {
  if (!t) return '';
  return t.slice(0, 5);
}

function toDateObj(v) {
  if (v instanceof Date) return v;
  return new Date(String(v).slice(0, 10) + 'T00:00:00');
}

function formatDate(dateStr) {
  const d = toDateObj(dateStr);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function formatDateFull(dateStr) {
  const d = toDateObj(dateStr);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function isToday(dateStr) {
  const today = new Date();
  const d = toDateObj(dateStr);
  if (isNaN(d)) return false;
  return d.toDateString() === today.toDateString();
}

function ScheduleCard({ schedule }) {
  const statusConf = STATUS_CONFIG[schedule.status] || STATUS_CONFIG.scheduled;

  return (
    <div className={styles.scheduleCard}>
      <div className={styles.scheduleCardTime}>
        <span className={styles.scheduleCardDate}>
          {formatDate(schedule.date)}
        </span>
        <span className={styles.scheduleCardTimeValue}>
          {formatTime(schedule.start_time)}
        </span>
        <span className={styles.scheduleCardTimeSeparator}>—</span>
        <span className={styles.scheduleCardTimeValue}>
          {formatTime(schedule.end_time)}
        </span>
      </div>

      <div className={styles.scheduleCardBody}>
        <div className={styles.scheduleCardRow}>
          <div className={styles.scheduleCardTeacher}>
            <span className={styles.avatar} aria-hidden="true">
              {getInitials(schedule.teacher_name)}
            </span>
            <span>{schedule.teacher_name || 'Unassigned'}</span>
          </div>
          <span className={`${styles.badge} ${styles[statusConf.className]}`}>
            {statusConf.label}
          </span>
        </div>
        <div className={styles.scheduleCardMeta}>
          <span className={styles.subjectBadge}>
            {schedule.package_name || 'General'}
          </span>
        </div>
        {schedule.notes && (
          <div className={styles.scheduleCardNotes}>
            {schedule.notes}
          </div>
        )}
      </div>

      <div className={styles.scheduleCardActions}>
        {schedule.meeting?.join_url ? (
          <a
            href={schedule.meeting.join_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.joinBtn}
          >
            Join ↗
          </a>
        ) : (
          <span className={styles.noMeeting}>No meeting</span>
        )}
      </div>
    </div>
  );
}

function ScheduleTableRow({ schedule }) {
  const statusConf = STATUS_CONFIG[schedule.status] || STATUS_CONFIG.scheduled;

  return (
    <tr>
      <td className={styles.tableDate}>
        <span className={styles.tableDateDay}>
          {toDateObj(schedule.date).getDate()}
        </span>
        <span className={styles.tableDateMonth}>
          {toDateObj(schedule.date).toLocaleDateString('en-US', { month: 'short' })}
        </span>
      </td>
      <td className={styles.tableTime}>
        {formatTime(schedule.start_time)} – {formatTime(schedule.end_time)}
      </td>
      <td>
        <div className={styles.tableTeacher}>
          <span className={styles.avatarSmall} aria-hidden="true">
            {getInitials(schedule.teacher_name)}
          </span>
          <span>{schedule.teacher_name || 'Unassigned'}</span>
        </div>
      </td>
      <td>
        <span className={styles.subjectBadge}>
          {schedule.package_name || 'General'}
        </span>
      </td>
      <td>
        <span className={`${styles.badge} ${styles[statusConf.className]}`}>
          {statusConf.label}
        </span>
      </td>
      <td className={styles.tableNotes}>
        {schedule.notes || '—'}
      </td>
      <td>
        {schedule.meeting?.join_url ? (
          <a
            href={schedule.meeting.join_url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.joinBtn}
          >
            Join ↗
          </a>
        ) : (
          <span className={styles.noMeeting}>—</span>
        )}
      </td>
    </tr>
  );
}

export default function ScheduleClient({ schedules }) {
  const [view, setView] = useState('overview');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);
    return {
      total: schedules.length,
      today: schedules.filter(s => s.date === todayStr).length,
      upcoming: schedules.filter(s => s.date > todayStr && s.status !== 'cancelled').length,
      completed: schedules.filter(s => s.status === 'completed').length,
      cancelled: schedules.filter(s => s.status === 'cancelled').length,
    };
  }, [schedules]);

  const filtered = useMemo(() => {
    let result = [...schedules];

    if (statusFilter !== 'all') {
      result = result.filter(s => s.status === statusFilter);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(s =>
        (s.teacher_name && s.teacher_name.toLowerCase().includes(q)) ||
        (s.package_name && s.package_name.toLowerCase().includes(q)) ||
        (s.student_name && s.student_name.toLowerCase().includes(q)) ||
        (s.notes && s.notes.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      const dateA = String(a.date);
      const dateB = String(b.date);
      const dateCmp = dateA.localeCompare(dateB);
      if (dateCmp !== 0) return dateCmp;
      return (a.start_time || '').localeCompare(b.start_time || '');
    });

    return result;
  }, [schedules, statusFilter, search]);

  const grouped = useMemo(() => {
    const groups = {};
    for (const s of filtered) {
      const key = s.date;
      if (!groups[key]) groups[key] = [];
      groups[key].push(s);
    }
    return groups;
  }, [filtered]);

  const sortedDates = Object.keys(grouped).sort();

  const todayStr = new Date().toISOString().slice(0, 10);

  const overviewDates = sortedDates.filter(d => d >= todayStr);
  const pastDates = sortedDates.filter(d => d < todayStr).reverse();

  if (schedules.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageTitle}>My Schedule</h1>
            <p className={styles.pageSubtitle}>Your upcoming and past class schedules</p>
          </div>
        </div>
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📅</div>
          <h3>No schedules yet</h3>
          <p>Your class schedules will appear here once they are assigned.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Schedule</h1>
          <p className={styles.pageSubtitle}>Your upcoming and past class schedules</p>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statBlue}`}>📅</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{stats.total}</span>
            <span className={styles.statLabel}>Total Classes</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statGreen}`}>🎯</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{stats.today}</span>
            <span className={styles.statLabel}>Today</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statPurple}`}>📋</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{stats.upcoming}</span>
            <span className={styles.statLabel}>Upcoming</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statTeal}`}>✅</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{stats.completed}</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statRed}`}>🚫</div>
          <div className={styles.statBody}>
            <span className={styles.statValue}>{stats.cancelled}</span>
            <span className={styles.statLabel}>Cancelled</span>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.viewBtn} ${view === 'overview' ? styles.viewBtnActive : ''}`}
            onClick={() => setView('overview')}
          >
            <span>📋</span> Overview
          </button>
          <button
            className={`${styles.viewBtn} ${view === 'table' ? styles.viewBtnActive : ''}`}
            onClick={() => setView('table')}
          >
            <span>📊</span> Table
          </button>
        </div>

        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Search teacher, subject…"
            className={styles.searchInput}
            value={search}
            onChange={e => setSearch(e.target.value)}
            aria-label="Search schedules"
          />
          <select
            className={styles.statusSelect}
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No matching schedules</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      ) : view === 'overview' ? (
        <div className={styles.overview}>
          {overviewDates.length > 0 && (
            <section>
              <h2 className={styles.sectionTitle}>
                {overviewDates[0] === todayStr ? 'Today' : 'Upcoming'}
              </h2>
              <div className={styles.cardList}>
                {overviewDates.map(date => (
                  <div key={date}>
                    {date !== todayStr && (
                      <div className={styles.dateLabel}>{formatDateFull(date)}</div>
                    )}
                    <div className={styles.cardGroup}>
                      {grouped[date].map(s => (
                        <ScheduleCard key={s.id} schedule={s} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {pastDates.length > 0 && (
            <section>
              <h2 className={styles.sectionTitle}>Past Classes</h2>
              <div className={styles.cardList}>
                {pastDates.map(date => (
                  <div key={date}>
                    <div className={styles.dateLabel}>{formatDateFull(date)}</div>
                    <div className={styles.cardGroup}>
                      {grouped[date].map(s => (
                        <ScheduleCard key={s.id} schedule={s} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Teacher</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedDates.map(date =>
                grouped[date].map(s => (
                  <ScheduleTableRow key={s.id} schedule={s} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
