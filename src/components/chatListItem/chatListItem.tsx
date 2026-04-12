import type { Dispatch, SetStateAction } from 'react'
import styles from './chatListItem.module.scss'

export type ChatListItemProps = {

    chatName : string
    chatId : string
    lastMessage? : string
    logoUrl : string
    isFocus? : boolean
    setFocusCallback? : Dispatch<SetStateAction<string>>

}

export const ChatListItem = (props : ChatListItemProps) => {

    console.log(props.isFocus)

    return(

        <li className={`${styles.main} ${props.isFocus ? styles.focused : ""}`} onClick={() => props.setFocusCallback(props.chatId)}>
            <p>{props.chatName}</p>
        </li>

    )

}