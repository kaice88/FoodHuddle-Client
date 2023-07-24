import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import './assets/styles/main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
</GoogleOAuthProvider>
)
