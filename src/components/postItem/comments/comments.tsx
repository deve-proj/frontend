import { useNavigate, useParams } from "react-router-dom"
import { ScreenLayout } from "../../../layouts/screenLayout/screenLayout"
import { usePost } from "../../../hooks/post.hook"
import styles from './comments.module.scss'
import { useState, useRef, useEffect } from "react"
import { Api } from "../../../../api/api"

export const Comments = () => {

    const { postId } = useParams()
    const {comments: wsComments, sendComment} = usePost(postId)
    const [comments, setComments] = useState([])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    const handleSend = () => {

        if(input.trim())
        {
            sendComment(input)
            setInput("")
        }
    }

    useEffect(() => {
    
        if(postId)
        {
            localStorage.setItem("user_id", "f47ac10b-58cc-4372-a567-0e02b2c3d479");

            (async () => {

                setComments(await Api.NewsApi.getComments(postId))

            })()

        }

        const handleEsc = (e : KeyboardEvent) => {

            if(e.key == "Escape")
            {
                navigate(`/news/${postId}`)
            }

        }

        window.addEventListener('keydown', handleEsc)

        return () => {
            setComments([])
            window.removeEventListener('keydown', handleEsc)
        }

    }, [postId])

    useEffect(() => {

        scrollToBottom()

    }, [comments])

    const scrollToBottom = () => {

        messagesEndRef.current?.scrollIntoView({behavior: "auto"})

    }

    const allComments = [...comments, ...wsComments]

    return(

        <ScreenLayout>
            <div className={styles.main}>
                 <ul className={styles.messageArea}>
                    {
                        allComments.map((message, index) => (
                            <li className={`${styles.messageBlock} ${message.user_id == localStorage.getItem("user_id") ? styles.myMessageBlock : styles.otherMessageBlock}`} key={index}>
                                <img className={styles.avatar} src={`http://localhost:9000/users/${message.user_id}/avatar/avatar.png`}/>
                                <div className={styles.message}>
                                    <p>{message.user_name}</p>
                                    <p>{message.text}</p>
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
                    <img src="/send.svg" onClick={handleSend}/>
                </div>
            </div>
        </ScreenLayout>

    )

}