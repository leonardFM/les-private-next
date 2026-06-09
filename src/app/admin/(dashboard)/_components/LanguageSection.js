import styles from '../admin.module.css';

export default function LanguageSection({ lang, children }) {
  return (
    <>
      <h3 className={styles.langLabel}>{lang === 'id' ? 'Indonesian' : 'English'}</h3>
      {children}
      <hr className={styles.langDivider} />
    </>
  );
}
