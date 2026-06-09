import { notFound } from 'next/navigation';
import Link from 'next/link';
import { initDb } from '@/lib/db';
import { getModuleById, getMaterialsByModuleId } from '@/lib/modules/materials/data';
import { getAllPackages } from '@/lib/data';
import { saveMaterial, deleteMaterial } from '@/lib/modules/materials/actions';
import ModuleForm from '../ModuleForm';
import AdminPageHeader from '@/app/admin/_components/AdminPageHeader';
import DeleteForm from '@/app/admin/_components/DeleteForm';
import FormActions from '@/app/admin/_components/FormActions';
import styles from '../../admin.module.css';

export default async function ModuleDetailPage({ params, searchParams }) {
  await initDb();
  const { id } = await params;
  const sp = await searchParams;
  const [mod, materials, packages] = await Promise.all([
    getModuleById(id),
    getMaterialsByModuleId(id),
    getAllPackages(),
  ]);

  if (!mod) notFound();

  const showAddMaterial = sp?.addMaterial === '1';
  const editMaterialId = sp?.editMaterial ? Number(sp.editMaterial) : null;
  const editMaterial = editMaterialId ? materials.find(m => m.id === editMaterialId) : null;

  return (
    <div>
      <ModuleForm packages={packages} module={mod} />

      <div style={{ marginTop: 32 }}>
        <AdminPageHeader title="Materials" subtitle={`Materials in ${mod.title}`} addHref={`/admin/modules/${mod.id}?addMaterial=1`} addLabel="+ Add Material" />

        {materials.length > 0 ? (
          <div className={styles.tableWrapper} style={{ marginBottom: 24 }}>
            <div className={styles.tableScroll}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Content</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map(mat => (
                    <tr key={mat.id}>
                      <td style={{ fontWeight: 600 }}>{mat.title}</td>
                      <td><span className={styles.badge}>{mat.type}</span></td>
                      <td>
                        {mat.type === 'link' && mat.content ? (
                          <a href={mat.content} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>Open ↗</a>
                        ) : mat.type === 'pdf' && mat.file_url ? (
                          <a href={mat.file_url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>View PDF ↗</a>
                        ) : mat.content ? (
                          <span style={{ fontSize: 12, color: 'var(--foreground-muted)', maxWidth: 200, display: 'inline-block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mat.content}</span>
                        ) : mat.file_url ? (
                          <a href={mat.file_url} target="_blank" rel="noopener noreferrer" className={styles.actionBtn}>Download ↗</a>
                        ) : '-'}
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <Link href={`/admin/modules/${mod.id}?editMaterial=${mat.id}`} className={styles.actionBtn}>Edit</Link>
                          <DeleteForm action={deleteMaterial} id={mat.id} redirectHref={`/admin/modules/${mod.id}`}>
                            <button type="submit" className={`${styles.actionBtn} ${styles.actionDanger}`}>Delete</button>
                          </DeleteForm>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className={styles.emptyState} style={{ marginBottom: 24 }}>
            <h3>No materials yet</h3>
            <p>Add materials like PDFs, videos, links, or text content to this module.</p>
          </div>
        )}

        {(showAddMaterial || editMaterial) && (
          <div className={styles.formCard}>
            <h3 style={{ margin: '0 0 16px' }}>{editMaterial ? 'Edit Material' : 'Add New Material'}</h3>
            <form action={saveMaterial}>
              <input type="hidden" name="module_id" value={mod.id} />
              {editMaterial && <input type="hidden" name="id" value={editMaterial.id} />}

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Title *</label>
                <input type="text" name="title" className={styles.formInput} defaultValue={editMaterial?.title || ''} required />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Type *</label>
                  <select name="type" className={styles.formSelect} defaultValue={editMaterial?.type || 'text'} required>
                    <option value="text">Text</option>
                    <option value="pdf">PDF</option>
                    <option value="video">Video</option>
                    <option value="link">Link</option>
                    <option value="document">Document</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Sort Order</label>
                  <input type="number" name="sort_order" className={styles.formInput} defaultValue={editMaterial?.sort_order || 0} min="0" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {editMaterial?.type === 'link' ? 'URL' : editMaterial?.type === 'pdf' ? 'PDF URL' : editMaterial?.type === 'video' ? 'Video URL' : 'Content'}
                </label>
                <textarea name="content" className={styles.formTextarea} defaultValue={editMaterial?.content || ''} rows={3} placeholder={editMaterial?.type === 'link' ? 'https://...' : editMaterial?.type === 'video' ? 'https://youtube.com/...' : 'Enter content text or URL'} />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>File URL (for uploads)</label>
                <input type="text" name="file_url" className={styles.formInput} defaultValue={editMaterial?.file_url || ''} placeholder="/uploads/filename.pdf" />
              </div>

              <FormActions cancelHref={`/admin/modules/${mod.id}`} submitLabel={editMaterial ? 'Update Material' : 'Add Material'} />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
