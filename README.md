# Teste - Desafio Extractta

## Problema

### 1. Desenvolvimento de API RESTful

- **Criação da API**: Desenvolva uma API RESTful simples utilizando Node.js e TypeScript para realizar operações CRUD em um recurso (por exemplo, `User`). Utilize o framework **Express** ou **NestJS**. A API deve incluir:
  - Validação de dados
  - Tratamento de erros
  - Autenticação básica (JWT)

- **Testes Unitários**: Escreva testes unitários para os endpoints da API utilizando **Jest** ou **Mocha**.

### 2. Integração com Banco de Dados

- **Integração**: Implemente a integração da API com um banco de dados (por exemplo, **PostgreSQL** ou **MongoDB**) utilizando **TypeORM**, **Mongoose** ou outro ORM/ODM.
  
- **Migrações e Integridade dos Dados**:
  - Explique como trataria as migrações de banco de dados.
  - Descreva como garantiria a integridade dos dados durante as atualizações.

### 3. Middleware e Segurança

- **Middleware**: Implemente um middleware que registre todas as requisições HTTP, incluindo:
  - Método
  - URL
  - Tempo de resposta

- **Segurança**: Adicione medidas de segurança à API, como:
  - Proteção contra ataques de força bruta
  - Proteção contra SQL Injection

## Tecnologias

### Backend

- **NestJS**: Framework para Node.js que utiliza TypeScript para construir aplicações escaláveis e eficientes, oferecendo uma arquitetura modular e suporte a injeção de dependências.

- **MongoDB**: Banco de dados NoSQL conhecido por sua escalabilidade e flexibilidade na modelagem de dados.

- **TypeScript**: Linguagem que adiciona tipagem estática ao JavaScript, melhorando a segurança e clareza do código e facilitando a manutenção e refatoração.

- **Winston**: Biblioteca de logging para gerenciamento avançado de logs, com suporte a diferentes níveis e destinos.

- **Docker**: Plataforma de containerização que facilita a implementação e escalabilidade de aplicações, garantindo consistência em diferentes ambientes.

- **Lint**: Ferramenta de análise estática de código que ajuda a manter a qualidade e a consistência do código ao identificar e corrigir problemas.

- **Swagger**: Ferramenta para documentar APIs, gerando uma interface interativa para visualizar e testar endpoints diretamente no navegador.

- **Jest**: Framework de testes para JavaScript que fornece uma abordagem para testes unitários e de integração, com suporte a mocks e spies.

- **ClassValidator**: Biblioteca para validação de objetos em TypeScript e JavaScript, permitindo aplicar regras de validação usando decorators.

- **Conceitos de Liveness e Readiness**: Conceitos para monitoramento e gerenciamento de serviços em ambientes de produção. Liveness verifica se o serviço está funcionando, enquanto Readiness verifica se o serviço está pronto para receber tráfego.

### Frontend

- **React**: Biblioteca para construção de interfaces de usuário, permitindo criar componentes reutilizáveis e gerenciar o estado da aplicação de forma eficiente.

- **Vite**: Ferramenta de build rápida para aplicações web, com suporte a módulos ES e Hot Module Replacement (HMR), proporcionando uma experiência de desenvolvimento mais ágil.

- **Material UI**: Biblioteca de componentes de interface do usuário com um design moderno e responsivo, baseada nas diretrizes de Material Design do Google.

## Documentação geral

- [Documentação Geral](https://docs.google.com/document/d/1iiRtF6rb8TOX9TKp6acEYXblnuL25Y0hxBDpXrflSyA/edit?usp=sharing)

## Instalação

### Backend

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd pasta-do-repositorio
   ```

2. **Renomear os .env.example para .env**

3. **Rodar o comando**
 ```bash
   docker compose up #Windows
   docker-compose up --build #Linux
```

4. **Usuário para teste:**
- **usuário:** user_root
- **senha:** 123456


### Rodar o eslint

1. **Backend**

   ```bash
   cd backend
   yarn lint
   ```

2. **Frontend**

   ```bash
   cd frontend
   yarn lint
   ```

### Rodar os testes

1. **Backend**

   ```bash
   cd backend
   yarn test
   ```

2. **Frontend**

   ```bash
   cd frontend
   yarn test
   ```