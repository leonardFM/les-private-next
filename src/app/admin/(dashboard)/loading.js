import styles from './admin.module.css';

export default function AdminLoading() {
  return (
    <div className={styles.emptyState}>
      <h3>Loading...</h3>
      <p>Please wait while we load the data.</p>
    </div>
  );
}
