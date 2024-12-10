<<<<<<< HEAD
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
=======
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { UseStore } from './store/UseStore'; // Import your Zustand store
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';

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
>>>>>>> a56740805dfd87db323079b5d500787d01171724

export default App;
