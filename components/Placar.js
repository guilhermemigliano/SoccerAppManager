import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Placar(props) {
  return (
    <View style={styles.container}>
      <View style={styles.score}>
        <Text style={styles.scoreTitle}>{props.score1}</Text>
      </View>

      <View style={styles.score}>
        <Text style={styles.scoreTitle}>{props.score2}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  score: {
    backgroundColor: '#fcfcfc',
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 10,
    borderRadius: 10,
    minWidth: 65,
    alignItems: 'center'
  },
  scoreTitle: {
    fontSize: 40,
    color: 'black'
  },
  placarSeparador: {
    color: 'white',
    fontSize: 40
  }
})
