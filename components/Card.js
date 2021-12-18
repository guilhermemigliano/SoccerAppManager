import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import AuthContext from '../config/AuthContext'

import Carousel from 'react-native-snap-carousel'
import { addDays, addMonths, isSameMonth, subDays, subMonths } from 'date-fns'
import Partida from './Partida'

export default function Card({ date }) {
  const { listOfMatches } = useContext(AuthContext)

  const filteredGames = listOfMatches.filter(col => isSameMonth(col.date, date))

  const SLIDER_WIDTH = Dimensions.get('window').width
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        data={filteredGames}
        renderItem={({ item }) => (
          <Partida
            key={item.id}
            time1={item.time1}
            time2={item.time2}
            resultado={item.resultado}
            data={item.date}
            jogadoresTime1={item.jogadoresTime1}
            jogadoresTime2={item.jogadoresTime2}
          />
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 }
})
