# 🗄️ Guia de Configuração do Supabase

Este guia explica como configurar o banco de dados PostgreSQL do Supabase para a aplicação de Gestão Financeira.

## 📋 Índice

1. [Por que usar Supabase?](#por-que-usar-supabase)
2. [Criando uma conta no Supabase](#criando-uma-conta-no-supabase)
3. [Criando um novo projeto](#criando-um-novo-projeto)
4. [Obtendo a URL de conexão](#obtendo-a-url-de-conexão)
5. [Configurando as variáveis de ambiente](#configurando-as-variáveis-de-ambiente)
6. [Criando as tabelas do banco de dados](#criando-as-tabelas-do-banco-de-dados)
7. [Testando a conexão](#testando-a-conexão)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Por que usar Supabase?

O **Supabase** é uma alternativa open-source ao Firebase que oferece:

- ✅ **PostgreSQL gerenciado** - Banco de dados robusto e confiável
- ✅ **Plano gratuito generoso** - Até 500MB de armazenamento e 2GB de transferência
- ✅ **Interface visual** - Gerencie seus dados facilmente
- ✅ **Backups automáticos** - Seus dados estão seguros
- ✅ **SSL/TLS** - Conexão segura por padrão
- ✅ **Escalável** - Cresce com sua aplicação
- ✅ **Sem necessidade de servidor** - Não precisa instalar PostgreSQL localmente

---

## 🚀 Criando uma conta no Supabase

1. **Acesse o site oficial**: [https://supabase.com](https://supabase.com)

2. **Clique em "Start your project"** ou "Sign Up"

3. **Escolha um método de autenticação**:
   - GitHub (recomendado)
   - Google
   - Email/Senha

4. **Complete o cadastro** seguindo as instruções na tela

---

## 📦 Criando um novo projeto

Após fazer login no Supabase:

1. **Clique em "New Project"** no dashboard

2. **Preencha as informações do projeto**:
   ```
   Nome do Projeto: gestao-financeira-2026
   Database Password: [Crie uma senha forte e ANOTE-A!]
   Region: South America (São Paulo) - ou a região mais próxima
   Pricing Plan: Free (para começar)
   ```

3. **Clique em "Create new project"**

4. **Aguarde a criação** (pode levar 1-2 minutos)

> ⚠️ **IMPORTANTE**: Anote a senha do banco de dados! Você precisará dela para conectar.

---

## 🔗 Obtendo a URL de conexão

Após o projeto ser criado:

1. **Vá para Settings** (ícone de engrenagem no menu lateral)

2. **Clique em "Database"** no submenu

3. **Role até a seção "Connection string"**

4. **Selecione o modo "URI"**

5. **Escolha "Transaction" mode** (porta 6543)
   - ⚠️ **Não use o modo "Session"** - pode causar problemas com Drizzle ORM

6. **Copie a connection string**. Ela terá este formato:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

7. **Substitua `[YOUR-PASSWORD]`** pela senha que você criou no passo anterior

### Exemplo de URL completa:
```
postgresql://postgres.abcdefghijklmnop:MinhaSenh@Forte123@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
```

---

## ⚙️ Configurando as variáveis de ambiente

1. **Copie o arquivo de exemplo**:
   ```bash
   cp .env.example .env
   ```

2. **Abra o arquivo `.env`** no seu editor de código

3. **Cole a URL de conexão do Supabase**:
   ```bash
   DATABASE_URL=postgresql://postgres.abcdefghijklmnop:MinhaSenh@Forte123@aws-0-sa-east-1.pooler.supabase.com:6543/postgres
   ```

4. **Configure as outras variáveis**:
   ```bash
   # Gere uma chave aleatória forte em: https://randomkeygen.com/
   SESSION_SECRET=sua-chave-secreta-muito-forte-e-aleatoria-aqui
   
   NODE_ENV=development
   PORT=5001
   ```

5. **Salve o arquivo**

> 🔒 **SEGURANÇA**: Nunca compartilhe seu arquivo `.env` ou faça commit dele no Git!

---

## 🗃️ Criando as tabelas do banco de dados

A aplicação usa **Drizzle ORM** para gerenciar o banco de dados. Para criar as tabelas:

### Opção 1: Usando Drizzle Push (Recomendado para desenvolvimento)

```bash
npm run db:push
```

Este comando irá:
- Ler o schema definido em `shared/schema.ts`
- Criar todas as tabelas no Supabase
- Aplicar as constraints e índices

### Opção 2: Usando Migrations (Recomendado para produção)

Se você tiver migrations na pasta `migrations/`:

```bash
# Gerar uma nova migration (se necessário)
npx drizzle-kit generate

# Aplicar as migrations
npx drizzle-kit migrate
```

### Verificando as tabelas criadas

1. **Acesse o Supabase Dashboard**
2. **Vá em "Table Editor"** no menu lateral
3. **Você deverá ver as seguintes tabelas**:
   - `users` - Usuários do sistema
   - `suppliers` - Fornecedores
   - `clients` - Clientes
   - `categories` - Categorias de receitas/despesas
   - `cost_centers` - Centros de custo
   - `accounts_payable` - Contas a pagar
   - `accounts_receivable` - Contas a receber
   - `cash_flow_entries` - Lançamentos de caixa
   - `balance_adjustments` - Ajustes de saldo
   - `mercado_pago_transactions` - Transações do Mercado Pago

---

## ✅ Testando a conexão

1. **Inicie a aplicação**:
   ```bash
   npm run dev
   ```

2. **Verifique os logs** no terminal:
   ```
   ✓ Database connected successfully
   ✓ Seeding default data...
   ✓ Server running on http://localhost:5001
   ```

3. **Acesse a aplicação** em: [http://localhost:5001](http://localhost:5001)

4. **Faça login** com as credenciais padrão:
   ```
   Usuário: admin
   Senha: admin123
   ```

5. **Verifique se os dados de exemplo foram criados**:
   - Vá em "Fornecedores" - deve haver 2 fornecedores
   - Vá em "Clientes" - deve haver 2 clientes
   - Vá em "Categorias" - deve haver várias categorias
   - Vá em "Contas a Pagar" - deve haver algumas contas

---

## 🔧 Troubleshooting

### Erro: "DATABASE_URL environment variable is not set"

**Solução**: Verifique se o arquivo `.env` existe e contém a variável `DATABASE_URL`

### Erro: "password authentication failed"

**Solução**: 
- Verifique se a senha na URL está correta
- Certifique-se de que não há espaços extras na URL
- Tente resetar a senha do banco no Supabase Dashboard

### Erro: "Connection timeout"

**Solução**:
- Verifique sua conexão com a internet
- Certifique-se de estar usando a porta 6543 (Transaction mode)
- Verifique se não há firewall bloqueando a conexão

### Erro: "relation does not exist"

**Solução**: As tabelas não foram criadas. Execute:
```bash
npm run db:push
```

### Tabelas não aparecem no Supabase

**Solução**:
1. Vá em "Table Editor" no Supabase
2. Clique em "New Table" para verificar se consegue criar manualmente
3. Se conseguir, delete a tabela de teste e execute `npm run db:push` novamente

### Dados de exemplo não foram criados

**Solução**:
1. Pare a aplicação (Ctrl+C)
2. Delete todos os registros das tabelas no Supabase
3. Reinicie a aplicação com `npm run dev`
4. O seed será executado automaticamente

---

## 📊 Monitorando o banco de dados

### No Supabase Dashboard:

1. **Table Editor** - Visualize e edite dados diretamente
2. **SQL Editor** - Execute queries SQL personalizadas
3. **Database** > **Logs** - Veja logs de conexão e queries
4. **Database** > **Backups** - Configure backups automáticos

### Exemplo de query útil:

```sql
-- Ver total de contas a pagar por status
SELECT status, COUNT(*) as total, SUM(amount::numeric) as valor_total
FROM accounts_payable
GROUP BY status;

-- Ver total de contas a receber por status
SELECT status, COUNT(*) as total, SUM(amount::numeric) as valor_total
FROM accounts_receivable
GROUP BY status;
```

---

## 🎓 Próximos passos

Agora que seu banco de dados está configurado:

1. ✅ Explore a aplicação e familiarize-se com as funcionalidades
2. ✅ Customize as categorias e centros de custo conforme sua necessidade
3. ✅ Adicione seus fornecedores e clientes reais
4. ✅ Comece a registrar suas contas a pagar e receber
5. ✅ Configure backups automáticos no Supabase
6. ✅ Quando estiver pronto, faça o deploy seguindo o [GUIA-DEPLOY.md](./GUIA-DEPLOY.md)

---

## 📚 Recursos adicionais

- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do Drizzle ORM](https://orm.drizzle.team/docs/overview)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

---

## 💡 Dicas de boas práticas

1. **Backups regulares**: Configure backups automáticos no Supabase
2. **Senhas fortes**: Use senhas complexas e únicas
3. **Monitore o uso**: Fique de olho no uso do plano gratuito
4. **Índices**: Se a aplicação ficar lenta, considere adicionar índices
5. **Limpeza**: Remova dados de teste antes de usar em produção

---

## 🆘 Precisa de ajuda?

Se encontrar problemas não listados aqui:

1. Verifique os logs da aplicação no terminal
2. Verifique os logs do banco no Supabase Dashboard
3. Consulte a documentação do Supabase
4. Abra uma issue no repositório do projeto

---

**Desenvolvido com ❤️ para Casa Costa Ferragens e Utilidades**
