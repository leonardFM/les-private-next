import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { getStudentPayments } from '@/lib/data';
import styles from '../student.module.css';

const STATUS_BADGES = {
  pending: styles.badgeNew,
  paid: styles.badgeActive,
  expired: styles.badgeCancelled,
  failed: styles.badgeCancelled,
  refunded: styles.badgeNew,
};

export default async function PaymentsPage() {
  await initDb();
  const session = await verifyStudentSession();
  const payments = await getStudentPayments(session.id);

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>My Payments</h1>
          <p className={styles.pageSubtitle}>Your payment transaction history</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className={styles.emptyState}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>💳</div>
          <h3>No payments yet</h3>
          <p>When you purchase a package, your payment history will appear here.</p>
        </div>
      ) : (
        <div className={styles.sectionCard}>
          <div className={styles.sectionCardHeader}>
            <h3>Payment History</h3>
          </div>
          <div className={styles.sectionCardBody}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Package</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map(p => (
                  <tr key={p.id}>
                    <td><code style={{ fontSize: 12, color: 'var(--foreground-muted)' }}>{p.order_id}</code></td>
                    <td style={{ fontWeight: 600 }}>{p.package_name || '-'}</td>
                    <td style={{ fontWeight: 700 }}>Rp {Number(p.amount).toLocaleString()}</td>
                    <td>
                      <span className={`${styles.badge} ${STATUS_BADGES[p.payment_status] || styles.badgeNew}`}>
                        {p.payment_status}
                      </span>
                    </td>
                    <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
