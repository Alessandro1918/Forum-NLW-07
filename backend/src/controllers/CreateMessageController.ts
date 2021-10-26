import { Request, Response } from 'express'
import { CreateMessageService } from '../services/CreateMessageService'

class CreateMessageController {
    async handle(request: Request, response: Response) {
        
        //Get data
        const { message } = request.body
        const { user_id } = request     //user_id added to the req by the ensureAuth middleware

        //Instanciate new Service
        const service = new CreateMessageService()

        //Execute
        try {
            const result = await service.execute(message, user_id)
            return response.json(result)
        } catch (err) {
            return response.json(err.message)
        }
    }
}

export { CreateMessageController }