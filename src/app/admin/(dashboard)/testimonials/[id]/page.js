import { get } from '@/lib/db';
import { notFound } from 'next/navigation';
import TestimonialForm from '../TestimonialForm';
import styles from '../../admin.module.css';

export default async function EditTestimonialPage({ params }) {
  const { id } = await params;
  const testimonial = await get('SELECT * FROM testimonials WHERE id = $1', [id]);
  if (!testimonial) notFound();

  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Edit Testimonial</h1>
      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}
