# Forum-NLW-07

## 🚀 Projeto
Um forum com atualização instantânea de novas mensagens!

<p align="center">
    <img src="github/web.png" alt="main page" title="Main page" width="75%"/>
</p>

- 📊 Backend:    Done! ✅
- 🖼️ Frontend:   🚧 Em construção 🚧

## 🛠️ Tecnologias
- [Node.js](https://nodejs.org/en/)
- [JWT](https://jwt.io) (Autenticação de usuários por meio de tokens assinados pelo servidor da API)
- [Github login](https://github.com/settings/developers) (Faça login na plataforma usando sua conta do Github)

## 🗂️ Utilização

### 🐑🐑 Clonando o repositório:

```bash
  $ git clone https://github.com/Alessandro1918/Forum-NLW-07.git
```

### ▶️ Rodando o App:

📊 Backend
```bash
  $ cd backend

  # Download dependencies to node_modules
  $ npm install
  
  # Start the project:
  $ npm run dev
  
  # Routes:
  # Check usage and comments at file src/routes.ts
  $ GET  http://localhost:3333/github           # Get Github authorization code
  $ POST http://localhost:3333/authenticate     # Generates a JSON Web Token (jwt) with the user's info
  $ POST http://localhost:3333/messages         # Post a message in the forum (save it in the db)
  $ GET  http://localhost:3333/messages/last3   # Get the user's 3 last messages
  $ GET  http://localhost:3333/userProfile      # Get the user's info

```
