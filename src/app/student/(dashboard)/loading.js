import styles from './student.module.css';

export default function StudentLoading() {
  return (
    <div className={styles.emptyState}>
      <h3>Loading...</h3>
      <p>Please wait while we load your data.</p>
    </div>
  );
}
