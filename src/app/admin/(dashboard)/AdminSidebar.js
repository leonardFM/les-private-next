'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { logout } from '@/lib/actions';
import styles from './admin.module.css';

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: '📊' },
  { label: 'Students', path: '/admin/students', icon: '👨‍🎓' },
  { label: 'Leads', path: '/admin/leads', icon: '📋' },
  { label: 'Programs', path: '/admin/programs', icon: '📚' },
  { label: 'Testimonials', path: '/admin/testimonials', icon: '⭐' },
  { label: 'FAQs', path: '/admin/faqs', icon: '❓' },
  { label: 'Settings', path: '/admin/settings', icon: '⚙️' },
];

export default function AdminSidebar({ user }) {
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
            <Link href="/admin" className={styles.brand} onClick={close}>El's Corner</Link>
            <span className={styles.brandSub}>Admin Panel</span>
          </div>
          <button className={styles.menuToggle} onClick={() => setOpen(false)} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
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
