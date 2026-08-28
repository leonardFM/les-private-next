'use client';

import { createContext } from 'react';

export const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  return (
    <LanguageContext.Provider value={{ locale: 'id' }}>
      {children}
    </LanguageContext.Provider>
  );
}
