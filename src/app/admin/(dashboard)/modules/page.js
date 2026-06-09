import Link from 'next/link';
import { initDb } from '@/lib/db';
import { getModules } from '@/lib/modules/materials/data';
import { deleteModule } from '@/lib/modules/materials/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import AdminTable, { EmptyState } from '../_components/AdminTable';
import DeleteForm from '../_components/DeleteForm';
import styles from '../admin.module.css';

export default async function AdminModulesPage() {
  await initDb();
  const modules = await getModules();

  return (
    <div>
      <AdminPageHeader title="Learning Modules" subtitle="Organize learning materials by package" addHref="/admin/modules/new" addLabel="+ New Module" />

      {modules.length > 0 ? (
        <AdminTable
          columns={[
            { label: 'Title', render: (m) => <strong>{m.title}</strong> },
            { label: 'Package', key: 'package_name' },
            { label: 'Sort Order', key: 'sort_order' },
            { label: 'Materials', render: (m) => (
              <Link href={`/admin/modules/${m.id}`} className={styles.actionBtn}>Manage Materials</Link>
            )},
            { label: 'Actions', render: (m) => (
              <div className={styles.actions}>
                <Link href={`/admin/modules/${m.id}`} className={styles.actionBtn}>Edit</Link>
                <DeleteForm action={deleteModule} id={m.id} redirectHref="/admin/modules">
                  <button type="submit" className={`${styles.actionBtn} ${styles.actionDanger}`}>Delete</button>
                </DeleteForm>
              </div>
            )},
          ]}
          rows={modules.map(m => ({ ...m, key: m.id }))}
        />
      ) : (
        <EmptyState title="No modules yet" message="Create your first learning module to organize materials." />
      )}
    </div>
  );
}
