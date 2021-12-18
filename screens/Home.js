import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform
} from 'react-native'

import AuthContext from '../config/AuthContext'

import { collection, getDocs } from 'firebase/firestore'
import db from '../config/firebase'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar'
import MonthPicker from '../components/MonthPicker'
import Card from '../components/Card'
import Header from '../components/Header'

import NewMatch from './NewMatch'

const image = require('../assets/imgs/campo1.jpg')

export default function Home({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [modalVisible, setModalVisible] = useState(false)
  const [matches, setMatches] = useState([])

  const { isLogged } = useContext(AuthContext)
  //console.log(isLogged)

  async function readMatches() {
    const querySnapshot = await getDocs(collection(db, 'Matches'))
    const list = []

    querySnapshot.forEach(doc => {
      list.push(doc.data())
    })

    list.map(m => {
      m.date = m.date.toDate()
      return m
    })

    list.sort(function (a, b) {
      if (a.date > b.date) {
        return 1
      }
      if (a.date < b.date) {
        return -1
      }
      // a must be equal to b
      return 0
    })

    setMatches(list)
    //console.log(list)
  }

  useEffect(() => {
    readMatches()
  }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: '#464a54',
            padding: 5,
            borderRadius: 5,
            marginRight: 20,
            marginBottom: Platform.OS === 'ios' ? 10 : 0
          }}
        >
          <Ionicons name="add-outline" size={20} color="white" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Header title="Partidas" setModalVisible={() => setModalVisible(true)} />
      <StatusBar hidden style="light" backgroundColor="#31343b" />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <MonthPicker date={date} onChange={newDate => setDate(newDate)} />

        <Card date={date} readMatches={readMatches} collection={matches} />
      </ImageBackground>
      <NewMatch
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(!modalVisible)}
        readMatches={readMatches}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1
  }
})
