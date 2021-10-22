import { Request, Response } from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

class AuthenticateUserController {
    //async handle(request, response) {     //without autocomplete
    async handle(request: Request, response: Response) {

        //Get data
        const { code } = request.body

        //Instanciate new Service
        const service = new AuthenticateUserService()
        
        try {
            const result = await service.execute(code)
            return response.json(result)
        } catch (err) {
            return response.json(err.message)
        }
    }
}

export { AuthenticateUserController }