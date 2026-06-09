import { getDb } from '@/lib/db';
import Link from 'next/link';
import DeleteForm from '../_components/DeleteForm';
import { deleteProgram } from '@/lib/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import AdminTable, { EmptyState } from '../_components/AdminTable';
import { j } from '@/lib/utils';
import styles from '../admin.module.css';

function getPrograms() {
  const db = getDb();
  return db.prepare('SELECT * FROM programs ORDER BY created_at DESC').all();
}

export default async function AdminProgramsPage() {
  const programs = getPrograms();

  return (
    <div>
      <AdminPageHeader title="Programs" subtitle="Manage your English course programs" addHref="/admin/programs/new" addLabel="+ Add Program" />

      {programs.length > 0 ? (
        <AdminTable
          columns={[
            { label: 'Title', render: (p) => <strong>{p.icon} {j(p.title).id}</strong> },
            { label: 'Category', key: 'category' },
            { label: 'Level', render: (p) => j(p.level).id },
            { label: 'Price', render: (p) => j(p.price).id },
            { label: 'Duration', key: 'duration' },
            { label: 'Status', render: (p) => (
              <span className={`${styles.badge} ${p.active ? styles.badgeContacted : styles.badgeClosed}`}>{p.active ? 'Active' : 'Inactive'}</span>
            )},
            { label: 'Actions', render: (p) => (
              <div className={styles.actions}>
                <Link href={`/admin/programs/${p.id}`} className={styles.actionBtn}>Edit</Link>
                <DeleteForm action={deleteProgram} id={p.id} />
              </div>
            )},
          ]}
          rows={programs.map(p => ({ ...p, key: p.id }))}
        />
      ) : (
        <EmptyState title="No programs yet" message="Create your first program to showcase courses." />
      )}
    </div>
  );
}
