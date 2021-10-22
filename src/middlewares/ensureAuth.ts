import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}

//Ensure user is authenticated
export function ensureAuth(request: Request, response: Response, next: NextFunction) {
    
    //POST req @ "baseUrl/messages" with Auth: Bearer and token: jwt
    //assembled the following string in the req's header:
    //"Bearer eyJhbGciOiJIU...6IkpXVCJ9"
    const authToken = request.headers.authorization
    
    if (!authToken) {
        return response.status(401).json({errorCode: "token is invalid"})     //Unauthorized
    }

    //Desestruturar o token da string 
    const [,token] = authToken.split(" ")

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload
        /**
         * token, with: user, iat (Issued At Time), exp (Expiration), 
         * and sub (Subject), to which I passed the value user_id @ AuthenticateUserService file
         * {
         *      user: {
         *          name: 'Alessandro B. Cesta',
         *          avatar_url: 'https://avatars.githubusercontent.com/u/54996931?v=4',
         *          id: '3f6f605d-e194-4a0b-af07-bf0b7858466e'
         *      },
         *      iat: 1634869966,
         *      exp: 1634956366,
         *      sub: '3f6f605d-e194-4a0b-af07-bf0b7858466e'
         * }
         */
        request.user_id = sub       //add this to the req so the Controller can use it after
        return next()
    } catch(err) {
        return response.status(401).json({errorCode: "token is expired"})
    }
}