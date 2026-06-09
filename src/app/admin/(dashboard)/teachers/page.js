import Link from 'next/link';
import { initDb } from '@/lib/db';
import { getTeachers } from '@/lib/modules/teachers/data';
import { deleteTeacher } from '@/lib/modules/teachers/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import AdminTable, { EmptyState } from '../_components/AdminTable';
import DeleteForm from '../_components/DeleteForm';
import styles from '../admin.module.css';

export default async function AdminTeachersPage() {
  await initDb();
  const teachers = await getTeachers();

  return (
    <div>
      <AdminPageHeader title="Teachers" subtitle="Manage tutor/teacher profiles" addHref="/admin/teachers/new" addLabel="+ Add Teacher" />

      {teachers.length > 0 ? (
        <AdminTable
          columns={[
            { label: 'Name', render: (t) => <strong>{t.name}</strong> },
            { label: 'Email', key: 'email' },
            { label: 'Phone', render: (t) => t.phone || '-' },
            { label: 'Specialization', render: (t) => t.specialization || '-' },
            { label: 'Actions', render: (t) => (
              <div className={styles.actions}>
                <Link href={`/admin/teachers/${t.id}`} className={styles.actionBtn}>Edit</Link>
                <DeleteForm action={deleteTeacher} id={t.id} redirectHref="/admin/teachers">
                  <button type="submit" className={`${styles.actionBtn} ${styles.actionDanger}`}>Delete</button>
                </DeleteForm>
              </div>
            )},
          ]}
          rows={teachers.map(t => ({ ...t, key: t.id }))}
        />
      ) : (
        <EmptyState title="No teachers yet" message="Add your first teacher to get started." />
      )}
    </div>
  );
}
