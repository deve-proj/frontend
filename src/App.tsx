import { Chat } from "./screens/chat/chat"
import { NewChatFormContext, NewChatFormProvider } from "../core/providers/newChatForm.provider"
import { useContext } from "react"
import { NewChatForm } from "./components/newChatForm/newChatForm"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import { News } from "./screens/news/news"
import { Comments } from "./components/postItem/comments/comments"

function App() {
    
    return(

        <BrowserRouter>
            <Routes>
                <Route path="/news" element={<News/>}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/news/:postId/comments" element={<Comments/>}/>
            </Routes>
        </BrowserRouter>

    )
}

export default App