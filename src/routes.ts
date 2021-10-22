import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'
import { ensureAuth } from './middlewares/ensureAuth'

const router = Router()

//Tentando entrar em baseUrl/github, 
//ele vai redirecionar para a página de Autorização
router.get("/github", (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`)
})

//E a pág de Autorização vai redirecionar para:
//baseUrl/signin/callback?code=49b1ca3f2277384dacec
router.get("/signin/callback", (req, res) => {
    const { code } = req.query
    return res.json(code)
})

//Make a POST req to baseUrl/authenticate with body: {"code": "b7b7dc2c8b78c63378da"}
/**
 * Receber code (string)
 * Recuperar o access_token do github, usar para recuperar as info do user
 * Verificar se user existe na db. Se NÃO, adicionar
 * Retorna um jwt com as info do user
 */
router.post("/authenticate", new AuthenticateUserController().handle)

/**
 * Make a POST req to baseUrl/messages
 * with Body: {"message": "..."}
 * and Auth: Bearer, with token: jwt from "/authenticate"
 */
router.post("/messages", ensureAuth, new CreateMessageController().handle)

export { router }