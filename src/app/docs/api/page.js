import Script from 'next/script';
import styles from './api-docs.module.css';

export const metadata = {
  title: 'API Docs — Student API',
  description: 'Dokumentasi API role student (OpenAPI/Swagger).',
};

export default function ApiDocsPage() {
  return (
    <div className={styles.page}>
      <div id="swagger-ui" className={styles.swagger} />
      <link rel="stylesheet" href="/swagger/swagger-ui.css" />
      <Script src="/swagger/swagger-ui-bundle.js" />
      <Script src="/swagger/swagger-ui-standalone-preset.js" />
      <Script id="swagger-init" strategy="afterInteractive">
        {`
          window.addEventListener('DOMContentLoaded', function () {
            window.ui = SwaggerUIBundle({
              url: '/api/student-api.yaml',
              dom_id: '#swagger-ui',
              deepLinking: true,
              presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset,
              ],
              layout: 'StandaloneLayout',
            });
          });
        `}
      </Script>
    </div>
  );
}
