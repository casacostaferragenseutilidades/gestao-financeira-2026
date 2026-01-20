-- Migration específica para adicionar campo color na tabela categories
-- Arquivo: 0001_add_category_color.sql

-- Adicionar campo color à tabela categories
ALTER TABLE categories 
ADD COLUMN color TEXT;

-- Opcional: Adicionar valores padrão para categorias existentes
UPDATE categories 
SET color = CASE 
    WHEN type = 'income' THEN 'green'
    WHEN type = 'expense' THEN 'red'
    ELSE 'gray'
END 
WHERE color IS NULL;
