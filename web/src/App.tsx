import styles from './styles/App.module.scss'  //npm install sass
import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'

export function App() {
  return (
    <main className={styles.contentWrapper}>
      <MessageList/>
      <LoginBox/>
    </main>
  )
}