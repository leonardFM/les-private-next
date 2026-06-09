import Link from 'next/link';
import { initDb } from '@/lib/db';
import { getHomeworks } from '@/lib/modules/homeworks/data';
import { deleteHomework } from '@/lib/modules/homeworks/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import AdminTable, { EmptyState } from '../_components/AdminTable';
import DeleteForm from '../_components/DeleteForm';
import styles from '../admin.module.css';

export default async function AdminHomeworksPage() {
  await initDb();
  const homeworks = await getHomeworks();

  return (
    <div>
      <AdminPageHeader title="Homework" subtitle="Manage assignments for student packages" addHref="/admin/homeworks/new" addLabel="+ New Homework" />

      {homeworks.length > 0 ? (
        <AdminTable
          columns={[
            { label: 'Title', render: (h) => <strong>{h.title}</strong> },
            { label: 'Student', key: 'student_name' },
            { label: 'Package', key: 'package_name' },
            { label: 'Module', render: (h) => h.module_title || '-' },
            { label: 'Due Date', render: (h) => h.due_date ? new Date(h.due_date).toLocaleDateString() : '-' },
            { label: 'Actions', render: (h) => (
              <div className={styles.actions}>
                <Link href={`/admin/homeworks/${h.id}`} className={styles.actionBtn}>View & Grade</Link>
                <DeleteForm action={deleteHomework} id={h.id} redirectHref="/admin/homeworks">
                  <button type="submit" className={`${styles.actionBtn} ${styles.actionDanger}`}>Delete</button>
                </DeleteForm>
              </div>
            )},
          ]}
          rows={homeworks.map(h => ({ ...h, key: h.id }))}
        />
      ) : (
        <EmptyState title="No homeworks yet" message="Create assignments for your student packages." />
      )}
    </div>
  );
}
