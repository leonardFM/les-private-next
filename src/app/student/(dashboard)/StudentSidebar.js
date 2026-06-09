'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { logout } from '@/lib/actions';
import styles from './student.module.css';

const navItems = [
  { label: 'Dashboard', path: '/student/dashboard', icon: '📊' },
  { label: 'Packages', path: '/student/packages', icon: '📦' },
  { label: 'My Packages', path: '/student/my-packages', icon: '🎓' },
  { label: 'Payments', path: '/student/payments', icon: '💳' },
  { label: 'Profile', path: '/student/profile', icon: '👤' },
];

export default function StudentSidebar({ user }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function close() { setOpen(false); }

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
            <span className={styles.brandSub}>Student Portal</span>
          </div>
          <button className={styles.menuToggle} onClick={() => setOpen(false)} aria-label="Close menu">
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
