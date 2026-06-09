import TestimonialForm from '../TestimonialForm';
import styles from '../../admin.module.css';

export default function NewTestimonialPage() {
  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Add Testimonial</h1>
      <TestimonialForm />
    </div>
  );
}
