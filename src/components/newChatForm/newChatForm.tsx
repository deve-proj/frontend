import { useEffect, useState, useRef } from 'react'
import styles from './newChatForm.module.scss'
import { Api } from '../../../api/api'
import { NewChatFormContext } from '../../../core/providers/newChatForm.provider'
import { useContext } from 'react'

export interface INewChatData
{
    name : string
    description : string
    logo : File
    type : "private" | "public"
    invited_members : string[]
}

export const NewChatForm = () => {

    const [newChatData, setNewChatData] = useState<INewChatData>()
    const { setData, closeModal } = useContext(NewChatFormContext)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const createNewChat = async () => {

        console.log("Creating new chat...")

        let createdChatData = await Api.ChatApi.createNewRoom(newChatData)

        console.log(createdChatData)

        setData(prev => ({...prev, chatName: createdChatData.name, chatType: 'private', chatLogo: createdChatData.logo_url, chatId: createdChatData.id}))

        closeModal()
    }

    const handleFileToggling = (e: React.ChangeEvent<HTMLInputElement>) => {

        const file = e.target.files?.[0]
        if(file)
            setNewChatData(prev => ({...prev, logo: file}))
    }
    
    return(

        <section className={styles.main}>
            <p>Новый чат</p>
            
            <input placeholder='Название' onChange={e => setNewChatData(prev => ({...prev, name: e.target.value}))}/>
            <input placeholder='Описание' onChange={e => setNewChatData(prev => ({...prev, description: e.target.value}))}/>
            <input placeholder='Логотип' type='file' accept='image' ref={fileInputRef} onChange={handleFileToggling}/>
            <input placeholder='Тип чата'/>
            <input placeholder='Пригласить участников'/>

            <button onClick={createNewChat}>Создать чат</button>
        </section>

    )

}