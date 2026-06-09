import { initDb } from '@/lib/db';
import { verifySession } from '@/lib/dal';
import AdminSidebar from './AdminSidebar';
import HamburgerToggle from './_components/HamburgerToggle';
import styles from './admin.module.css';

initDb();

export default async function AdminDashboardLayout({ children }) {
  const session = await verifySession();

  return (
    <div className={styles.layout}>
      <AdminSidebar user={session} />
      <div className={styles.content}>
        <header className={styles.topbar}>
          <HamburgerToggle />
          <span className={styles.greeting}>Welcome, {session.name}</span>
        </header>
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
