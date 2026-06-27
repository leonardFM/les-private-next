'use client';

import { createContext, useState, useEffect, useCallback } from 'react';

export const ThemeContext = createContext();

function setThemeCookie(theme) {
  if (typeof window === 'undefined') return;
  document.cookie = `theme=${theme};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function ThemeProvider({ children, initialTheme = 'light' }) {
  const [theme, setThemeState] = useState(() => {
    if (typeof window === 'undefined') return initialTheme;
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') {
        if (stored !== initialTheme) setThemeCookie(stored);
        return stored;
      }
    } catch {}
    return initialTheme;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', next); } catch {}
      setThemeCookie(next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
