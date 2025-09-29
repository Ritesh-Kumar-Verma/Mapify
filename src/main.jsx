import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


const basename = import.meta.env.VITE_MAPIFY_BASENAME

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename={basename} >
  <App />
  </BrowserRouter>
)
