import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from './Util.js'
import { BrowserRouter } from 'react-router-dom'
import { UIProvider } from './context/UIContext.jsx'
import { FolderProvider } from './context/FolderContext.jsx'
import { ShareProvider } from './context/ShareContext.jsx'
import { Toaster } from 'react-hot-toast'
import { FileProvider } from './context/FileContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position='top-center'/>
    <UIProvider>
    <AuthProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <FolderProvider>
          <FileProvider>
      <ShareProvider>
        <App />
        </ShareProvider>
        </FileProvider>
        </FolderProvider>
    </GoogleOAuthProvider>
    </AuthProvider>
    </UIProvider>
    </BrowserRouter>
  </StrictMode>,
)
