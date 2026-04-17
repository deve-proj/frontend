import type { Dispatch, SetStateAction } from 'react'
import styles from './chatListItem.module.scss'

export type ChatListItemProps = {

    chatName : string
    chatId : string
    lastMessage? : string
    logoUrl? : string
    isFocus? : boolean
    setFocusCallback? : Dispatch<SetStateAction<string>>

}

export const ChatListItem = (props : ChatListItemProps) => {

    console.log(props.logoUrl)

    return(

        <li className={`${styles.main} ${props.isFocus ? styles.focused : ""}`} onClick={() => props.setFocusCallback(props.chatId)}>
            <img src={props.logoUrl}/>
            <p className={styles.chatName}>{props.chatName}</p>
        </li>

    )

}