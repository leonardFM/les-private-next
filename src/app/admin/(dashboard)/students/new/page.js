import StudentForm from '../StudentForm';
import styles from '../../admin.module.css';

export default async function NewStudentPage() {
  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Add Student</h1>
      <StudentForm />
    </div>
  );
}
