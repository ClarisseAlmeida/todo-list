# 📝 Todo List App

Um projeto de lista de tarefas (Todo List) desenvolvido com **React** / **TypeScript**. Essa aplicação permite adicionar, editar, excluir, marcar tarefas como concluídas, aplicar filtros e visualizar um contador de tarefas pendentes. Tudo isso **usando o `localStorage` como armazenamento temporário**, já que ainda não há integração com API.

## 🚀 Funcionalidades

- ✅ Adicionar novas tarefas
- ✏️ Editar tarefas existentes
- ❌ Excluir tarefas
- ✔️ Marcar tarefas como concluídas ou ativas
- 🔍 Filtros:
  - Todas
  - Ativas
  - Concluídas
- 🔢 Contador de tarefas pendentes
- 💾 Persistência de dados com `localStorage`

## 📦 Como rodar o projeto localmente

# Clone o repositório
git clone https://github.com/seu-usuario/seu-repo.git

# Acesse a pasta do projeto
cd seu-repo

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start

## 🧪 Testes

O projeto conta com testes utilizando:

- **Jest** para testes unitários e de lógica
- **Testing Library** para testes de componentes (interações, acessibilidade e renderização)

# Rodar os testes
npm test

## 🔍 Estrutura do projeto

frontend/
├── src/
│ ├── components/ # Componentes React
│ ├── hooks/ # Custom hooks
│ ├── services/ # Serviços de API
│ ├── types/ # Definições de tipos TypeScript
│ ├── utils/ # Funções utilitárias
│ ├── App.tsx # Componente principal
│ └── index.tsx # Ponto de entrada
├── package.json
└── tsconfig.json