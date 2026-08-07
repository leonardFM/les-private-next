import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'docs', 'student-api.yaml');
  const spec = await readFile(filePath, 'utf8');

  return new Response(spec, {
    headers: {
      'Content-Type': 'text/yaml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
