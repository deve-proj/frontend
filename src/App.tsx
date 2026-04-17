import { Chat } from "./screens/chat/chat"
import { NewChatFormContext, NewChatFormProvider } from "../core/providers/newChatForm.provider"
import { useContext } from "react"
import { NewChatForm } from "./components/newChatForm/newChatForm"

function App() {
    
    return(

        <div style={{display: "flex", width: "100%", height: "100%", position: "relative"}}>
            <Chat/>
        </div>

    )
}

export default App