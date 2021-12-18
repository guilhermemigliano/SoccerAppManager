import React, { useState, useEffect, useContext } from 'react'

import {
  View,
  Text,
  Button,
  StyleSheet,
  Keyboard,
  ScrollView,
  Platform
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { collection, getDocs } from 'firebase/firestore'
import db from '../config/firebase'

import Login from '../components/Login'
import NewPlayer from '../components/NewPlayer'
import RemovePlayer from '../components/RemovePlayer'

import AuthContext from '../config/AuthContext'

export default function Settings(props) {
  const [players, setPlayers] = useState([])

  const { isLogged, signIn, signOut } = useContext(AuthContext)

  async function readPlayers() {
    const querySnapshot = await getDocs(collection(db, 'Players'))
    const list = []
    const p = { label: '', value: '' }

    querySnapshot.forEach(doc => {
      const p = { label: '', value: '' }
      p.label = doc.data().jogador
      p.value = doc
      list.push(p)
      //console.log(`${doc.id} => ${doc.data()}  => ${doc.data().id}`)
    })
    list.sort(function (a, b) {
      if (a.label > b.label) {
        return 1
      }
      if (a.label < b.label) {
        return -1
      }
      // a must be equal to b
      return 0
    })
    setPlayers(list)
    //console.log(players)
  }

  useEffect(() => {
    readPlayers()
  }, [])

  return (
    <View style={styles.container}>
      {isLogged !== true ? (
        <Login setIsLogged={l => setIsLogged(l)} />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <NewPlayer readPlayers={readPlayers} />
              <RemovePlayer readPlayers={readPlayers} players={players} />
            </ScrollView>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Logout" onPress={signOut} />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonContainer: {
    paddingVertical: Platform.OS == 'ios' ? 20 : 0
  }
})
