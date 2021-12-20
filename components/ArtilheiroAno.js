import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { IconButton } from 'react-native-paper'
import { format, subYears, addYears } from 'date-fns'

export default function ArtilheiroAno() {
  const [date, setDate] = useState(new Date())

  const handlePrev = () => {
    const newDate = subYears(date, 1)
    setDate(newDate)
  }

  const handleNext = () => {
    const newDate = addYears(date, 1)
    setDate(newDate)
  }

  return (
    <View style={styles.row}>
      <IconButton icon="arrow-left" onPress={handlePrev} color={'white'} />
      <Text style={styles.dateTitle}>{format(date, 'yyyy')}</Text>
      <IconButton icon="arrow-right" onPress={handleNext} color={'white'} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingVertical: 5,
    backgroundColor: '#3f6dd4',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
    height: 45,
    marginHorizontal: 40,
    borderRadius: 20
  },
  dateTitle: {
    fontWeight: '700',
    fontSize: 16,
    color: 'white'
  }
})
