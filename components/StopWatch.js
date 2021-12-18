import React, { useState } from 'react'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Ionicons } from '@expo/vector-icons'

export default function StopWatch(props) {
  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <TouchableOpacity onPress={props.setMinutesUp}>
          <Ionicons name="caret-up-sharp" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.timerNumber}>
          {Math.floor((props.totalTime % 3600) / 60)}
        </Text>
        <TouchableOpacity onPress={props.setMinutesDown}>
          <Ionicons name="caret-down-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text
        style={{
          color: 'white',
          alignItems: 'center',
          fontSize: 40,
          textAlign: 'center',
          marginTop: 7,
          marginHorizontal: 20
        }}
      >
        :
      </Text>
      <View style={styles.timerContainer}>
        <TouchableOpacity onPress={props.setSecondsUp}>
          <Ionicons name="caret-up-sharp" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.timerNumber}>
          {Math.floor((props.totalTime % 3600) % 60)}
        </Text>
        <TouchableOpacity onPress={props.setSecondsDown}>
          <Ionicons name="caret-down-sharp" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15
  },
  timerNumber: {
    fontSize: 30,
    color: 'white'
  }
})
