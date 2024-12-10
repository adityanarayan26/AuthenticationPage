import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>

      <App />
    </Router>

  </StrictMode>
)