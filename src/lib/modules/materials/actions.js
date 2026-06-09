'use server';

import { revalidatePath } from 'next/cache';
import { query, get } from '@/lib/db';

export async function saveModule(formData) {
  const data = Object.fromEntries(formData);
  const { id, package_id, title, description, sort_order } = data;

  if (!package_id || !title) {
    return { error: 'Package and title are required.' };
  }

  if (id) {
    await query('UPDATE modules SET package_id=$1, title=$2, description=$3, sort_order=$4, updated_at=NOW() WHERE id=$5',
      [package_id, title, description || null, sort_order || 0, id]
    );
  } else {
    await query('INSERT INTO modules (package_id, title, description, sort_order) VALUES ($1, $2, $3, $4)',
      [package_id, title, description || null, sort_order || 0]
    );
  }

  revalidatePath('/admin/modules');
  return { success: true };
}

export async function deleteModule(formData) {
  const data = Object.fromEntries(formData);
  await query('DELETE FROM modules WHERE id = $1', [data.id]);
  revalidatePath('/admin/modules');
  return { success: true };
}

export async function saveMaterial(formData) {
  const data = Object.fromEntries(formData);
  const { id, module_id, title, type, content, file_url, sort_order } = data;

  if (!module_id || !title) {
    return { error: 'Module and title are required.' };
  }

  if (id) {
    await query('UPDATE materials SET module_id=$1, title=$2, type=$3, content=$4, file_url=$5, sort_order=$6 WHERE id=$7',
      [module_id, title, type || 'text', content || null, file_url || null, sort_order || 0, id]
    );
  } else {
    await query('INSERT INTO materials (module_id, title, type, content, file_url, sort_order) VALUES ($1, $2, $3, $4, $5, $6)',
      [module_id, title, type || 'text', content || null, file_url || null, sort_order || 0]
    );
  }

  revalidatePath(`/admin/modules/${module_id}`);
  return { success: true };
}

export async function deleteMaterial(formData) {
  const data = Object.fromEntries(formData);
  const material = await get('SELECT module_id FROM materials WHERE id = $1', [data.id]);
  await query('DELETE FROM materials WHERE id = $1', [data.id]);
  if (material) {
    revalidatePath(`/admin/modules/${material.module_id}`);
  }
  return { success: true };
}
