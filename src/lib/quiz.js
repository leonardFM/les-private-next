const OPENVERSE_ENDPOINT = 'https://api.openverse.org/v1/images/';
const PEXELS_ENDPOINT = 'https://api.pexels.com/v1/search';

const CATEGORIES = {
  animals: ['cat', 'dog', 'bird', 'fish', 'cow', 'rabbit'],
  fruits: ['apple', 'banana', 'orange', 'grapes', 'strawberry', 'lemon'],
  objects: ['ball', 'book', 'car', 'pencil', 'clock', 'umbrella'],
};

const QUESTION_COUNT = 5;
const OPTIONS_PER_QUESTION = 4;
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

const cache = new Map();

function pick(arr, count, exclude = []) {
  const pool = arr.filter((x) => !exclude.includes(x));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

async function searchOpenverse(keyword) {
  const params = new URLSearchParams({ q: keyword, page_size: '6', format: 'json' });
  const res = await fetch(`${OPENVERSE_ENDPOINT}?${params}`);
  if (!res.ok) {
    throw new Error(`Openverse error ${res.status} for "${keyword}"`);
  }
  const data = await res.json();
  return (data.results || [])
    .filter((r) => r.url && r.url.startsWith('http') && !r.mature)
    .map((r) => ({
      url: r.url,
      title: r.title || keyword,
      license: r.license ? `${r.license}${r.license_version ? ` ${r.license_version}` : ''}` : '',
      creator: r.creator || '',
      source: r.source || '',
    }));
}

async function searchPexels(keyword) {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error('PEXELS_API_KEY is not configured.');
  }
  const params = new URLSearchParams({ query: keyword, per_page: '6', orientation: 'landscape' });
  const res = await fetch(`${PEXELS_ENDPOINT}?${params}`, {
    headers: { Authorization: apiKey },
  });
  if (!res.ok) {
    throw new Error(`Pexels error ${res.status} for "${keyword}"`);
  }
  const data = await res.json();
  return (data.photos || []).map((p) => ({
    url: p.src.large2x || p.src.large,
    title: p.alt || keyword,
    license: 'Pexels',
    creator: p.photographer || '',
    source: 'pexels',
  }));
}

export async function searchImages(keyword) {
  if (cache.has(keyword)) {
    const entry = cache.get(keyword);
    if (Date.now() - entry.time < CACHE_TTL_MS) {
      return entry.images;
    }
    cache.delete(keyword);
  }

  let images;
  if (process.env.PEXELS_API_KEY) {
    images = await searchPexels(keyword);
  } else {
    images = await searchOpenverse(keyword);
  }

  if (images.length === 0) {
    throw new Error(`No images found for "${keyword}".`);
  }

  cache.set(keyword, { images, time: Date.now() });
  return images;
}

export async function buildQuestions({ category, count = QUESTION_COUNT } = {}) {
  const keywords = CATEGORIES[category];
  if (!keywords) {
    throw new Error(`Unknown category "${category}".`);
  }

  const imagePool = {};
  for (const keyword of keywords) {
    imagePool[keyword] = await searchImages(keyword);
  }

  const questions = [];
  for (let i = 0; i < count; i++) {
    const correctKeyword = keywords[i % keywords.length];
    const distractors = pick(keywords, OPTIONS_PER_QUESTION - 1, [correctKeyword]);

    const options = [
      { src: imagePool[correctKeyword][0].url, keyword: correctKeyword },
      ...distractors.map((kw) => ({ src: imagePool[kw][0].url, keyword: kw })),
    ];

    for (let j = options.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [options[j], options[k]] = [options[k], options[j]];
    }
    const correctIndex = options.findIndex((o) => o.keyword === correctKeyword);

    questions.push({
      promptKeyword: correctKeyword,
      correctIndex,
      options,
    });
  }

  return questions;
}

export function getCategories() {
  return Object.keys(CATEGORIES);
}
