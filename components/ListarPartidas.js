import React, { useState } from 'react'
import { View, ScrollView, FlatList, StyleSheet } from 'react-native'
import { addDays, addMonths, isSameMonth, subDays, subMonths } from 'date-fns'

import Partida from './Partida'

export default function ListarPartidas(props) {
  const [collection, setCollection] = useState([
    {
      id: '0',
      time1: 'Brahma',
      time2: 'Skol',
      date: subDays(new Date(), 10),
      resultado: '10 x 13',
      jogadoresTime1: [
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 }
      ],
      jogadoresTime2: [
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 },
        { Jogador: 'Cahe', Gols: 2 }
      ]
    },
    {
      id: '1',
      time1: 'Brahma',
      time2: 'Heineken',
      date: subDays(new Date(), 5),
      resultado: '15 x 23'
    },
    {
      id: '2',
      time1: 'Antartica',
      time2: 'Skol',
      date: new Date(),
      resultado: '15 x 23'
    },
    {
      id: '3',
      time1: 'Brahma',
      time2: 'Skol',
      date: addDays(new Date(), 1),
      resultado: '7 x 3'
    },
    {
      id: '4',
      time1: 'Antartica',
      time2: 'Skol',
      date: addDays(new Date(), 3),
      resultado: '10 x 10'
    },
    {
      id: '5',
      time1: 'Brahma',
      time2: 'Skol',
      date: subMonths(new Date(), 1),
      resultado: '10 x 13'
    },
    {
      id: '6',
      time1: 'Brahma',
      time2: 'Heineken',
      date: subMonths(new Date(), 1),
      resultado: '15 x 23'
    },
    {
      id: '7',
      time1: 'Brahma',
      time2: 'Skol',
      date: subMonths(new Date(), 1),
      resultado: '15 x 23'
    },
    {
      id: '8',
      time1: 'Brahma',
      time2: 'Skol',
      date: subMonths(new Date(), 1),
      resultado: '7 x 3'
    },
    {
      id: '9',
      time1: 'Antartica',
      time2: 'Skol',
      date: subMonths(new Date(), 1),
      resultado: '10 x 10'
    },
    {
      id: '10',
      time1: 'Brahma',
      time2: 'Skol',
      date: addMonths(new Date(), 1),
      resultado: '10 x 10'
    },
    {
      id: '11',
      time1: 'Brahma',
      time2: 'Skol',
      date: addMonths(new Date(), 1),
      resultado: '10 x 10'
    },
    {
      id: '12',
      time1: 'Antartica',
      time2: 'Skol',
      date: addMonths(new Date(), 1),
      resultado: '10 x 10'
    },
    {
      id: '13',
      time1: 'Brahma',
      time2: 'Heineken',
      date: addMonths(new Date(), 1),
      resultado: '10 x 10'
    },
    {
      id: '14',
      time1: 'Brahma',
      time2: 'Skol',
      date: addMonths(new Date(), 1),
      resultado: '10 x 10'
    }
  ])

  const filteredGames = collection.filter(col =>
    isSameMonth(col.date, props.date)
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredGames}
        keyExtractor={col => col.id}
        renderItem={({ item }) => (
          <Partida
            time1={item.time1}
            time2={item.time2}
            resultado={item.resultado}
            data={item.date}
            jogadoresTime1={item.jogadoresTime1}
            jogadoresTime2={item.jogadoresTime2}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
