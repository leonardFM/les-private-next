'use client';

import { createContext, useState, useEffect, useCallback } from 'react';

export const LanguageContext = createContext();

function setLocaleCookie(locale) {
  document.cookie = `locale=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('id');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored && stored !== 'id') {
      setLocale(stored);
      setLocaleCookie(stored);
    } else {
      setLocaleCookie('id');
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', next);
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
