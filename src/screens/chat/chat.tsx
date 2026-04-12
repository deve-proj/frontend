import { useEffect, useState } from 'react'
import { ChatForm } from '../../components/chat/chatForm'
import { ScreenLayout } from '../../layouts/screenLayout/screenLayout'
import styles from './chat.module.scss'
import { ChatListItem, type ChatListItemProps } from '../../components/chatListItem/chatListItem'
import { Api } from '../../../api/api'
import { useChat } from '../../hooks/chat.hook'

export const Chat = ({roomName} : {roomName : string}) => {

    const [currentChat, setCurrentChat] = useState("")
    const [chats, setChats] = useState([])
    const {messages, sendMessage} = useChat(currentChat)

    useEffect(() => {

        (async () => {

            try
            {
                let result = await Api.ChatApi.getRoomsByUserId()

                if(result)
                    setChats(result.map(e => ({
                        chatName: e.name,
                        chatId: e.id,
                        logo_url: ""
                    })))
                    
                else
                    console.log("No chats")
            }

            catch(e)
            {
                console.error("An error occurred when getting chats: " + e)
            }

        })()

    }, [])

    return(

        <ScreenLayout>
            <div className={styles.main}>
                <ul className={styles.chatList}>
                    {
                        chats.map((chat, index) => (

                            <ChatListItem {...chat} isFocus={currentChat == chat.chatId} key={index} setFocusCallback={setCurrentChat}/>

                        ))
                    }
                </ul>
                <ChatForm roomId={currentChat}/>
            </div>
        </ScreenLayout>

    )

}