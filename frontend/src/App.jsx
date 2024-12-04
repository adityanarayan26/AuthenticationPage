import React, { useEffect, useState } from 'react'
import LoginPage from './pages/LoginPage'
import { Navigate, Route, Routes } from 'react-router'
import SignupPage from './pages/SignupPage'
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard'


const App = () => {
  const status = localStorage.getItem("auth")


  const Protected = ({ children }) => {
    return status ? children : <Navigate to="/login" />
  }
  const LoggedInRedirect = ({ children }) => {
    return status ? <Navigate to="/" /> : children;
  }



  return (
    <div>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path='/' element={<Protected><Dashboard /></Protected>} />
        <Route path="/login" element={<LoggedInRedirect><LoginPage /></LoggedInRedirect>} />
        <Route path='/create-account' element={<SignupPage />} />
      </Routes>
    </div>
  )
}

export default App