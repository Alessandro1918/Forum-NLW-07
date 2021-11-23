import axios from 'axios'
import prismaClient from '../prisma'
import { sign } from 'jsonwebtoken'

interface IAccessTokenResponse {
    access_token: string
}

interface IUserResponse {
    avatar_url: string,
    login: string,
    name: string,
    id: number
}

/**
 * Receber code (string)
 * Recuperar o access_token do github, usar para recuperar as info do user
 * Verificar se user existe na db. Se NÃO, adicionar
 * Retorna um jwt com as info do user
 */

class AuthenticateUserService {
    async execute(code: string) {
        
        //Receber code (string)
        //const response = await axios.post(
        const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(
            //desestruturei o retorno do axios (data) e passei para a var accessTokenResponse
            "https://github.com/login/oauth/access_token",
            null,   //2nd arg: data
            {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code
                },
                headers: {
                    Accept: "application/json"
                }
            }
        )
        //return response.data
        /**
        {
            "access_token": "gho_wzCfRhn2THgE31oFUGJVy...",
            "token_type": "bearer",
            "scope": ""
        } */
        
        //Recuperar o access_token do github, usar para recuperar as info do user
        //const response = await axios.get(
        const response = await axios.get<IUserResponse>(
            "https://api.github.com/user",
            { 
                headers: {
                    authorization: `Bearer ${accessTokenResponse.access_token}`
                }
            }
        )
        //return response.data
        /**
        {
            "login": "Alessandro1918",
            "id": 54996931,
            "avatar_url": "https://avatars.githubusercontent.com/u/54996931?v=4",
            "name": "Alessandro B. Cesta",
            "location": "São Paulo, BR",
            "created_at": "2019-09-06T17:09:09Z",
            "updated_at": "2021-10-14T18:15:41Z"
        } */

        //Verificar se user existe na db, Se NÃO, adicionar
        const { login, id, avatar_url, name } = response.data
        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id
            }
        })
        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id, avatar_url, name, login 
                }
            })
        }

        //Retorna um jwt com as info do user
        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                }
            }, 
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        )
        return { user, token }
    }
}

export { AuthenticateUserService }