import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'sonner'


ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <App />
        <Toaster closeButton richColors position="bottom-center"/>
    </>
)
