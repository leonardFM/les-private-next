import { get } from '@/lib/db';
import { notFound } from 'next/navigation';
import FaqForm from '../FaqForm';
import styles from '../../admin.module.css';

export default async function EditFaqPage({ params }) {
  const { id } = await params;
  const faq = await get('SELECT * FROM faqs WHERE id = $1', [id]);
  if (!faq) notFound();

  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Edit FAQ</h1>
      <FaqForm faq={faq} />
    </div>
  );
}
