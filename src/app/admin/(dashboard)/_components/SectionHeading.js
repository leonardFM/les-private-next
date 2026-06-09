import styles from '../admin.module.css';

export default function SectionHeading({ children, style }) {
  return <h2 className={styles.sectionHeading} style={style}>{children}</h2>;
}
