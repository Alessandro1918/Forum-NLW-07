import "dotenv/config"      //tem que ser sempre o primeiro import
import express from 'express'

import { router } from './routes'

//Adding the socket.io
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

const app = express()
app.use(cors())
//No código da aula, essas linhas a seguir estão abaixo da declaração do httpServer e ainda funcionam 
app.use(express.json())     //antes de qualquer rota, fazer o express entender json no body
app.use(router)

//V2 - Adicionando WebSockets no app:
const httpServer = http.createServer(app)
const io = new Server(httpServer, {cors: {origin: "*"}})

//Monitorar evento: Nova conexão
//Quem está criando essa conexão? o frontend do public/index.html
io.on("connection", socket => {
    console.log(`Usuário conectado no socket ${socket.id}`)
})

//V1 - o app vai subir o Servidor - Sem websockets
//rodar o arquivo app.ts com o script npm run dev
/*app.listen(3333, () => {
    console.log("Server is running on port 3333")
})*/

//V2 - o httpServer vai subir o Servidor - Com websockets
//exportar a const httpServer para o arquivo server.ts e
//rodar o arquivo server.ts com o script npm run dev
//export { httpServer, io }

//V2 alternativo: Ou posso deixar tudo junto no app.ts mesmo
httpServer.listen(3333, () => {
    console.log("Server is running on PORT 3333")
})
export { io }