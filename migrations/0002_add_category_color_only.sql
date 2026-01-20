-- Migration específica apenas para adicionar campo color
-- Arquivo: 0002_add_category_color_only.sql

-- Adicionar campo color à tabela categories (se não existir)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name='categories' 
        AND column_name='color'
        AND table_schema = current_schema()
    ) THEN
        ALTER TABLE categories ADD COLUMN color TEXT;
        
        -- Atualizar categorias existentes com cores padrão
        UPDATE categories 
        SET color = CASE 
            WHEN type = 'income' THEN 'green'
            WHEN type = 'expense' THEN 'red'
            ELSE 'gray'
        END 
        WHERE color IS NULL;
    END IF;
END $$;
