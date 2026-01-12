# Script de configuração rápida do Supabase para Windows
# Este script ajuda a configurar o banco de dados Supabase

Write-Host "🚀 Configuração do Supabase para Gestão Financeira 2026" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se o arquivo .env já existe
if (Test-Path .env) {
    Write-Host "⚠️  Arquivo .env já existe!" -ForegroundColor Yellow
    $overwrite = Read-Host "Deseja sobrescrevê-lo? (s/N)"
    if ($overwrite -ne "s" -and $overwrite -ne "S") {
        Write-Host "❌ Configuração cancelada." -ForegroundColor Red
        exit 0
    }
}

# Copiar o arquivo de exemplo
Write-Host "📋 Copiando .env.example para .env..." -ForegroundColor Green
Copy-Item .env.example .env -Force

Write-Host ""
Write-Host "📝 Agora vamos configurar suas variáveis de ambiente." -ForegroundColor Cyan
Write-Host ""
Write-Host "Para obter a URL de conexão do Supabase:" -ForegroundColor Yellow
Write-Host "1. Acesse https://supabase.com e faça login"
Write-Host "2. Selecione seu projeto (ou crie um novo)"
Write-Host "3. Vá em Settings > Database"
Write-Host "4. Copie a Connection String no modo 'Transaction' (porta 6543)"
Write-Host ""

# Solicitar a URL do banco de dados
$database_url = Read-Host "Cole a URL de conexão do Supabase"

if ([string]::IsNullOrWhiteSpace($database_url)) {
    Write-Host "❌ URL não pode estar vazia!" -ForegroundColor Red
    exit 1
}

# Gerar uma chave de sessão aleatória
$session_secret = -join ((65..90) + (97..122) + (48..57) | Get-Random -Count 32 | ForEach-Object {[char]$_})

# Criar o conteúdo do arquivo .env
$envContent = @"
# Banco de Dados Supabase
DATABASE_URL=$database_url

# Chave secreta para sessões (gerada automaticamente)
SESSION_SECRET=$session_secret

# Ambiente
NODE_ENV=development

# Porta do servidor
PORT=5001
"@

# Salvar o arquivo .env
$envContent | Out-File -FilePath .env -Encoding UTF8 -Force

Write-Host ""
Write-Host "✅ Arquivo .env configurado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "🗄️  Agora vamos criar as tabelas no banco de dados..." -ForegroundColor Cyan
Write-Host ""

# Verificar se node_modules existe
if (-not (Test-Path node_modules)) {
    Write-Host "📦 Instalando dependências..." -ForegroundColor Yellow
    npm install
}

# Executar o push do banco de dados
Write-Host "🔄 Criando tabelas no Supabase..." -ForegroundColor Cyan
npm run db:push

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Configuração concluída com sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Próximos passos:" -ForegroundColor Cyan
    Write-Host "   1. Execute: npm run dev" -ForegroundColor White
    Write-Host "   2. Acesse: http://localhost:5001" -ForegroundColor White
    Write-Host "   3. Faça login com:" -ForegroundColor White
    Write-Host "      - Usuário: admin" -ForegroundColor Yellow
    Write-Host "      - Senha: admin123" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "📖 Para mais informações, consulte GUIA-SUPABASE.md" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Erro ao criar as tabelas!" -ForegroundColor Red
    Write-Host "   Verifique se a URL do Supabase está correta." -ForegroundColor Yellow
    Write-Host "   Consulte GUIA-SUPABASE.md para mais ajuda." -ForegroundColor Yellow
    exit 1
}
