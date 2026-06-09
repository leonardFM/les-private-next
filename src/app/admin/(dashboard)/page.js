import { getDb } from '@/lib/db';
import Link from 'next/link';
import styles from './admin.module.css';

function getStats() {
  const db = getDb();
  const expiring = db.prepare("SELECT sp.*, s.name AS student_name FROM student_packages sp JOIN students s ON s.id = sp.student_id WHERE sp.status = 'active' AND sp.remaining_sessions <= 3 ORDER BY sp.remaining_sessions ASC LIMIT 5").all();
  return {
    totalLeads: db.prepare('SELECT COUNT(*) AS count FROM leads').get().count,
    newLeads: db.prepare("SELECT COUNT(*) AS count FROM leads WHERE status = 'new'").get().count,
    totalPrograms: db.prepare('SELECT COUNT(*) AS count FROM programs').get().count,
    totalTestimonials: db.prepare('SELECT COUNT(*) AS count FROM testimonials').get().count,
    totalFaqs: db.prepare('SELECT COUNT(*) AS count FROM faqs').get().count,
    totalStudents: db.prepare('SELECT COUNT(*) AS count FROM students').get().count,
    activePackages: db.prepare("SELECT COUNT(*) AS count FROM student_packages WHERE status = 'active'").get().count,
    recentLeads: db.prepare('SELECT * FROM leads ORDER BY created_at DESC LIMIT 5').all(),
    expiringPackages: expiring,
  };
}

export default async function AdminDashboardPage() {
  const stats = getStats();

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Overview of your English course website</p>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.newLeads}</span>
          <span className={styles.statLabel}>New Leads</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalLeads}</span>
          <span className={styles.statLabel}>Total Leads</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalPrograms}</span>
          <span className={styles.statLabel}>Programs</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalTestimonials}</span>
          <span className={styles.statLabel}>Testimonials</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalFaqs}</span>
          <span className={styles.statLabel}>FAQs</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.totalStudents}</span>
          <span className={styles.statLabel}>Students</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats.activePackages}</span>
          <span className={styles.statLabel}>Active Packages</span>
        </div>
      </div>

      <h2 className={styles.sectionHeading}>Recent Leads</h2>

      {stats.recentLeads.length > 0 ? (
        <div className={styles.tableWrapper}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Program</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td><strong>{lead.name}</strong></td>
                    <td>{lead.email}</td>
                    <td>{lead.program || '-'}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[`badge${lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}`] || styles.badgeNew}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td>{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td>
                      <Link href={`/admin/leads/${lead.id}`} className={styles.actionBtn}>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>No leads yet</h3>
          <p>Leads will appear here when visitors submit the contact form.</p>
        </div>
      )}

      {stats.expiringPackages.length > 0 && (
        <>
          <h2 className={styles.sectionHeading} style={{ marginTop: 32 }}>Packages Expiring Soon</h2>
          <div className={styles.tableWrapper}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Package</th>
                    <th>Sessions Left</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.expiringPackages.map((pkg) => (
                    <tr key={pkg.id}>
                      <td><strong>{pkg.student_name}</strong></td>
                      <td>{pkg.package_name}</td>
                      <td><span style={{ color: pkg.remaining_sessions <= 1 ? 'var(--danger-color)' : '#D97706', fontWeight: 700 }}>{pkg.remaining_sessions}</span></td>
                      <td>
                        <Link href={`/admin/students/${pkg.student_id}`} className={styles.actionBtn}>View</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
