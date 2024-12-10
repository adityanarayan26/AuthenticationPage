<<<<<<< HEAD
import React from 'react'

const Dashboard = () => {
=======
import { Loader, LogOut } from 'lucide-react'
import React, { useEffect } from 'react'
import { UseStore } from '../store/UseStore'
import { useNavigate } from 'react-router'

const Dashboard = () => {
  const { logout, isLoading, loggedInUser } = UseStore()
  const navigate = useNavigate()





  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')

    } catch (error) {
    console.log(" error:", error)

    }
  }
>>>>>>> a56740805dfd87db323079b5d500787d01171724
  return (
    <div>
      <h1>o hello this is Dashboard</h1>
    </div>
  )
}

export default Dashboard
