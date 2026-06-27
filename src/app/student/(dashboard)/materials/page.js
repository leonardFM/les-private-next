import { initDb } from '@/lib/db';
import { verifyStudentSession } from '@/lib/student-dal';
import { getStudentModules, getMaterialsByModuleId } from '@/lib/modules/materials/data';
import styles from '../student.module.css';

function MaterialAction({ mat }) {
  if (mat.type === 'link' && mat.content) {
    return (
      <a href={mat.content} target="_blank" rel="noopener noreferrer" className="material-btn" style={{
        display: 'inline-block', padding: '4px 12px', background: 'var(--primary-blue, #004AAD)',
        color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 600, textDecoration: 'none',
      }}>Open ↗</a>
    );
  }
  if (mat.type === 'pdf' && (mat.file_url || mat.content)) {
    return (
      <a href={mat.file_url || mat.content} target="_blank" rel="noopener noreferrer" className="material-btn" style={{
        display: 'inline-block', padding: '4px 12px', background: 'var(--primary-blue, #004AAD)',
        color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 600, textDecoration: 'none',
      }}>View ↗</a>
    );
  }
  if (mat.type === 'video' && mat.content) {
    return (
      <a href={mat.content} target="_blank" rel="noopener noreferrer" className="material-btn" style={{
        display: 'inline-block', padding: '4px 12px', background: '#DC2626',
        color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 600, textDecoration: 'none',
      }}>Watch ↗</a>
    );
  }
  if (mat.file_url) {
    return (
      <a href={mat.file_url} target="_blank" rel="noopener noreferrer" className="material-btn" style={{
        display: 'inline-block', padding: '4px 12px', background: 'var(--primary-blue, #004AAD)',
        color: '#fff', borderRadius: 6, fontSize: 12, fontWeight: 600, textDecoration: 'none',
      }}>Download ↗</a>
    );
  }
  if (mat.content) {
    return <span style={{ fontSize: 12, color: 'var(--foreground-muted)' }}>
      {mat.content.length > 60 ? mat.content.substring(0, 60) + '...' : mat.content}
    </span>;
  }
  return <span style={{ fontSize: 12, color: 'var(--foreground-muted)' }}>-</span>;
}

export default async function StudentMaterialsPage() {
  await initDb();
  const session = await verifyStudentSession();
  const modules = await getStudentModules(session.id);

  const modulesWithMaterials = await Promise.all(
    modules.map(async (mod) => {
      const materials = await getMaterialsByModuleId(mod.id);
      return { ...mod, materials };
    })
  );

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Learning Materials</h1>
          <p className={styles.pageSubtitle}>Access your course modules and materials</p>
        </div>
      </div>

      {modulesWithMaterials.length === 0 ? (
        <div className={styles.emptyState}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📖</div>
          <h3>No materials available</h3>
          <p>Learning materials will appear here once they are assigned to your packages.</p>
        </div>
      ) : (
        modulesWithMaterials.map(mod => (
          <div key={mod.id} className={styles.sectionCard}>
            <div className={styles.sectionCardHeader}>
              <div>
                <h3>{mod.title}</h3>
                <p style={{ margin: '4px 0 0', fontSize: 'var(--text-xs)', color: 'var(--foreground-muted)' }}>{mod.package_name}</p>
              </div>
            </div>
            {mod.description && (
              <div style={{ padding: '12px 20px', fontSize: 'var(--text-sm)', color: 'var(--foreground-muted)', borderBottom: '1px solid var(--border-color, #E5E7EB)', lineHeight: 1.5 }}>
                {mod.description}
              </div>
            )}
            {mod.materials.length === 0 ? (
              <div style={{ padding: 20, fontSize: 'var(--text-sm)', color: 'var(--foreground-muted)', textAlign: 'center' }}>
                No materials in this module yet.
              </div>
            ) : (
              <div className={styles.sectionCardBody}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mod.materials.map(mat => (
                      <tr key={mat.id}>
                        <td style={{ fontWeight: 600 }}>{mat.title}</td>
                        <td><span className={styles.badge} style={{ background: '#DBEAFE', color: '#1E40AF' }}>{mat.type}</span></td>
                        <td><MaterialAction mat={mat} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
