import React, { useState, useContext } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'

import { collection, addDoc } from 'firebase/firestore'
import db from '../config/firebase'

import AuthContext from '../config/AuthContext'

export default function NewPlayer() {
  const [addPlayer, setAddPlayer] = useState('')
  const { setPlayers, listOfPlayers } = useContext(AuthContext)

  async function addFirebase() {
    if (
      listOfPlayers.some(
        elem => elem.jogador.toLowerCase() == addPlayer.trim().toLowerCase()
      )
    ) {
      return Alert.alert('Jogador existente!')
    }
    try {
      if (addPlayer.trim() === '') {
        return Alert.alert('Adicione o nome do jogador')
      }
      const docRef = await addDoc(collection(db, 'Players'), {
        jogador: addPlayer
      })
      setPlayers()
      Alert.alert(`Jogador ${addPlayer} adicionado com sucesso!`)
      setAddPlayer('')
      //console.log('Document written with ID: ', docRef.id)
    } catch (e) {
      Alert.alert('Erro ao adicionar o jogador!')
      //console.error('Error adding document: ', e)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar um jogador</Text>
      <TextInput
        style={styles.input}
        value={addPlayer}
        onChangeText={text => setAddPlayer(text)}
        placeholder="nome do jogador"
        autoComplete="off"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={addFirebase}>
        <Text style={styles.textButton}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e1e1e1',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10
  },
  title: {
    marginHorizontal: 10,
    marginVertical: 10,
    fontWeight: '700'
  },
  input: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    paddingLeft: 10,
    marginHorizontal: 10,
    height: 35
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
