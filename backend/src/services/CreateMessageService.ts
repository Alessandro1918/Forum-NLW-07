import prismaClient from '../prisma'

import { io } from '../app'

class CreateMessageService {
    async execute(text: string, user_id: string) {
        const message = await prismaClient.message.create({
            data: {
                text,
                user_id
            }, 
            include: {
                user: true
            }
        })

        //Emitir evento: Nova Mensagem
        const infoWebSocket = {
            text, 
            user_id,
            created_at: message.created_at,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url
            }
        }
        io.emit("new_message", infoWebSocket)

        return message 
    }
}

export { CreateMessageService }