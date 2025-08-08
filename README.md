# 🛒 STG Catalog - E-commerce Platform

Uma plataforma de e-commerce moderna com integração WhatsApp, desenvolvida com Next.js 14 e TypeScript. O sistema permite navegação de produtos, carrinho de compras e finalização de pedidos via WhatsApp.

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/supabase-green?style=for-the-badge)

## 📋 Descrição do Projeto

O **STG Catalog** é uma solução completa de e-commerce que permite aos usuários:

- 🔐 **Autenticação simples** com email e senha
- 📱 **Catálogo responsivo** com busca e filtros
- 🛍️ **Carrinho de compras** intuitivo
- 📞 **Integração WhatsApp** para finalização de pedidos
- 📊 **Histórico de pedidos** completo
- 🌙 **Modo escuro/claro** com persistência
- 💾 **Dados em memória** com localStorage para desenvolvimento

## 🚀 Tecnologias Utilizadas

### **Frontend**
- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Shadcn/ui** - Componentes UI modernos
- **Lucide React** - Ícones SVG
- **Next Themes** - Gerenciamento de temas

### **Estado e Dados**
- **React Context** - Gerenciamento de estado global
- **localStorage** - Persistência de dados do usuário
- **Supabase** - Banco de dados

### **Funcionalidades**
- **React Hook Form** - Gerenciamento de formulários
- **Sonner/Toast** - Notificações
- **Radix UI** - Componentes acessíveis

## 🤖 IA Utilizada

### **v0.dev**
- Todo o design base da aplicação foi feito pela IA da vercel através de um prompt pedindo uma loja de produdos com filtros, listagem e telas de login usando o estilo e-commerce moderno.

### 

## 🏃‍♂️ Como Rodar Localmente

### **Pré-requisitos**
- Node.js 18+ instalado
- npm, yarn ou pnpm

### **Instalação**

1. **Clone o repositório**
```bash
git clone https://github.com/ronalt4cs/stg-catalog-challenge.git
cd stg-catalog-challenge
```

2. **Instale as dependências (Exemplo com npm)**
```bash
npm install

```

3. **Variáveis de Ambiente**
- Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

```bash 
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
## crie um banco de dados no supabase para obter as variaveis ou
## use os valores default no arquivo .env.example 
```

4. **Criar tabelas no banco de dados (OPCIONAL)**
```bash
# Caso tenha criado uma conta no supabase 
supabase db push --file=scripts/create-table.sql
```
3. **Execute o projeto (Exemplo com npm)**
```bash
npm run dev
```

4. **Acesse no navegador**
```bash
http://localhost:3000
```
### **Scripts Disponíveis**

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de produção
npm run start    # Inicia servidor de produção
npm run lint     # Executa linting do código
```

## 🔗 Links Funcionais

### Deploy: https://stg-catalog-challenge-five.vercel.app/

### **Páginas Principais**
- 🏠 **Home**: `/` - Página inicial com apresentação
- 🔐 **Login**: `/login` - Autenticação de usuários
- 📝 **Registro**: `/register` - Criação de conta
- 📦 **Catálogo**: `/catalog` - Navegação de produtos
- 🛒 **Carrinho**: `/cart` - Gerenciamento do carrinho

### **Funcionalidades**
- 🔍 **Busca de produtos** - Pesquisa por nome/descrição
- 🏷️ **Filtros por categoria** - Electronics, Clothing, Home, Sports
- 📱 **Modal de produto** - Visualização detalhada
- 📞 **WhatsApp Integration** - Finalização via WhatsApp
- 📋 **Histórico de pedidos** - Acessível via menu do usuário
- 🌙 **Toggle tema** - Modo claro/escuro

## ✅ Checklist de Funcionalidades

### **🔐 Autenticação**
- [x] Sistema de login simples
- [x] Registro de novos usuários
- [x] Persistência de sessão (localStorage)
- [x] Logout com limpeza de dados
- [x] Proteção de rotas privadas

### **📦 Catálogo de Produtos**
- [x] Listagem de 12 produtos mock
- [x] 4 categorias (Electronics, Clothing, Home, Sports)
- [x] Busca por nome e descrição
- [x] Filtros por categoria
- [x] Layout responsivo (grid adaptativo)
- [x] Modal de detalhes do produto
- [x] Imagens placeholder dinâmicas

### **🛒 Carrinho de Compras**
- [x] Adicionar produtos ao carrinho
- [x] Atualizar quantidades
- [x] Remover itens individuais
- [x] Cálculo automático de totais
- [x] Persistência durante a sessão
- [x] Indicador visual na navbar
- [x] Página dedicada do carrinho

### **📞 Sistema de Pedidos**
- [x] Formulário de checkout completo
- [x] Validação de campos obrigatórios
- [x] Geração de mensagem WhatsApp formatada
- [x] Abertura automática do WhatsApp
- [x] Salvamento do pedido no histórico
- [x] Limpeza automática do carrinho

### **📊 Histórico de Pedidos**
- [x] Modal de histórico acessível
- [x] Listagem de pedidos por usuário
- [x] Detalhes completos de cada pedido
- [x] Status dos pedidos
- [x] Ordenação por data (mais recente primeiro)
- [x] Informações de contato e entrega

### **🎨 Interface e UX**
- [x] Design responsivo (mobile-first)
- [x] Modo escuro/claro com persistência
- [x] Componentes acessíveis (ARIA)
- [x] Notificações toast
- [x] Loading states
- [x] Estados vazios (carrinho/histórico)
- [x] Navegação intuitiva

### **⚡ Performance e Qualidade**
- [x] TypeScript para type safety
- [x] Componentes otimizados
- [x] Lazy loading de imagens
- [x] Código limpo e organizado
- [x] Tratamento de erros
- [x] Validação de formulários

## 📱 Como Usar

### **1. Primeiro Acesso**
1. Acesse `http://localhost:3000`
2. Clique em "Get Started" ou "Sign In"
3. Use qualquer email e senha com 6+ caracteres
4. Exemplo: `test@example.com` / `123456`

### **2. Navegação**
1. Após login, você será redirecionado para `/catalog`
2. Use a busca ou filtros para encontrar produtos
3. Clique nos produtos para ver detalhes
4. Adicione itens ao carrinho

### **3. Finalização**
1. Acesse o carrinho via ícone na navbar
2. Revise os itens e quantidades
3. Clique em "Finalizar Pedido"
4. Preencha os dados de entrega
5. Clique em "Enviar Pedido via WhatsApp"

### **4. Histórico**
1. Clique no ícone do usuário na navbar
2. Selecione "Order History"
3. Visualize todos os pedidos realizados

## 🔧 Configurações

### **WhatsApp**
Nehum número padrão foi configurado,mas você pode adicionar um no arquivo `components/checkout-modal.tsx`:
```typescript
const whatsappUrl = `https://wa.me/SEU_NUMERO?text=${message}`
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

**STG Catalog** - Sua solução completa de e-commerce com integração WhatsApp! 🚀
