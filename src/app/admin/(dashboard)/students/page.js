import { all } from '@/lib/db';
import Link from 'next/link';
import DeleteForm from '../_components/DeleteForm';
import { deleteStudent } from '@/lib/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import AdminTable, { EmptyState } from '../_components/AdminTable';
import styles from '../admin.module.css';

export default async function AdminStudentsPage() {
  const students = await all(`SELECT s.*,
    (SELECT COUNT(*) FROM student_packages WHERE student_id = s.id AND status = 'active') AS active_packages
    FROM students s ORDER BY s.created_at DESC`);

  return (
    <div>
      <AdminPageHeader title="Students" subtitle="Manage student subscriptions and sessions" addHref="/admin/students/new" addLabel="+ Add Student" />

      {students.length > 0 ? (
        <AdminTable
          columns={[
            { label: 'Name', render: (s) => <strong>{s.name}</strong> },
            { label: 'Email', key: 'email' },
            { label: 'Phone', render: (s) => s.phone || '-' },
            { label: 'Active Packages', render: (s) => (
              <span className={`${styles.badge} ${s.active_packages > 0 ? styles.badgeContacted : styles.badgeClosed}`}>{s.active_packages}</span>
            )},
            { label: 'Actions', render: (s) => (
              <div className={styles.actions}>
                <Link href={`/admin/students/${s.id}`} className={styles.actionBtn}>View</Link>
                <DeleteForm action={deleteStudent} id={s.id} />
              </div>
            )},
          ]}
          rows={students.map(s => ({ ...s, key: s.id }))}
        />
      ) : (
        <EmptyState title="No students yet" message="Add your first student to start tracking subscriptions." />
      )}
    </div>
  );
}
