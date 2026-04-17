import { createContext, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { NewChatForm } from "../../src/components/newChatForm/newChatForm";

interface INewChatData
{
    chatName : string
    chatDescription : string
    chatLogo : string
    chatType : 'public' | 'private'
    chatId : string
}

interface NewChatFormState
{
    isModalVisible? : boolean
    openModal? : () => any
    closeModal? : () => any
    data? : INewChatData
    setData? : Dispatch<SetStateAction<INewChatData>>
}

export const NewChatFormContext = createContext<NewChatFormState | null>({isModalVisible: false, openModal: null, closeModal: null, data: {chatName: null, chatDescription: null, chatId: null, chatLogo: null, chatType: null}, setData: null})

export const NewChatFormProvider = ({children} : {children : React.ReactNode}) => {

    const [isModalVisible, setModalVisibility] = useState(false)
    const [chatData, setChatData] = useState<INewChatData>({chatName: null, chatDescription: null, chatId: null, chatLogo: null, chatType: null})
    
    useEffect(() => {
        console.log(isModalVisible)
    }, [isModalVisible])

    return(

        <NewChatFormContext.Provider value={{isModalVisible: isModalVisible, openModal: () => setModalVisibility(true), closeModal: () => setModalVisibility(false), data: chatData, setData: setChatData}}>
            {isModalVisible && 
                <div className="modal-overlay">
                    <div className="modal-container">
                        <NewChatForm/>
                    </div>
                </div>
            }
            {children}
        </NewChatFormContext.Provider>

    )

}