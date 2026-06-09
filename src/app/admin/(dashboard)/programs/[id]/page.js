import { get } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProgramForm from '../ProgramForm';
import styles from '../../admin.module.css';

export default async function EditProgramPage({ params }) {
  const { id } = await params;
  const program = await get('SELECT * FROM programs WHERE id = $1', [id]);
  if (!program) notFound();

  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Edit Program</h1>
      <ProgramForm program={program} />
    </div>
  );
}
