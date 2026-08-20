import { buildQuestions, getCategories } from '@/lib/quiz';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'animals';

  if (!getCategories().includes(category)) {
    return Response.json({ error: `Unknown category "${category}".` }, { status: 400 });
  }

  try {
    const questions = await buildQuestions({ category });
    return Response.json({ category, questions });
  } catch (err) {
    return Response.json({ error: err.message || 'Failed to build questions.' }, { status: 502 });
  }
}
