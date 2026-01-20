-- Adicionar campo 'color' na tabela de categorias
-- Migration: add-category-color.sql

ALTER TABLE categories 
ADD COLUMN IF NOT EXISTS color TEXT;

-- Comentário sobre o novo campo
COMMENT ON COLUMN categories.color IS 'Cor da categoria para identificação visual (green, blue, red, yellow, purple, pink, orange, cyan, indigo, gray)';
