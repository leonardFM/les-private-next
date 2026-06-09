import { getPayments } from '@/lib/data';
import Link from 'next/link';
import AdminPageHeader from '../_components/AdminPageHeader';
import AdminTable, { EmptyState } from '../_components/AdminTable';
import styles from '../admin.module.css';

const STATUS_BADGES = {
  pending: styles.badgeNew,
  paid: styles.badgeConverted,
  expired: styles.badgeClosed,
  failed: styles.badgeClosed,
  refunded: styles.badgeContacted,
};

export default async function AdminPaymentsPage({ searchParams }) {
  const sp = await searchParams;
  const status = sp?.status || '';
  const search = sp?.search || '';

  const payments = await getPayments({ status: status || undefined, search: search || undefined });

  return (
    <div>
      <AdminPageHeader title="Payments" subtitle="Manage payment transactions" />

      <div className={styles.formCard} style={{ maxWidth: 'none', marginBottom: 24 }}>
        <form method="GET" style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div className={styles.formGroup} style={{ margin: 0, flex: 1 }}>
            <label className={styles.formLabel}>Search by student or Order ID</label>
            <input name="search" type="text" className={styles.formInput} defaultValue={search} placeholder="Name or Order ID..." />
          </div>
          <div className={styles.formGroup} style={{ margin: 0, flex: 1 }}>
            <label className={styles.formLabel}>Status</label>
            <select name="status" className={styles.formSelect} defaultValue={status}>
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="expired">Expired</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <button type="submit" className={styles.addBtn}>Filter</button>
          {(status || search) && (
            <Link href="/admin/payments" className={styles.backBtn}>Clear</Link>
          )}
        </form>
      </div>

      {payments.length > 0 ? (
        <AdminTable
          columns={[
            { label: 'Order ID', render: (p) => <code style={{ fontSize: 12 }}>{p.order_id}</code> },
            { label: 'Student', key: 'student_name' },
            { label: 'Package', render: (p) => p.package_name || '-' },
            { label: 'Amount', render: (p) => `Rp ${Number(p.amount).toLocaleString()}` },
            { label: 'Status', render: (p) => (
              <span className={`${styles.badge} ${STATUS_BADGES[p.payment_status] || styles.badgeNew}`}>
                {p.payment_status}
              </span>
            )},
            { label: 'Date', render: (p) => new Date(p.created_at).toLocaleDateString() },
            { label: 'Actions', render: (p) => (
              <Link href={`/admin/payments/${p.id}`} className={styles.actionBtn}>View</Link>
            )},
          ]}
          rows={payments.map(p => ({ ...p, key: p.id }))}
        />
      ) : (
        <EmptyState title="No payments yet" message="Payments will appear here once students make transactions." />
      )}
    </div>
  );
}
