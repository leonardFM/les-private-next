import FaqForm from '../FaqForm';
import styles from '../../admin.module.css';

export default function NewFaqPage() {
  return (
    <div>
      <h1 className={styles.pageTitle} style={{ marginBottom: 24 }}>Add FAQ</h1>
      <FaqForm />
    </div>
  );
}
