import { initDb } from '@/lib/db';
import { getAllPackages } from '@/lib/data';
import ModuleForm from '../ModuleForm';

export default async function NewModulePage() {
  await initDb();
  const packages = await getAllPackages();
  return <ModuleForm packages={packages} />;
}
