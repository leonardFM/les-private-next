import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import FaqForm from '../FaqForm';
import styles from '../../admin.module.css';

function getFaq(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM faqs WHERE id = ?').get(id);
}

export default async function EditFaqPage({ params }) {
  const { id } = await params;
  const faq = getFaq(id);
  if (!faq) notFound();

  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Edit FAQ</h1>
      <FaqForm faq={faq} />
    </div>
  );
}
