import { createContext, ReactNode, useEffect, useState } from 'react'
import { VscSignOut } from 'react-icons/vsc'
import { api } from '../services/api'

type User = {
    id: string;
    name: string;
    login: string;
    avatar_url: string;
}

//What this component provides?
type AuthContextData = {
    user: User | null;      //object (or null)
    signinUrl: string;      //string
    signOut: () => void;    //function with no return
}

export const AuthContext = createContext({} as AuthContextData)

// **********

type AuthProvider = {
    children: ReactNode
}

type AuthResponse = {
    token: string;
    user: {
        avatar_url: string;
        login: string;
        name: string;
        id: string;
    }
}

//Usar esse componente ao redor do <App/> em main.tsx
export function AuthProvider(props: AuthProvider) {
    
    const GITHUB_CLIENT_ID = 'b22430625d75230c6e75'
    const signinUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${GITHUB_CLIENT_ID}`
    
    const [ user, setUser ] = useState<User | null>(null)


    //if browser has token in storage
    useEffect(() => {
        const token = localStorage.getItem('@dowhile:token')

 
        if (token) {

            //use the 'get user's info' route from backend:

            //Make a GET req to baseUrl/userProfile
            //with Auth: Bearer, and token: jwt from "/authenticate"
            
            //axios headers:
            //v1 - AuthenticateUserService.ts, line 56
            //v2:
            api. defaults.headers.common.authorization = `Bearer ${token}`

            api.get<User>('userProfile').then(response => {
                //console.log(response.data)
                setUser(response.data)
            })
        }
    }, [])

    function signOut() {
        setUser(null)
        localStorage.removeItem('@dowhile:token')
    }

    //function used by the next useEffect
    async function signin(githubCode: string) {
        const response = await api.post<AuthResponse>('authenticate', {
            code: githubCode    //adding code to axios req's body
        })
        const {token, user} = response.data
        localStorage.setItem('@dowhile:token', token)   //saves the token in the browser
        //console.log(user)
        setUser(user)
    }
    
    //if browser does not have token in storage
    useEffect(() => {
        const url = window.location.href    //get the page's url: baseUrl/signin/callback?code=49b1ca3f2277384dacec)
        const hasGithubCode = url.includes('?code=')
        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=')
            //console.log({urlWithoutCode, githubCode})
            window.history.pushState({}, '', urlWithoutCode)    //sends the user to a page without the code visible on the browsers address bar
            signin(githubCode)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, signinUrl, signOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}