import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
import { format } from 'date-fns'

export default function PickDate(props) {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.dateTitleContainer}>
        <Text style={styles.dateTitle}>{format(props.date, 'dd/MM/yyyy')}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={() => {}} style={styles.button}>
          <Ionicons name="color-wand-sharp" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    backgroundColor: '#40444d',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateTitleContainer: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateTitle: {
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 60,
    color: 'white'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#464a54',
    borderRadius: 3,
    backgroundColor: '#31343b'
  }
})
