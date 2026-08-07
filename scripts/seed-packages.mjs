import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function query(text, params) {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
}

async function main() {
  const existing = await query('SELECT COUNT(*) AS count FROM packages');
  if (Number(existing.rows[0].count) > 0) {
    console.log('Packages already exist.');
    await pool.end();
    process.exit(0);
  }

  const packages = [
    { name: 'Starter Pack', description: '10 sesi untuk memulai perjalanan belajar bahasa Inggris.', total_sessions: 10, price: 450000 },
    { name: 'Standard Pack', description: '20 sesi dengan harga lebih hemat. Cocok untuk belajar rutin.', total_sessions: 20, price: 800000 },
    { name: 'Premium Pack', description: '30 sesi belajar intensif dengan pendampingan penuh.', total_sessions: 30, price: 1100000 },
    { name: 'Ultimate Pack', description: '50 sesi untuk program belajar jangka panjang. Investasi terbaik!', total_sessions: 50, price: 1700000 },
  ];

  for (const pkg of packages) {
    await query(
      'INSERT INTO packages (name, description, total_sessions, price, active) VALUES ($1, $2, $3, $4, 1)',
      [pkg.name, pkg.description, pkg.total_sessions, pkg.price]
    );
  }

  console.log('Packages seeded successfully!');
  console.table(packages);

  await pool.end();
  process.exit(0);
}

main().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
