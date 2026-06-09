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

export default async function AdminSchedulesPage({ searchParams }) {
  await initDb();
  const sp = await searchParams;
  const schedules = await getSchedules({ status: sp?.status });

  return (
    <div>
      <AdminPageHeader title="Schedules" subtitle="Manage class schedules" addHref="/admin/schedules/new" addLabel="+ New Schedule" />

      {schedules.length > 0 ? (
        <AdminTable
          columns={[
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
          ]}
          rows={schedules.map(s => ({ ...s, key: s.id }))}
        />
      ) : (
        <EmptyState title="No schedules yet" message="Create a new schedule to start tracking classes." />
      )}
    </div>
  );
}
