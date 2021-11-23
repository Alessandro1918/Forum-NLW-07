import { useContext } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'

import styles from './styles.module.scss'



export function LoginBox() {

    //Toda a lógica de signin que antes estava aqui
    //foi para AuthContext em contexts/auth.tsx

    const { signinUrl, user } = useContext(AuthContext)
    
    console.log('User:', user)

    //this <a> gets the Github Authorization Code, the same way
    //as the 'baseUrl/github' route from the background

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signinUrl} className={styles.signinWithGithub}>
                <VscGithubInverted size="24"/>
                Entrar com Github
            </a>
        </div>
    )
}