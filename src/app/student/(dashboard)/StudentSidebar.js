'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/actions';
import { useSidebar } from './SidebarProvider';
import styles from './student.module.css';

const navItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: '📊' },
  { label: 'Tutoring Packages', path: '/student/packages', icon: '📦' },
  { label: 'My Sessions', path: '/student/my-packages', icon: '🎯' },
  { label: 'Schedules', path: '/student/schedules', icon: '📅' },
  { label: 'Materials', path: '/student/materials', icon: '📖' },
  { label: 'Homework', path: '/student/homeworks', icon: '📝' },
  { label: 'Payments', path: '/student/payments', icon: '💳' },
  { label: 'Profile', path: '/student/profile', icon: '👤' },
];

export default function StudentSidebar({ user }) {
  const pathname = usePathname();
  const { open, close } = useSidebar();

  return (
    <>
      <div
        className={`${styles.sidebarOverlay} ${open ? styles.sidebarOverlayVisible : ''}`}
        onClick={close}
      />

      <aside className={`${styles.sidebar} ${open ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <div>
            <Link href="/student/dashboard" className={styles.brand} onClick={close}>El&apos;s Corner</Link>
            <span className={styles.brandSub}>Private Tutoring</span>
          </div>
          <button className={styles.menuToggle} onClick={close} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={close}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <span className={styles.userName}>{user.name}</span>
          <span className={styles.userEmail}>{user.email}</span>
          <form action={logout}>
            <button type="submit" className={styles.logoutBtn}>Sign Out</button>
          </form>
        </div>
      </aside>
    </>
  );
}
