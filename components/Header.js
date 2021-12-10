import React from 'react'

import { View, Text, StyleSheet, SafeAreaView } from 'react-native'

export default function components(props) {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(226, 93, 51, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60
  },
  safeAreaView: {
    backgroundColor: 'rgba(226, 93, 51, 1)'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  }
})
