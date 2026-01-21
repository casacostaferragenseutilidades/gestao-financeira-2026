const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function recreateTable() {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS companies CASCADE;');
    console.log('Table dropped successfully');
    
    await client.query(`
      CREATE TABLE companies (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          nome TEXT NOT NULL,
          razao_social TEXT NOT NULL,
          cnpj TEXT NOT NULL UNIQUE,
          telefone TEXT,
          email TEXT,
          endereco TEXT,
          status TEXT NOT NULL DEFAULT 'ativa',
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('Table created successfully');
    
    await client.query('CREATE INDEX idx_companies_cnpj ON companies(cnpj);');
    await client.query('CREATE INDEX idx_companies_status ON companies(status);');
    console.log('Indexes created successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.release();
    await pool.end();
  }
}

recreateTable();
