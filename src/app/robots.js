export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/student/', '/api/', '/docs/'],
      },
    ],
    sitemap: 'https://elscorner.com/sitemap.xml',
  };
}
