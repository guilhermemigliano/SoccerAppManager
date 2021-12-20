import React, { useState, useEffect, useContext } from 'react'

import {
  View,
  Text,
  Button,
  StyleSheet,
  Keyboard,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from 'react-native'

import { collection, getDocs } from 'firebase/firestore'
import db from '../config/firebase'

import Login from '../components/Login'
import NewPlayer from '../components/NewPlayer'
import NewGoalKeeper from '../components/NewGoalKeeper'
import RemovePlayer from '../components/RemovePlayer'

import AuthContext from '../config/AuthContext'

export default function Settings(props) {
  const { isLogged, signOut } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      {isLogged !== true ? (
        <Login />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={10}
              >
                <NewPlayer />
                <NewGoalKeeper />
                <RemovePlayer />
              </KeyboardAvoidingView>
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
