import React, { useState, useContext } from 'react'

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from '../config/AuthContext'

export default function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const { signIn } = useContext(AuthContext)
  //console.log(isLogged)
  const auth = () => {
    signIn(user, password)
    //console.log(isLogged)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.labelInput}>Usuário:</Text>
        <TextInput
          style={styles.input}
          value={user}
          placeholder="usuário"
          onChangeText={text => setUser(text)}
          autoComplete="off"
          autoCorrect={false}
        />
        <Text style={styles.labelInput}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={password}
          placeholder="senha"
          onChangeText={text => setPassword(text)}
          autoComplete="off"
          autoCorrect={false}
          secureTextEntry={true}
        />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={auth}>
            <Text style={styles.textButton}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: 'center'
  },
  inputContainer: {
    backgroundColor: '#e1e1e1',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingBottom: 10
  },
  labelInput: {
    marginHorizontal: 10,
    marginTop: 15,
    fontWeight: '700'
  },
  input: {
    borderWidth: 1,
    borderColor: '#c1c1c1',
    marginVertical: 5,
    marginHorizontal: 10,
    height: 35,
    paddingLeft: 10
  },
  button: {
    width: 80,
    height: 35,
    backgroundColor: '#31343b',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  textButton: {
    color: 'white'
  }
})
