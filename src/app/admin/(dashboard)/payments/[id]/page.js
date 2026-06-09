import { getPaymentById } from '@/lib/data';
import { get } from '@/lib/db';
import Link from 'next/link';
import styles from '../../admin.module.css';

const STATUS_BADGES = {
  pending: styles.badgeNew,
  paid: styles.badgeConverted,
  expired: styles.badgeClosed,
  failed: styles.badgeClosed,
  refunded: styles.badgeContacted,
};

export default async function PaymentDetailPage({ params }) {
  const { id } = await params;
  const payment = await getPaymentById(id);

  if (!payment) {
    return (
      <div className={styles.emptyState}>
        <h3>Payment not found</h3>
        <p>The payment you are looking for does not exist.</p>
        <Link href="/admin/payments" className={styles.addBtn} style={{ display: 'inline-block', marginTop: 16 }}>← Back to Payments</Link>
      </div>
    );
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Payment Detail</h1>
          <p className={styles.pageSubtitle}>
            Order ID: <code>{payment.order_id}</code>
          </p>
        </div>
        <Link href="/admin/payments" className={styles.backBtn}>← Back</Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className={styles.formCard}>
          <h2 className={styles.sectionHeading}>Transaction Info</h2>
          <table className={styles.table} style={{ minWidth: 'auto' }}>
            <tbody>
              <tr><td style={{ fontWeight: 600, width: 160 }}>Status</td>
                <td><span className={`${styles.badge} ${STATUS_BADGES[payment.payment_status] || styles.badgeNew}`}>{payment.payment_status}</span></td>
              </tr>
              <tr><td style={{ fontWeight: 600 }}>Transaction Status</td><td>{payment.transaction_status || '-'}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Payment Type</td><td>{payment.payment_type || '-'}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Transaction ID</td><td>{payment.transaction_id ? <code>{payment.transaction_id}</code> : '-'}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Amount</td><td>Rp {Number(payment.amount).toLocaleString()}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Created</td><td>{new Date(payment.created_at).toLocaleString()}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Updated</td><td>{payment.updated_at ? new Date(payment.updated_at).toLocaleString() : '-'}</td></tr>
            </tbody>
          </table>
        </div>

        <div className={styles.formCard}>
          <h2 className={styles.sectionHeading}>Student Info</h2>
          <table className={styles.table} style={{ minWidth: 'auto' }}>
            <tbody>
              <tr><td style={{ fontWeight: 600, width: 160 }}>Name</td><td>{payment.student_name}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Email</td><td>{payment.student_email}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Phone</td><td>{payment.student_phone || '-'}</td></tr>
            </tbody>
          </table>

          <h2 className={styles.sectionHeading} style={{ marginTop: 24 }}>Package Info</h2>
          <table className={styles.table} style={{ minWidth: 'auto' }}>
            <tbody>
              <tr><td style={{ fontWeight: 600, width: 160 }}>Package</td><td>{payment.package_name || '-'}</td></tr>
              <tr><td style={{ fontWeight: 600 }}>Total Sessions</td><td>{payment.total_sessions || '-'}</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <Link href="/admin/payments" className={styles.backBtn}>← Back to Payments</Link>
      </div>
    </div>
  );
}
