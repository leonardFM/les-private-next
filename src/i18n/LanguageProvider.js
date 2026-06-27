'use client';

import { createContext, useState, useCallback } from 'react';

export const LanguageContext = createContext();

function setLocaleCookie(locale) {
  if (typeof window === 'undefined') return;
  document.cookie = `locale=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function LanguageProvider({ children, initialLocale = 'id' }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window === 'undefined') return initialLocale;
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
    const val = match?.[1] || initialLocale;
    try { localStorage.setItem('locale', val); } catch {}
    return val;
  });

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'id' ? 'en' : 'id';
      try { localStorage.setItem('locale', next); } catch {}
      setLocaleCookie(next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
