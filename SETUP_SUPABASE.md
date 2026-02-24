# 🗄️ SETUP DO SUPABASE — Cor Incensum

## O que é o Supabase?
Supabase é um banco de dados PostgreSQL gratuito com API REST automática.
Sem configurar o Supabase, o site funciona normalmente usando **localStorage** 
(dados ficam apenas no navegador do usuário).

---

## ✅ Passo a Passo para Configurar

### 1. Criar conta gratuita
Acesse: https://supabase.com
Clique em "Start for free" e crie sua conta.

### 2. Criar novo projeto
- Clique em "New Project"
- Escolha um nome (ex: cor-incensum)
- Defina uma senha para o banco
- Selecione a região mais próxima (ex: South America)
- Aguarde o projeto ser criado (1-2 min)

### 3. Criar as tabelas (rode no SQL Editor)

No painel do Supabase, vá em **SQL Editor** e execute:

```sql
-- Tabela de Orações
CREATE TABLE prayers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  category TEXT NOT NULL DEFAULT 'daily',
  text TEXT NOT NULL,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Novenas
CREATE TABLE novenas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  purpose TEXT,
  days JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_prayers_slug ON prayers(slug);
CREATE INDEX idx_prayers_category ON prayers(category);
CREATE INDEX idx_prayers_featured ON prayers(featured);
CREATE INDEX idx_novenas_slug ON novenas(slug);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_prayers_updated_at
  BEFORE UPDATE ON prayers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_novenas_updated_at
  BEFORE UPDATE ON novenas
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS (Row Level Security) — Leitura pública, escrita apenas autenticado
ALTER TABLE prayers ENABLE ROW LEVEL SECURITY;
ALTER TABLE novenas ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública
CREATE POLICY "Public can read prayers" ON prayers
  FOR SELECT USING (true);

CREATE POLICY "Public can read novenas" ON novenas
  FOR SELECT USING (true);

-- Permitir escrita com a chave anon (controlada pela senha do admin no app)
-- Em produção, considere usar autenticação Supabase Auth para mais segurança
CREATE POLICY "Anon can insert prayers" ON prayers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anon can update prayers" ON prayers
  FOR UPDATE USING (true);

CREATE POLICY "Anon can delete prayers" ON prayers
  FOR DELETE USING (true);

CREATE POLICY "Anon can insert novenas" ON novenas
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anon can update novenas" ON novenas
  FOR UPDATE USING (true);

CREATE POLICY "Anon can delete novenas" ON novenas
  FOR DELETE USING (true);
```

### 4. Obter as credenciais
No painel do Supabase:
- Vá em **Settings → API**
- Copie a **Project URL** e a **anon/public key**

### 5. Configurar o .env
Na pasta do projeto, copie o arquivo de exemplo:
```bash
cp .env.example .env
```

Edite o `.env`:
```env
VITE_SUPABASE_URL=https://SEU_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_PASSWORD=sua-senha-secreta-aqui
```

### 6. Reiniciar o servidor de desenvolvimento
```bash
npm run dev
```

---

## 🔐 Segurança do Admin

O painel admin usa:
- **Senha protegida** (configurável via `VITE_ADMIN_PASSWORD`)
- **Honeypot** (campo oculto para detectar bots)
- **Rate limiting** (cooldown entre tentativas)
- **Lockout automático** (bloqueia após 5 tentativas incorretas por 5 minutos)
- **Sessão temporária** (logout automático ao fechar o navegador via sessionStorage)

Para maior segurança em produção, considere:
- Usar o Supabase Auth com login real
- Adicionar CAPTCHA (ex: hCaptcha ou Turnstile da Cloudflare)
- Restringir as políticas RLS no Supabase para exigir autenticação

---

## 📦 Funcionamento sem Supabase

Se as variáveis VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não forem configuradas,
o site funciona completamente no modo **localStorage**:
- Os dados ficam salvos no navegador do usuário
- Ideal para uso pessoal ou testes locais
- Os dados de seed (orações e novenas incluídas) estarão disponíveis
- Dados inseridos via admin ficam no localStorage

---

## 🚀 Deploy Gratuito (Vercel ou Netlify)

### Vercel:
1. Suba o projeto para o GitHub
2. Acesse vercel.com e importe o repositório
3. Em "Environment Variables", adicione as mesmas variáveis do .env
4. Deploy!

### Netlify:
1. Suba o projeto para o GitHub  
2. Acesse netlify.com e conecte o repositório
3. Em "Site settings → Environment variables", adicione as variáveis
4. Deploy!
