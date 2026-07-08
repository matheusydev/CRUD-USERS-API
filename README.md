<div align="center">

# 👤 CRUD Users API

### API REST para gerenciamento de usuários, construída como projeto de prática em Node.js

[![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.3-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/docs)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

</div>

> Projeto pessoal de prática, desenvolvido para treinar a construção de uma API REST do zero com Node.js, Express,
> Prisma e MongoDB. Não é vinculado a nenhuma disciplina ou trabalho em grupo — feito individualmente para consolidar
> conceitos de backend.

---

## 📋 Sobre o projeto

A API implementa um CRUD completo de usuários, cobrindo desde a modelagem do schema no Prisma até o tratamento de
erros nas rotas, usando o MongoDB Atlas como banco de dados na nuvem.

O foco principal do projeto foi praticar:
- Configuração de um servidor Express do zero, com ES Modules
- Modelagem de dados no Prisma para um banco não-relacional (MongoDB)
- Operações de CRUD (Create, Read, Update, Delete) via Prisma Client
- Tratamento de erros nas rotas de escrita/remoção

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia    | Versão | Uso                                       |
|---------------|--------|--------------------------------------------|
| Node.js       | 24.x   | Ambiente de execução                       |
| Express       | 5.x    | Framework do servidor HTTP                 |
| Prisma        | 6.19.3 | ORM e gerador do client de acesso ao banco  |
| @prisma/client| 6.19.3 | Client gerado para consultas type-safe      |
| MongoDB Atlas | —      | Banco de dados na nuvem (NoSQL)             |
| dotenv        | —      | Carregamento de variáveis de ambiente       |

---

## 📁 Estrutura de Pastas

```bash
CRUD-USERS-API/
├── prisma/
│   └── schema.prisma       # Definição do model User e datasource
├── generated/
│   └── prisma/             # Prisma Client gerado (ignorado no Git)
├── server.js                # Servidor Express + rotas do CRUD
├── prisma.config.ts          # Configuração do Prisma CLI (schema, migrations, datasource)
├── .env                       # Variáveis de ambiente (ignorado no Git)
├── .gitignore
├── package.json
└── README.md
```

---

## 🗄️ Modelo de dados

O model `User` foi definido no `schema.prisma` para uso com MongoDB, usando `ObjectId` como identificador:

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  name  String
  age   String
}
```

> **Nota:** o campo `age` está como `String` por enquanto — é um ponto que pretendo revisar futuramente (provavelmente
> para `Int`), mas ficou assim durante o desenvolvimento inicial do CRUD.

---

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você tem o **Node.js 24.x** (ou superior) instalado.
- Você tem uma conta e um cluster configurado no **MongoDB Atlas** (ou uma instância local do MongoDB).
- Compatível com `Windows`, `Linux` e `macOS`.

---

## ⚙️ Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com a sua string de conexão do MongoDB:

```env
DATABASE_URL="mongodb+srv://usuario:senha@cluster0.xxxxx.mongodb.net/Users?retryWrites=true&w=majority&appName=Cluster0"
```

> Repare que o nome do banco (`Users`, no exemplo) precisa estar incluído na URL, antes do `?`.

---

## 🚀 Instalando e executando o projeto

```bash
git clone https://github.com/matheusydev/CRUD-USERS-API.git
cd CRUD-USERS-API
npm install
npx prisma generate
node --watch server.js
```

A API estará disponível em `http://localhost:3000/`

---

## ☕ Usando a API

### Exemplo — criar um usuário

`POST /usuarios`

```json
{
  "email": "maria@email.com",
  "name": "Maria Silva",
  "age": "28"
}
```

### Exemplo — listar usuários filtrando por nome

`GET /usuarios?name=Maria Silva`

---

## 🗺️ Endpoints da API

### Usuários — `/usuarios`

| Método   | Endpoint         | Descrição                                                    |
|----------|------------------|---------------------------------------------------------------|
| `POST`   | `/usuarios`      | Cadastra um novo usuário                                       |
| `GET`    | `/usuarios`      | Lista todos os usuários (aceita `?name=` para filtrar por nome) |
| `PUT`    | `/usuarios/:id`  | Atualiza um usuário existente                                   |
| `DELETE` | `/usuarios/:id`  | Remove um usuário                                                |

---

## 🧠 Decisões Técnicas

### `prisma-client-js` em vez do novo `prisma-client`

O Prisma 6/7 introduziu um novo gerador (`prisma-client`), que produz código em TypeScript por padrão. Como este
projeto é JavaScript puro (sem TypeScript), optei por manter o gerador clássico `prisma-client-js`, que gera arquivos
`.js` diretamente compatíveis com Node, sem exigir um compilador TypeScript no meio do caminho.

### `engine: "classic"` no `prisma.config.ts`

Durante a configuração inicial, o Prisma 6.19 apresentou inconsistências de validação de schema relacionadas ao motor
usado por padrão. Fixar `engine: "classic"` no `prisma.config.ts` resolveu o problema e manteve a compatibilidade com
o formato clássico de `datasource` no `schema.prisma`.

### `String` + `@db.ObjectId` como identificador

Diferente de bancos relacionais, o MongoDB não suporta `autoincrement()`. O Prisma exige que o identificador seja do
tipo `String`, mapeado para o `_id` nativo do MongoDB via `@map("_id") @db.ObjectId`.

### Tratamento de erros nas rotas de escrita

As rotas `POST`, `PUT` e `DELETE` usam `try/catch` para capturar erros do Prisma (como tentar atualizar ou deletar um
`id` inexistente) e devolver respostas HTTP apropriadas, em vez de deixar a exceção derrubar a requisição.

---

## 🎓 Aprendizados Adquiridos

- ✅ Configuração de um servidor Express do zero com ES Modules (`import`/`export`)
- ✅ Diferenças práticas entre CommonJS (`require`) e ES Modules no Node.js
- ✅ Modelagem de dados no Prisma para um banco não-relacional (MongoDB)
- ✅ Diferenças entre os geradores `prisma-client-js` e `prisma-client`
- ✅ Uso do `prisma.config.ts` para configuração do Prisma CLI (schema, migrations, datasource)
- ✅ Operações de CRUD via Prisma Client (`create`, `findMany`, `update`, `delete`)
- ✅ Filtros de consulta com `where` a partir de query strings (`req.query`)
- ✅ Tratamento de erros em rotas assíncronas com `try/catch`
- ✅ Boas práticas de `.gitignore` para projetos com Prisma (variáveis de ambiente e client gerado)
- ✅ Fluxo de Git com Conventional Commits e branches (`feat/`, `fix/`, `chore/`)



