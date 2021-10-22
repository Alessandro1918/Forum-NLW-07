import "dotenv/config"      //tem que ser sempre o primeiro import
import express from 'express'

import { router } from './routes'

const app = express()
app.use(express.json())     //antes de qualquer rota, fazer o express entender json no body

app.use(router)

app.listen(3333, () => {
    console.log("Server is running on port 3333")
})