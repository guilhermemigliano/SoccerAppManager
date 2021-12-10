import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

export default function Settings(props) {
  return (
    <View style={styles.container}>
      <Text>Configuração</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
