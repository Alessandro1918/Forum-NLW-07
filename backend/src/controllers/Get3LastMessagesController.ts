import { Request, Response } from 'express'
import { Get3LastMessagesService } from '../services/Get3LastMessagesService'

class Get3LastMessagesController {
    async handle(request: Request, response: Response) {
        
        //Get data
        //...

        //Instanciate new Service
        const service = new Get3LastMessagesService()

        //Execute
        try {
            const result = await service.execute()
            return response.json(result)
        } catch (err) {
            return response.json(err.message)
        }
    }
}

export { Get3LastMessagesController }