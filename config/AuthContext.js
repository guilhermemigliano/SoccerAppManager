import React, { createContext, useState, useEffect } from 'react'
import { Alert } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { collection, getDocs } from 'firebase/firestore'
import db from '../config/firebase'

const AuthContext = createContext({ signed: true })

export const AuthProvider = ({ children }) => {
  const [isLogged, setIslogged] = useState(false)
  const [updateData, setUpdateData] = useState(false)
  const [listOfPlayers, setListOfPlayers] = useState([])
  const [listOfMatches, setListOfMatches] = useState([])
  const [playersChanged, setPlayersChanged] = useState(false)
  const [matchesChanged, setMatchesChanged] = useState(false)

  const USER = 123
  const PASSWORD = 123

  const loadMatches = async () => {
    const queryMatches = await getDocs(collection(db, 'Matches'))
    const listMatches = []

    queryMatches.forEach(doc => {
      listMatches.push({
        date: doc.data().date.toDate(),
        jogadoresTime1: doc.data().jogadoresTime1,
        jogadoresTime2: doc.data().jogadoresTime2,
        resultado: doc.data().resultado,
        time1: doc.data().time1,
        time2: doc.data().time2,
        id: doc.id
      })
    })
    //Ordenando as partidas
    listMatches.sort(function (a, b) {
      if (a.date > b.date) {
        return 1
      }
      if (a.date < b.date) {
        return -1
      }
      // a must be equal to b
      return 0
    })
    setListOfMatches(listMatches)

    //lista de jogadores

    const queryPlayers = await getDocs(collection(db, 'Players'))
    //const p = { label: '', value: '' }

    const listPlayers = []

    queryPlayers.forEach(p => {
      listPlayers.push({
        id: p.id,
        jogador: p.data().jogador,
        tipo: p.data().tipo,
        status: p.data().status
      })
    })
    setListOfPlayers(listPlayers)
  }

  useEffect(() => {
    loadMatches()
  }, [updateData])

  useEffect(() => {
    async function loadStorageData() {
      const storageAuth = await AsyncStorage.getItem('@auth')

      if (storageAuth) {
        setIslogged(JSON.parse(storageAuth))
      }
    }
    loadStorageData()
  }, [])

  const setPlayers = () => setPlayersChanged(!playersChanged)
  const setMatches = () => setMatchesChanged(!matchesChanged)
  const setUpdate = () => setUpdateData(!updateData)

  async function signIn(user, password) {
    if (user == USER && password == PASSWORD) {
      await AsyncStorage.setItem('@auth', JSON.stringify(true))
      setIslogged(true)
    } else {
      Alert.alert('Login incorreto')
    }
  }

  async function signOut() {
    await AsyncStorage.clear()
    setIslogged(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isLogged: isLogged,
        signIn,
        signOut,
        listOfPlayers,
        listOfMatches,
        setUpdate,
        update: updateData
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
