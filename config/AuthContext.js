import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext({ signed: true })

export const AuthProvider = ({ children }) => {
  const [isLogged, setIslogged] = useState(false)

  useEffect(() => {
    async function loadStorageData() {
      const storageAuth = await AsyncStorage.getItem('@auth')

      if (storageAuth) {
        setIslogged(JSON.parse(storageAuth))
      }
    }

    loadStorageData()
  })

  const USER = 123
  const PASSWORD = 123

  async function signIn(user, password) {
    if (user == USER && password == PASSWORD) {
      await AsyncStorage.setItem('@auth', JSON.stringify(true))
      return setIslogged(true)
    } else {
      return Alert.alert('Login incorreto')
    }
  }

  async function signOut() {
    await AsyncStorage.clear()
    setIslogged(false)
  }

  return (
    <AuthContext.Provider value={{ isLogged: isLogged, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
