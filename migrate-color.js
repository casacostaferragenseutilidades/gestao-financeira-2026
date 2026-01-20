import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';

// Carregar variáveis de ambiente
config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL não encontrada');
}

const client = postgres(connectionString);
const db = drizzle(client);

async function runMigration() {
  try {
    console.log('Executando migração para adicionar campo color...');
    
    // Adicionar campo color à tabela categories
    await db.execute(sql`
      ALTER TABLE categories 
      ADD COLUMN IF NOT EXISTS color TEXT;
    `);
    
    console.log('Campo color adicionado com sucesso!');
    
    // Atualizar categorias existentes com cores padrão
    await db.execute(sql`
      UPDATE categories 
      SET color = CASE 
        WHEN type = 'income' THEN 'green'
        WHEN type = 'expense' THEN 'red'
        ELSE 'gray'
      END 
      WHERE color IS NULL;
    `);
    
    console.log('Cores padrão atribuídas às categorias existentes!');
    console.log('Migração concluída com sucesso!');
    
  } catch (error) {
    console.error('Erro durante a migração:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();
