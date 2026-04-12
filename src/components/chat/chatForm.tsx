import { useEffect, useState, useRef } from 'react'
import styles from './chatForm.module.scss'
import { useChat } from '../../hooks/chat.hook'
import { Api } from '../../../api/api'

export const ChatForm = ({roomId} : {roomId : string}) => {

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
            {roomId && 

                <div className={styles.content}>
                    <header className={styles.header}>

                    </header>
                    <ul className={styles.messageArea}>
                        {
                            allMessages.map((message, index) => (
                                <li className={`${styles.messageBlock} ${message.user_id == localStorage.getItem("user_id") ? styles.myMessageBlock : styles.otherMessageBlock}`} key={index}>
                                    <div className={styles.avatar}/>
                                    <div className={styles.message}>
                                        <p>{message.body}</p>
                                    </div>
                                </li>
                            ))
                        }
                        <div ref={messagesEndRef}></div>
                    </ul>
                    <input className={styles.inputArea} onChange={e => setInput(e.target.value)} value={input} onKeyDown={(e) => {

                        if(e.key == 'Enter')
                        {
                            e.preventDefault();
                            handleSend();
                        }

                    }}>

                    </input>
                </div>

            }
        </div>

    )

}