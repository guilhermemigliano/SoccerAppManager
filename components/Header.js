import React, { useContext } from 'react'

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform
} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AuthContext from '../config/AuthContext'

export default function components(props) {
  const { isLogged } = useContext(AuthContext)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar style="light" backgroundColor="#31343b" />
      {isLogged ? (
        <View style={styles.container}>
          <Text style={[styles.title, { marginLeft: 55 }]}>{props.title}</Text>
          <TouchableOpacity
            onPress={props.setModalVisible}
            style={styles.button}
          >
            <Ionicons name="add-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#31343b',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS == 'ios' ? 45 : 55
  },
  safeAreaView: {
    backgroundColor: '#31343b'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: Platform.OS == 'ios' ? 10 : 0,
    flex: 1,
    textAlign: 'center',
    marginLeft: 0
  },
  button: {
    backgroundColor: '#464a54',
    padding: 5,
    borderRadius: 5,
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
    marginRight: 25
  }
})
