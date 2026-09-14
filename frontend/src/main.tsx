import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// import App from "@/app/App.tsx"
import { AppProviders } from './providers/AppProviders.tsx'
// import './index.css'
import "@/styles/globals.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
)
