import { getDb } from '@/lib/db';
import { notFound } from 'next/navigation';
import ProgramForm from '../ProgramForm';
import styles from '../../admin.module.css';

function getProgram(id) {
  const db = getDb();
  return db.prepare('SELECT * FROM programs WHERE id = ?').get(id);
}

export default async function EditProgramPage({ params }) {
  const { id } = await params;
  const program = getProgram(id);
  if (!program) notFound();

  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Edit Program</h1>
      <ProgramForm program={program} />
    </div>
  );
}
