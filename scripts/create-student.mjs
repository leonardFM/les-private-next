import 'dotenv/config';
import pg from 'pg';
import bcrypt from 'bcryptjs';

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
  const name = process.argv[2] || 'Student Demo';
  const email = process.argv[3] || 'student@demo.com';
  const password = process.argv[4] || 'student123';
  const phone = process.argv[5] || '081234567890';

  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    console.log(`User already exists: ${email}`);
    await pool.end();
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 12);
  const userResult = await query(
    'INSERT INTO users (name, email, password_hash, role, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [name, email, hash, 'student', phone]
  );
  const userId = userResult.rows[0].id;

  const studentResult = await query(
    'INSERT INTO students (name, email, phone, user_id) VALUES ($1, $2, $3, $4) RETURNING id',
    [name, email, phone, userId]
  );
  const studentId = studentResult.rows[0].id;

  console.log('Student account created successfully!');
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
  console.log(`  Name:     ${name}`);
  console.log(`  User ID:  ${userId}`);
  console.log(`  Student ID: ${studentId}`);

  await pool.end();
  process.exit(0);
}

main().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
