import Link from 'next/link';
import { initDb } from '@/lib/db';
import { getSchedules } from '@/lib/modules/schedules/data';
import AdminPageHeader from '../_components/AdminPageHeader';
import AdminTable, { EmptyState } from '../_components/AdminTable';
import styles from '../admin.module.css';

const STATUS_BADGES = {
  scheduled: 'badgeNew',
  confirmed: 'badgeContacted',
  completed: 'badgeConverted',
  cancelled: 'badgeClosed',
};

const FILTERS = [
  { key: '', label: 'All', badge: 'badgeNew' },
  { key: 'scheduled', label: 'Scheduled', badge: 'badgeNew' },
  { key: 'confirmed', label: 'Confirmed', badge: 'badgeContacted' },
  { key: 'completed', label: 'Completed', badge: 'badgeConverted' },
  { key: 'cancelled', label: 'Cancelled', badge: 'badgeClosed' },
];

export default async function AdminSchedulesPage({ searchParams }) {
  await initDb();
  const sp = await searchParams;
  const activeStatus = sp?.status || '';
  const allSchedules = await getSchedules({});
  const schedules = activeStatus ? allSchedules.filter(s => s.status === activeStatus) : allSchedules;

  const today = new Date();
  const upcoming = schedules.filter(s =>
    s.status === 'scheduled' || s.status === 'confirmed'
  ).sort((a, b) => new Date(a.date) - new Date(b.date));
  const completed = schedules.filter(s => s.status === 'completed');
  const cancelled = schedules.filter(s => s.status === 'cancelled');

  const currentTab = FILTERS.find(f => f.key === activeStatus) || FILTERS[0];

  const columns = [
    { label: 'Date', render: (s) => new Date(s.date).toLocaleDateString() },
    { label: 'Time', render: (s) => `${s.start_time?.slice(0, 5)} - ${s.end_time?.slice(0, 5)}` },
    { label: 'Student', key: 'student_name' },
    { label: 'Teacher', render: (s) => s.teacher_name || 'Unassigned' },
    { label: 'Package', render: (s) => s.package_name || '-' },
    { label: 'Status', render: (s) => (
      <span className={`${styles.badge} ${styles[STATUS_BADGES[s.status]] || styles.badgeNew}`}>{s.status}</span>
    )},
    { label: 'Actions', render: (s) => (
      <Link href={`/admin/schedules/${s.id}`} className={styles.actionBtn}>View</Link>
    )},
  ];

  const renderTable = (rows) => rows.length > 0 ? (
    <AdminTable columns={columns} rows={rows.map(s => ({ ...s, key: s.id }))} />
  ) : (
    <EmptyState title="No schedules" message="No schedules in this category." />
  );

  return (
    <div>
      <AdminPageHeader title="Schedules" subtitle="Manage class schedules" addHref="/admin/schedules/new" addLabel="+ New Schedule" />

      <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
        {FILTERS.map(f => {
          const count = f.key ? allSchedules.filter(s => s.status === f.key).length : allSchedules.length;
          const isActive = f.key === currentTab.key;
          return (
            <Link
              key={f.key || 'all'}
              href={f.key ? `/admin/schedules?status=${f.key}` : '/admin/schedules'}
              className={styles.actionBtn}
              style={{
                ...(isActive ? { background: 'var(--primary-blue, #2563EB)', borderColor: 'var(--primary-blue, #2563EB)', color: '#fff' } : {}),
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {f.label}
              <span className={styles.badgeCount} style={isActive ? { background: 'rgba(255,255,255,0.25)', color: '#fff' } : undefined}>{count}</span>
            </Link>
          );
        })}
      </div>

      {schedules.length === 0 ? (
        <EmptyState title="No schedules yet" message="Create a new schedule to start tracking classes." />
      ) : currentTab.key === '' ? (
        <>
          <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700 }}>Upcoming ({upcoming.length})</h2>
          {renderTable(upcoming)}
          <h2 style={{ margin: '32px 0 16px', fontSize: 18, fontWeight: 700 }}>Completed ({completed.length})</h2>
          {renderTable(completed)}
          {cancelled.length > 0 && (
            <>
              <h2 style={{ margin: '32px 0 16px', fontSize: 18, fontWeight: 700 }}>Cancelled ({cancelled.length})</h2>
              {renderTable(cancelled)}
            </>
          )}
        </>
      ) : (
        renderTable(schedules)
      )}
    </div>
  );
}
