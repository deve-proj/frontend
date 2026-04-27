import { Chat } from "./screens/chat/chat"
import { NewChatFormContext, NewChatFormProvider } from "../core/providers/newChatForm.provider"
import { useContext, useEffect, useState } from "react"
import { NewChatForm } from "./components/newChatForm/newChatForm"
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { News } from "./screens/news/news"
import { Comments } from "./components/postItem/comments/comments"
import { UserApi } from "@DEVE-proj/deve_sdk"
import { Api } from "../api/api"

function App() {

    const [isAuth, setAuth] = useState(false)

    useEffect(() => {

        (async () => {

            try
            {
                const result = await new Api.UserApi().CheckAuth()

                console.log("Result: " + result)

                if(result.status == 200)
                    window.open("http://localhost:5174/news")
            }
            catch(e){}
        })()

    }, [])
    
    return(

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={isAuth ? '/news' : '/'}/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/news/:postId/comments" element={<Comments/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default App