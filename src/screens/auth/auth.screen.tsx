import Regist from '../../components/regist/regist';
import style from './auth.module.scss'

function AuthScreen()
{
    return(

        <div className={style.main}>
            <section className={style.previewText}>
                <p>Welcome to <img src='logo.png'/></p>
            </section>
            <Regist/>
        </div>

    )
}

export default AuthScreen;