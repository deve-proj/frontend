import { Header } from '../../components/header/header'
import styles from './sceenLayout.module.scss'

export const ScreenLayout = ({children}) => {

    return(
        
        <div className={styles.main}>
            <div className={styles.content}>
                <Header/>
                {children}
            </div>
        </div>

    )

}