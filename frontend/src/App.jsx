
import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import { Navigate, Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { UseStore } from './store/UseStore'; 



const App = () => {
  const {isCheckingAuth} = UseStore()

  // Protect routes
  const Protected = ({ children }) => {
    return isCheckingAuth ? children : <Navigate to="/login" />;
  };

  // Redirect logged-in users away from login/signup pages
  const LoggedInRedirect = ({ children }) => {
    return isCheckingAuth ? <Navigate to="/" /> : children;
  };

  return (
    <div>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Protected><Dashboard /></Protected>} />
        <Route path="/login" element={<LoggedInRedirect><LoginPage /></LoggedInRedirect>} />
        <Route path="/create-account" element={<LoggedInRedirect><SignupPage /></LoggedInRedirect>} />
      </Routes>
    </div>
  );
};


export default App;
