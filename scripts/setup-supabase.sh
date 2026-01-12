#!/bin/bash

# Script de configuração rápida do Supabase
# Este script ajuda a configurar o banco de dados Supabase

echo "🚀 Configuração do Supabase para Gestão Financeira 2026"
echo "======================================================="
echo ""

# Verificar se o arquivo .env já existe
if [ -f .env ]; then
    echo "⚠️  Arquivo .env já existe!"
    read -p "Deseja sobrescrevê-lo? (s/N): " overwrite
    if [ "$overwrite" != "s" ] && [ "$overwrite" != "S" ]; then
        echo "❌ Configuração cancelada."
        exit 0
    fi
fi

# Copiar o arquivo de exemplo
echo "📋 Copiando .env.example para .env..."
cp .env.example .env

echo ""
echo "📝 Agora vamos configurar suas variáveis de ambiente."
echo ""
echo "Para obter a URL de conexão do Supabase:"
echo "1. Acesse https://supabase.com e faça login"
echo "2. Selecione seu projeto (ou crie um novo)"
echo "3. Vá em Settings > Database"
echo "4. Copie a Connection String no modo 'Transaction' (porta 6543)"
echo ""

# Solicitar a URL do banco de dados
read -p "Cole a URL de conexão do Supabase: " database_url

if [ -z "$database_url" ]; then
    echo "❌ URL não pode estar vazia!"
    exit 1
fi

# Gerar uma chave de sessão aleatória
session_secret=$(openssl rand -base64 32 2>/dev/null || cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1)

# Atualizar o arquivo .env
cat > .env << EOF
# Banco de Dados Supabase
DATABASE_URL=$database_url

# Chave secreta para sessões (gerada automaticamente)
SESSION_SECRET=$session_secret

# Ambiente
NODE_ENV=development

# Porta do servidor
PORT=5001
EOF

echo ""
echo "✅ Arquivo .env configurado com sucesso!"
echo ""
echo "🗄️  Agora vamos criar as tabelas no banco de dados..."
echo ""

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Executar o push do banco de dados
echo "🔄 Criando tabelas no Supabase..."
npm run db:push

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Configuração concluída com sucesso!"
    echo ""
    echo "🎉 Próximos passos:"
    echo "   1. Execute: npm run dev"
    echo "   2. Acesse: http://localhost:5001"
    echo "   3. Faça login com:"
    echo "      - Usuário: admin"
    echo "      - Senha: admin123"
    echo ""
    echo "📖 Para mais informações, consulte GUIA-SUPABASE.md"
else
    echo ""
    echo "❌ Erro ao criar as tabelas!"
    echo "   Verifique se a URL do Supabase está correta."
    echo "   Consulte GUIA-SUPABASE.md para mais ajuda."
    exit 1
fi
