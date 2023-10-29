import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './input.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
    <div className='max-w-screen-2xl'>
    <App />
    </div>
   </React.StrictMode>,
)
