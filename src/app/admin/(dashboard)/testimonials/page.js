import { getDb } from '@/lib/db';
import Link from 'next/link';
import DeleteForm from '../_components/DeleteForm';
import { deleteTestimonial } from '@/lib/actions';
import AdminPageHeader from '../_components/AdminPageHeader';
import AdminTable, { EmptyState } from '../_components/AdminTable';
import { j } from '@/lib/utils';
import styles from '../admin.module.css';

function getTestimonials() {
  const db = getDb();
  return db.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all();
}

export default async function AdminTestimonialsPage() {
  const testimonials = getTestimonials();

  return (
    <div>
      <AdminPageHeader title="Testimonials" subtitle="Student success stories and reviews" addHref="/admin/testimonials/new" addLabel="+ Add Testimonial" />

      {testimonials.length > 0 ? (
        <AdminTable
          columns={[
            { label: 'Name', render: (t) => <strong>{j(t.name).id}</strong> },
            { label: 'Course', render: (t) => j(t.course).id || '-' },
            { label: 'Rating', render: (t) => '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating) },
            { label: 'Preview', render: (t) => <span style={{ maxWidth: 250, display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{j(t.quote).id}</span> },
            { label: 'Status', render: (t) => (
              <span className={`${styles.badge} ${t.active ? styles.badgeContacted : styles.badgeClosed}`}>{t.active ? 'Active' : 'Inactive'}</span>
            )},
            { label: 'Actions', render: (t) => (
              <div className={styles.actions}>
                <Link href={`/admin/testimonials/${t.id}`} className={styles.actionBtn}>Edit</Link>
                <DeleteForm action={deleteTestimonial} id={t.id} />
              </div>
            )},
          ]}
          rows={testimonials.map(t => ({ ...t, key: t.id }))}
        />
      ) : (
        <EmptyState title="No testimonials yet" message="Add testimonials to showcase student success." />
      )}
    </div>
  );
}
