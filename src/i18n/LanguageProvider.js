'use client';

import { createContext, useState, useEffect, useCallback } from 'react';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('id');

  useEffect(() => {
    const stored = localStorage.getItem('locale');
    if (stored && stored !== 'id') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocale(stored);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', next);
      return next;
    });
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
