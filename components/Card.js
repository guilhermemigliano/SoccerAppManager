import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import AuthContext from '../config/AuthContext'

import Carousel from 'react-native-snap-carousel'
import { addDays, addMonths, isSameMonth, subDays, subMonths } from 'date-fns'
import Partida from './Partida'

export default function Card({ date, listOfMatches, navigation }) {
  //const { listOfMatches } = useContext(AuthContext)

  const filteredGames = listOfMatches.filter(col => isSameMonth(col.date, date))

  const SLIDER_WIDTH = Dimensions.get('window').width
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

  if (filteredGames.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 30
        }}
      >
        <Text
          style={{
            backgroundColor: 'rgba(256, 256, 256, 0.9)',
            padding: 10,
            textAlign: 'center'
          }}
        >
          Este mês não possui partidas!
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        data={filteredGames}
        renderItem={({ item }) => (
          <Partida
            key={item.id}
            matchId={item.id}
            time1={item.time1}
            time2={item.time2}
            resultado={item.resultado}
            data={item.date}
            jogadoresTime1={item.jogadoresTime1}
            jogadoresTime2={item.jogadoresTime2}
            navigation={navigation}
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
