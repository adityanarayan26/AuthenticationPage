import React, { useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import { Navigate, Route, Routes } from 'react-router'
import SignupPage from './pages/SignupPage'
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard'
import { UseStore } from './store/UseStore'

const App = () => {

  const { loggedInUser } = UseStore()
  const Protected = ({ children }) => {
    return loggedInUser ? children : <Navigate to="/login" />
  }
const RedirectToLoginIfSignedup = ({ children }) => {
    return loggedInUser ? <Navigate to="/login" /> : children
}



  return (
    <div>
      <Toaster position="bottom-right"/>
      <Routes>
        <Route path='/' element={<Protected><Dashboard /></Protected>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/create-account' element={<SignupPage />} />
      </Routes>
    </div>
  )
}

export default App