export default function PublicLoading() {
  return (
    <div style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div className="skeleton" style={{ height: 32, width: '60%', marginBottom: 24 }} />
      <div className="skeleton" style={{ height: 16, width: '40%', marginBottom: 48 }} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton" style={{ height: 200 }} />
        ))}
      </div>
    </div>
  );
}
