-- Drop existing companies table if it exists with wrong schema
DROP TABLE IF EXISTS companies CASCADE;

-- Create companies table with correct schema
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

-- Create index for faster CNPJ searches
CREATE INDEX idx_companies_cnpj ON companies(cnpj);

-- Create index for status filtering
CREATE INDEX idx_companies_status ON companies(status);
