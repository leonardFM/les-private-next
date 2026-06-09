import { all } from '@/lib/db';
import Link from 'next/link';
import AdminPageHeader from '../_components/AdminPageHeader';
import AdminTable, { EmptyState } from '../_components/AdminTable';
import styles from '../admin.module.css';

export default async function AdminLeadsPage() {
  const leads = await all('SELECT * FROM leads ORDER BY created_at DESC');

  return (
    <div>
      <AdminPageHeader title="Leads" subtitle="Inquiries from the contact form" />

      {leads.length > 0 ? (
        <AdminTable
          columns={[
            { label: 'Name', render: (l) => <strong>{l.name}</strong> },
            { label: 'Email', key: 'email' },
            { label: 'Program', render: (l) => l.program || '-' },
            { label: 'Status', render: (l) => (
              <span className={`${styles.badge} ${styles[`badge${l.status.charAt(0).toUpperCase() + l.status.slice(1)}`] || styles.badgeNew}`}>{l.status}</span>
            )},
            { label: 'Date', render: (l) => new Date(l.created_at).toLocaleDateString() },
            { label: 'Actions', render: (l) => (
              <Link href={`/admin/leads/${l.id}`} className={styles.actionBtn}>View</Link>
            )},
          ]}
          rows={leads.map(l => ({ ...l, key: l.id }))}
        />
      ) : (
        <EmptyState title="No leads yet" message="Leads will appear here when visitors submit the contact form." />
      )}
    </div>
  );
}
