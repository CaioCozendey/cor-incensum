# ✝️ Cor Incensum — Coração Inflamado

Site de orações e devoção católica inspirado no **Sagrado Coração de Jesus** e em **São Padre Pio de Pietrelcina**.

## ✨ Funcionalidades

- 🏠 Página inicial com Hero, Oração do Dia e destaques
- 📿 Listagem de orações com busca, filtro por categoria e ordenação
- 📖 Página individual de oração com modo leitura e ajuste de fonte
- 📅 Novenas com controle de progresso dia a dia (localStorage)
- ❤️ Sistema de favoritos (localStorage)
- 🔐 Painel Admin protegido por senha para criar/editar/deletar orações
- 🌙 Dark mode (tema Padre Pio) / ☀️ Light mode (tema Sagrado Coração)
- 📱 Totalmente responsivo

## 🚀 Como Instalar e Rodar

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente (opcional — ver SETUP_SUPABASE.md)
cp .env.example .env
# Edite o .env com suas credenciais

# 3. Rodar em desenvolvimento
npm run dev

# 4. Build para produção
npm run build
```

## 🗄️ Banco de Dados

Consulte o arquivo **SETUP_SUPABASE.md** para instruções completas de configuração do banco Supabase.

**Sem configurar o banco**, o site funciona com localStorage (dados ficam no navegador).

## 🔐 Acesso ao Admin

Acesse `/admin` e use a senha configurada em `VITE_ADMIN_PASSWORD`.
Senha padrão: `cor-incensum-admin-2024` (altere antes de publicar!)

## 🎨 Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Vermelho profundo | `#7a1c1c` | Primário, botões, destaques |
| Dourado suave | `#c9a227` | Acentos, bordas, ícones |
| Azul mariano | `#0f1c2e` | Fundo dark, secundário |
| Bege pergaminho | `#f4efe6` | Fundo light, textos dark |

## 📦 Tecnologias

- **React 18** + **TypeScript**
- **Vite** (bundler)
- **Tailwind CSS 3**
- **React Router v6**
- **Supabase** (banco de dados, opcional)
- **Lucide React** (ícones)

## 🙏 Citação

> "Rezai, esperai e não vos preocupeis."
> — São Padre Pio de Pietrelcina
