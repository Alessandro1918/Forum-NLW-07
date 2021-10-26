import { Request, Response } from 'express'
import { GetUserProfileService } from '../services/GetUserProfileService'

class GetUserProfileController {
    async handle(request: Request, response: Response) {
        
        //Get data
        const { user_id } = request     //user_id added to the req by the ensureAuth middleware

        //Instanciate new Service
        const service = new GetUserProfileService()

        //Execute
        try {
            const result = await service.execute(user_id)
            return response.json(result)
        } catch (err) {
            return response.json(err.message)
        }
    }
}

export { GetUserProfileController }