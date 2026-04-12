import { useEffect } from "react"
import AuthScreen from "./screens/auth/auth.screen"
import { Api } from '../api/api'
import { ChatForm } from "./components/chat/chatForm"
import { Chat } from "./screens/chat/chat"

function App() {

    // useEffect(() => {
        
    //     (async () => {

    //         try
    //         {
    //             let api = new Api.UserApi()
    //             let result = await api.CreateUser()
    //             console.log("Результат:", result.data.token)

    //         }
    //         catch (error)
    //         {
    //             console.error("Ошибка:", error)
    //         }
    //     })();

    // }, [])

    return(

        <Chat roomName="main"/>

    )
}

export default App