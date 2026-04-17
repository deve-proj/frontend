import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.tsx'
import { NewChatFormProvider } from '../core/providers/newChatForm.provider.tsx'

createRoot(document.getElementById('root')!).render(

    <NewChatFormProvider>
        <App/>
    </NewChatFormProvider>,
    
)