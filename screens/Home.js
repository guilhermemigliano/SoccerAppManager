import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar'
import MonthPicker from '../components/MonthPicker'
import Card from '../components/Card'
import Header from '../components/Header'

import NewMatch from './NewMatch'

const image = require('../assets/imgs/campo5.jpeg')

export default function Home({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [modalVisible, setModalVisible] = useState(false)

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
      <Header title="Partidas" navigation={navigation} />
      <StatusBar hidden style="light" backgroundColor="#31343b" />
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <MonthPicker date={date} onChange={newDate => setDate(newDate)} />
        <Card date={date} navigation={navigation} />
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
