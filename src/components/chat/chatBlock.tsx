import { useEffect, useState, useRef, type Dispatch, type SetStateAction } from 'react'
import styles from './chatBlock.module.scss'
import { useChat } from '../../hooks/chat.hook'
import { Api } from '../../../api/api'

export const ChatBlock = ({roomId, closeChatCallback} : {roomId : string, closeChatCallback : () => any}) => {

    const { messages: wsMessages, sendMessage } = useChat(roomId)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const handleSend = () => {

        if(input.trim())
        {
            sendMessage(input);
            setInput("");
        }
    }

    useEffect(() => {

        if(roomId)
        {
            localStorage.setItem("user_id", "f47ac10b-58cc-4372-a567-0e02b2c3d479");

            (async () => {

                setMessages(await Api.ChatApi.getMessagesByRoomId(roomId))

            })()

        }

        const handleEsc = (e : KeyboardEvent) => {

            if(e.key == "Escape")
            {
                closeChatCallback()
            }

        }

        window.addEventListener('keydown', handleEsc)

        return () => {
            setMessages([])
            window.removeEventListener('keydown', handleEsc)
        }

    }, [roomId])

    useEffect(() => {

        scrollToBottom()

    }, [messages])

    const allMessages = [...messages, ...wsMessages]

    const scrollToBottom = () => {

        messagesEndRef.current?.scrollIntoView({behavior: "auto"})

    }

    return(

        <div className={styles.main}>
            {roomId ? 

                <div className={styles.content}>
                    <header className={styles.header}>
                        <img src="settings.svg"/>
                    </header>
                    <ul className={styles.messageArea}>
                        {
                            allMessages.map((message, index) => (
                                <li className={`${styles.messageBlock} ${message.user_id == localStorage.getItem("user_id") ? styles.myMessageBlock : styles.otherMessageBlock}`} key={index}>
                                    <img className={styles.avatar} src={`http://localhost:9000/users/${message.user_id}/avatar/avatar.png`}/>
                                    <div className={styles.message}>
                                        <p>{message.user_name}</p>
                                        <p>{message.body}</p>
                                    </div>
                                </li>
                            ))
                        }
                        <div ref={messagesEndRef}></div>
                    </ul>
                    <div className={styles.inputContainer}>
                        <input className={styles.inputArea} onChange={e => setInput(e.target.value)} value={input} onKeyDown={(e) => {
                            if(e.key == 'Enter')
                            {
                                e.preventDefault();
                                handleSend();
                            }
                        }}>
                        </input>
                        <img src="send.svg" onClick={handleSend}/>
                    </div>
                </div>

                :
                
                <div className={styles.noChatSelected}>
                    <p>Выберите, кому вы хотели бы написать...</p>
                </div>
            }
        </div>

    )

}