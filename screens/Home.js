import React, { useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator
} from 'react-native'

import { StatusBar } from 'expo-status-bar'
import MonthPicker from '../components/MonthPicker'
import Card from '../components/Card'
import Header from '../components/Header'

import { collection, getDocs } from 'firebase/firestore'
import db from '../config/firebase'

const image = require('../assets/imgs/campo5.jpeg')

import AuthContext from '../config/AuthContext'

export default function Home({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [matches, setMatches] = useState([])

  const { setUpdate } = useContext(AuthContext)

  async function getMatches() {
    const queryMatches = await getDocs(collection(db, 'Matches')).then(data => {
      const listMatches = []

      data.forEach(doc => {
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
      setMatches(listMatches)
      setUpdate()
    })
  }

  useEffect(() => {
    getMatches()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMatches()
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <Header title="Partidas" navigation={navigation} />
      <StatusBar hidden style="light" backgroundColor="#31343b" />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <MonthPicker date={date} onChange={newDate => setDate(newDate)} />
        <Card date={date} navigation={navigation} listOfMatches={matches} />
      </ImageBackground>
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
