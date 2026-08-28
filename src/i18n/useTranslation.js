'use client';

import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';
import translations from './translations';

export function useTranslation() {
  const { locale } = useContext(LanguageContext);

  function t(key) {
    const keys = key.split('.');
    let value = translations[locale];
    for (const k of keys) {
      if (value == null) return key;
      value = value[k];
    }
    return value ?? key;
  }

  return { t, locale };
}
