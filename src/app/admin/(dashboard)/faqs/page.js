import { getDb } from '@/lib/db';
import Link from 'next/link';
import DeleteForm from '../_components/DeleteForm';
import { deleteFaq } from '@/lib/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import AdminTable, { EmptyState } from '../_components/AdminTable';
import { j } from '@/lib/utils';
import styles from '../admin.module.css';

function getFaqs() {
  const db = getDb();
  return db.prepare('SELECT * FROM faqs ORDER BY sort_order ASC, created_at DESC').all();
}

export default async function AdminFaqsPage() {
  const faqs = getFaqs();

  return (
    <div>
      <AdminPageHeader title="FAQs" subtitle="Frequently asked questions" addHref="/admin/faqs/new" addLabel="+ Add FAQ" />

      {faqs.length > 0 ? (
        <AdminTable
          columns={[
            { label: '#', style: { width: 40 }, render: (f, i) => i + 1 },
            { label: 'Question', render: (faq) => <strong>{j(faq.question).id}</strong> },
            { label: 'Preview', render: (faq) => <span style={{ maxWidth: 300, display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j(faq.answer).id}</span> },
            { label: 'Order', key: 'sort_order' },
            { label: 'Actions', render: (faq) => (
              <div className={styles.actions}>
                <Link href={`/admin/faqs/${faq.id}`} className={styles.actionBtn}>Edit</Link>
                <DeleteForm action={deleteFaq} id={faq.id} />
              </div>
            )},
          ]}
          rows={faqs.map(f => ({ ...f, key: f.id }))}
        />
      ) : (
        <EmptyState title="No FAQs yet" message="Add frequently asked questions to help visitors." />
      )}
    </div>
  );
}
