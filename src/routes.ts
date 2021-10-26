import { Router } from 'express'
import { AuthenticateUserController } from './controllers/AuthenticateUserController'
import { CreateMessageController } from './controllers/CreateMessageController'
import { Get3LastMessagesController } from './controllers/Get3LastMessagesController'
import { GetUserProfileController } from './controllers/GetUserProfileController'
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

//Make a POST req to baseUrl/authenticate
//with body: {"code": "b7b7dc2c8b78c63378da"}
router.post("/authenticate", new AuthenticateUserController().handle)

//Make a POST req to baseUrl/messages
//with Body: {"message": "..."}
//and Auth: Bearer, with token: jwt from "/authenticate"
router.post("/messages", ensureAuth, new CreateMessageController().handle)

//Make a GET req to baseUrl/messages/last3
router.get("/messages/last3", new Get3LastMessagesController().handle)

//Make a GET req to baseUrl/userProfile
//with Auth: Bearer, and token: jwt from "/authenticate"
router.get("/userProfile", ensureAuth, new GetUserProfileController().handle)

export { router }