import Link from 'next/link';
import styles from '@/app/admin/(dashboard)/admin.module.css';

export default function AdminPageHeader({ title, subtitle, addHref, addLabel }) {
  return (
    <div className={styles.pageHeader}>
      <div>
        <h1 className={styles.pageTitle}>{title}</h1>
        {subtitle && <p className={styles.pageSubtitle}>{subtitle}</p>}
      </div>
      {addHref && (
        <Link href={addHref} className={styles.addBtn}>{addLabel || `+ Add`}</Link>
      )}
    </div>
  );
}
