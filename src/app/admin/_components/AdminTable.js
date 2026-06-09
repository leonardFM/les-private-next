import styles from '@/app/admin/(dashboard)/admin.module.css';

export default function AdminTable({ columns, rows }) {
  if (!rows || rows.length === 0) return null;

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col, i) => (
                <th key={i} style={col.style}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.key || i}>
                {columns.map((col, j) => (
                  <td key={j}>{col.render ? col.render(row, i) : row[col.key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function EmptyState({ title, message }) {
  return (
    <div className={styles.emptyState}>
      <h3>{title || 'No data yet'}</h3>
      <p>{message || 'Items will appear here once added.'}</p>
    </div>
  );
}
