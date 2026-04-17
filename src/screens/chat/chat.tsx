import { useContext, useEffect, useState } from 'react'
import { ChatBlock } from '../../components/chat/chatBlock'
import { ScreenLayout } from '../../layouts/screenLayout/screenLayout'
import styles from './chat.module.scss'
import { ChatListItem, type ChatListItemProps } from '../../components/chatListItem/chatListItem'
import { Api } from '../../../api/api'
import { useChat } from '../../hooks/chat.hook'
import { NewChatForm } from '../../components/newChatForm/newChatForm'
import { NewChatFormContext } from '../../../core/providers/newChatForm.provider'
import { Resizable } from 're-resizable'

export const Chat = () => {

    const [currentChat, setCurrentChat] = useState("")
    const [chats, setChats] = useState<ChatListItemProps[]>()
    const {openModal, closeModal, data} = useContext(NewChatFormContext)

    useEffect(() => {

        if(data.chatId)
        {
            setCurrentChat(data.chatId)
            setChats(prev => [...prev, {chatName: data.chatName, chatId: data.chatId, isFocus: true, logoUrl: data.chatLogo}])
        }

    }, [data.chatId])

    useEffect(() => {

        (async () => {

            try
            {
                let result = await Api.ChatApi.getRoomsByUserId()

                if(result)
                    setChats(result.map(e => ({
                        chatName: e.name,
                        chatId: e.id,
                        logoUrl: e.logo_url,
                        lastMessage: e.lastMessage
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
                <Resizable 
                    defaultSize={{width: 300, height: "100%"}}
                    maxWidth={"80%"}
                    minWidth={50}
                    minHeight={"100%"}
                    maxHeight={"100%"}
                    enable={{
                        top: false,
                        right: true,      // только правый край
                        bottom: false,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false
                    }}
                >
                    <ul className={styles.chatList}>
                        {
                            chats && chats.map((chat, index) => (

                                <ChatListItem {...chat} isFocus={currentChat == chat.chatId} key={index} setFocusCallback={setCurrentChat}/>

                            ))
                        }
                        <img src='plus.svg' onClick={openModal} className={styles.plus}/>
                    </ul>
                </Resizable>
                <ChatBlock roomId={currentChat} key={currentChat}/>
            </div>
        </ScreenLayout>

    )

}