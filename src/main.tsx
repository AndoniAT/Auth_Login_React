import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import AppRoute from './AppRoute.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoute/>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
