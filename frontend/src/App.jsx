import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <Router>
      <div>
        <Toaster position="bottom-right" />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/create-account' element={<SignupPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App