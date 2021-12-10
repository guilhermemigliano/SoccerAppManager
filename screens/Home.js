import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar'
import MonthPicker from '../components/MonthPicker'
import Card from '../components/Card'

import NewMatch from './NewMatch'

const image = require('../assets/imgs/campo1.jpg')

export default function Home({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [modalVisible, setModalVisible] = useState(false)

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: 'tomato',
            padding: 5,
            borderRadius: 10,
            marginRight: 20
          }}
        >
          <Ionicons name="add-outline" size={20} color="white" />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <StatusBar style="light" backgroundColor="" />

        <MonthPicker date={date} onChange={newDate => setDate(newDate)} />

        <Card date={date} />
      </ImageBackground>
      <NewMatch
        modalVisible={modalVisible}
        closeModal={() => setModalVisible(!modalVisible)}
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
