import { postUserInvite } from '@/apis/users.jsx'
import {
  BOT_ID,
  EndpointRoute,
  getFullApiUrl,
  STORAGE_KEY,
} from '@/utils/constants'
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

// Create a context for authentication
const AuthContext = createContext()

// Create a provider component
const AuthProvider = ({ children, inviteTma }) => {
  const [accessToken, setAccessToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(STORAGE_KEY.ACCESS_TOKEN, accessToken)
    } else {
      localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
    }
  }, [accessToken])

  const login = async (initData) => {
    setLoading(true)
    try {
      // fake waiting 3s
      const response = await axios.post(
        getFullApiUrl(EndpointRoute.AUTH_VERIFY),
        { init_data: initData, bot_id: BOT_ID, role: 'user' }
      )
      const token = response.data.access_token
      setAccessToken(token)
      if (inviteTma) {
        await postUserInvite(inviteTma, BOT_ID, token)
      }
      return token
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setAccessToken('')
  }

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the AuthContext
const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
