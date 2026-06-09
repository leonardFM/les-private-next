'use client';

import styles from '../admin.module.css';

export default function HamburgerToggle() {
  function openMenu() {
    const sidebar = document.querySelector('[class*="sidebar"]');
    const overlay = document.querySelector('[class*="sidebarOverlay"]');
    if (sidebar) sidebar.classList.add(styles.sidebarOpen);
    if (overlay) overlay.classList.add(styles.sidebarOverlayVisible);
  }

  return (
    <button className={styles.menuToggle} onClick={openMenu} aria-label="Open menu" style={{ display: 'block', color: 'var(--foreground)' }}>
      ☰
    </button>
  );
}
