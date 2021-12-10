import React from 'react'

import { View, StyleSheet, Text } from 'react-native'
import { IconButton } from 'react-native-paper'
import { format, subMonths, addMonths } from 'date-fns'

const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

export default function MonthPicker({ date, onChange }) {
  const handlePrev = () => {
    const newDate = subMonths(date, 1)
    onChange(newDate)
  }

  const handleNext = () => {
    const newDate = addMonths(date, 1)
    onChange(newDate)
  }

  const monthBr = month => {
    let mes = month.split(',')

    return MESES[parseInt(mes[0]) - 1] + ', ' + mes[1]
  }

  return (
    <View style={styles.row}>
      <IconButton icon="arrow-left" onPress={handlePrev} />
      <Text style={styles.dateTitle}>{monthBr(format(date, 'MM, yyyy'))}</Text>
      <IconButton icon="arrow-right" onPress={handleNext} />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: 'rgba(220, 227, 215, 0.8)',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 2,
    height: 45,
    width: '100%'
  },
  dateTitle: {
    fontWeight: '700',
    fontSize: 16
  }
})
