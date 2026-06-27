'use client';

import { useSidebar } from './SidebarProvider';
import styles from '../admin.module.css';

export default function HamburgerToggle() {
  const { toggle } = useSidebar();

  return (
    <button className={styles.menuToggle} onClick={toggle} aria-label="Toggle menu">
      ☰
    </button>
  );
}
