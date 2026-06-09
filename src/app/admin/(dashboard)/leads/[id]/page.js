import { get } from '@/lib/db';
import { updateLeadStatus, deleteLead } from '@/lib/actions';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import styles from '../../admin.module.css';

export default async function LeadDetailPage({ params }) {
  const { id } = await params;
  const lead = await get('SELECT * FROM leads WHERE id = $1', [id]);

  if (!lead) notFound();

  return (
    <div>
      <Link href="/admin/leads" className={styles.backBtn} style={{ marginBottom: 20 }}>← Back to Leads</Link>

      <div className={styles.formCard}>
        <h1 className={styles.pageTitle} style={{ marginBottom: 4 }}>{lead.name}</h1>
        <span className={`${styles.badge} ${styles[`badge${lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}`] || styles.badgeNew}`}>
          {lead.status}
        </span>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><strong>Email:</strong> {lead.email}</div>
          <div><strong>Phone:</strong> {lead.phone || '-'}</div>
          <div><strong>Program:</strong> {lead.program || '-'}</div>
          <div><strong>Format:</strong> {lead.format || '-'}</div>
          <div><strong>Date:</strong> {new Date(lead.created_at).toLocaleString()}</div>
          {lead.message && (
            <div>
              <strong>Message:</strong>
              <p style={{ marginTop: 8, padding: 16, background: 'var(--bg-soft)', borderRadius: 'var(--radius-md)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{lead.message}</p>
            </div>
          )}
        </div>

        <div className={styles.formActions}>
          <form action={async () => {
            'use server';
            const nextStatus = lead.status === 'new' ? 'contacted' : lead.status === 'contacted' ? 'converted' : 'closed';
            await updateLeadStatus(lead.id, nextStatus);
          }}>
            <button type="submit" className={styles.submitBtn}>
              {lead.status === 'new' ? 'Mark as Contacted' : lead.status === 'contacted' ? 'Mark as Converted' : 'Reopen'}
            </button>
          </form>
          <form action={async () => {
            'use server';
            const form = new FormData();
            form.set('id', lead.id);
            await deleteLead(form);
            redirect('/admin/leads');
          }}>
            <button type="submit" className={`${styles.cancelBtn} ${styles.actionDanger}`}>Delete Lead</button>
          </form>
        </div>
      </div>
    </div>
  );
}
