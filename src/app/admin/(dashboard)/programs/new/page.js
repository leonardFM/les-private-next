import ProgramForm from '../ProgramForm';
import styles from '../../admin.module.css';

export default function NewProgramPage() {
  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Add Program</h1>
      <ProgramForm />
    </div>
  );
}
