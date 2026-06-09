import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import TestimonialForm from '../TestimonialForm';
import styles from '../../admin.module.css';

function getTestimonial(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM testimonials WHERE id = ?').get(id);
}

export default async function EditTestimonialPage({ params }) {
  const { id } = await params;
  const testimonial = getTestimonial(id);
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Edit Testimonial</h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
