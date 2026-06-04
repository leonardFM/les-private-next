'use client';

import { createContext, useState } from 'react';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'id';
    }
    return 'id';
  });

  const toggleLocale = () => {
    setLocale((prev) => {
      const next = prev === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}
