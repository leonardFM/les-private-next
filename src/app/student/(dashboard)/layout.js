import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { SidebarProvider } from './SidebarProvider';
import StudentSidebar from './StudentSidebar';
import HamburgerToggle from './HamburgerToggle';
import styles from './student.module.css';

export default async function StudentDashboardLayout({ children }) {
  await initDb();
  const session = await verifyStudentSession();

  return (
    <SidebarProvider>
      <div className={styles.layout}>
        <StudentSidebar user={session} />
        <div className={styles.content}>
          <header className={styles.topbar}>
            <HamburgerToggle />
            <span className={styles.greeting}>Welcome, {session.name}</span>
          </header>
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
