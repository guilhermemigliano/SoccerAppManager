import React, { useState, useContext } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'

import { doc, updateDoc } from 'firebase/firestore'
import db from '../config/firebase'

import AuthContext from '../config/AuthContext'

export default function EnablePlayer() {
  const [enablePlayer, setEnablePlayer] = useState('')
  const { listOfPlayers, setPlayers } = useContext(AuthContext)

  async function deletePlayer() {
    try {
      const docRef = doc(db, 'Players', enablePlayer)

      await updateDoc(docRef, { status: true })
      setPlayers()
      Alert.alert(`Jogador habilitado com sucesso!`)
      setEnablePlayer('')
    } catch (e) {
      Alert.alert('Erro ao habilitar jogador')
      console.error('Error updating document: ', e)
    }
  }

  const placeholder = {
    label: 'Selecione um jogador...',
    value: null,
    color: 'tomato'
  }

  const filteredPlayers = listOfPlayers.filter(elem => elem.status == false)

  const playersArray = filteredPlayers.map(p => {
    const jogador = { label: '', value: '' }
    jogador.label = p.jogador
    jogador.value = p.id
    return jogador
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habilitar um jogador</Text>
      <View style={styles.selectContainer}>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={placeholder}
          value={enablePlayer}
          onValueChange={value => setEnablePlayer(value)}
          useNativeAndroidPickerStyle={false}
          //onOpen={readPlayers}
          Icon={() => {
            return (
              <Ionicons
                name="arrow-down-circle"
                size={20}
                color="black"
                style={{ paddingVertical: 10, paddingHorizontal: 10 }}
              />
            )
          }}
          items={playersArray}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={deletePlayer}>
        <Text style={styles.textButton}>Habilitar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e1e1',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10
  },
  title: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: '700'
  },
  titleObs: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: '600',
    fontSize: 10,
    color: '#707070'
  },
  selectContainer: {
    marginHorizontal: 10
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    marginVertical: 10,
    backgroundColor: '#c1c1c1',
    marginHorizontal: 100,
    borderRadius: 10
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    height: 40,
    fontSize: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#c1c1c1',
    color: 'black',
    backgroundColor: '#e1e1e1',
    paddingRight: 30, // to ensure the text is never behind the icon
    justifyContent: 'center'
  },
  inputAndroid: {
    width: '100%',
    height: 40,
    fontSize: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#c1c1c1',
    color: 'black',
    backgroundColor: '#e1e1e1',
    paddingRight: 30, // to ensure the text is never behind the icon
    justifyContent: 'center'
  }
})
