import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'

import { IconButton } from 'react-native-paper'
import { format, subYears, addYears, isSameYear } from 'date-fns'

export default function ArtilheiroAno({ listOfPlayers, listOfMatches }) {
  const [date, setDate] = useState(new Date())
  const [players, setPlayers] = useState([])

  const handlePrev = () => {
    const newDate = subYears(date, 1)
    setDate(newDate)
    getPlayers(newDate)
  }

  const handleNext = () => {
    const newDate = addYears(date, 1)
    setDate(newDate)
    getPlayers(newDate)
  }

  const playersArray = listOfPlayers.map(pl => {
    return pl.jogador
  })

  const dataArray = []

  const getPlayers = newDate => {
    if (!newDate) {
      newDate = new Date()
    }
    const filteredMatches = listOfMatches.filter(col =>
      isSameYear(col.date, newDate)
    )

    filteredMatches.forEach(partida => {
      partida.jogadoresTime1.forEach(pl => {
        let pos = playersArray.indexOf(pl.jogador)
        if (dataArray[pos] === undefined) {
          dataArray[pos] = {
            jogador: '',
            gol: 0,
            golContra: 0,
            partida: 0,
            media: 0
          }
        }
        dataArray[pos].jogador = pl.jogador
        dataArray[pos].gol = dataArray[pos].gol + pl.gol.length
        dataArray[pos].golContra =
          dataArray[pos].golContra + pl.golContra.length
        dataArray[pos].partida = dataArray[pos].partida + 1
        dataArray[pos].media = (
          dataArray[pos].golContra / dataArray[pos].partida
        )
          .toFixed(2)
          .replace('.', ',')
      })

      partida.jogadoresTime2.forEach(pl => {
        let pos = playersArray.indexOf(pl.jogador)
        if (dataArray[pos] === undefined) {
          dataArray[pos] = {
            jogador: '',
            gol: 0,
            golContra: 0,
            partida: 0,
            media: 0
          }
        }
        dataArray[pos].jogador = pl.jogador
        dataArray[pos].gol = dataArray[pos].gol + pl.gol.length
        dataArray[pos].golContra =
          dataArray[pos].golContra + pl.golContra.length
        dataArray[pos].partida = dataArray[pos].partida + 1
        dataArray[pos].media = (
          dataArray[pos].golContra / dataArray[pos].partida
        )
          .toFixed(2)
          .replace('.', ',')
      })
    })

    dataArray.sort(function (a, b) {
      if (a.golContra < b.golContra) {
        return 1
      }
      if (a.golContra > b.golContra) {
        return -1
      }
      // a must be equal to b
      else {
        if (a.partida < b.partida) {
          return -1
        } else if (a.partida > b.partida) {
          return 1
        } else {
          return 0
        }
      }
    })

    setPlayers(dataArray)
  }

  useEffect(() => {
    getPlayers()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.playerTitle}>Jogador</Text>
          <Text style={styles.golTitle}>Gol(s)</Text>
          <Text style={styles.partidaTitle} numberOfLines={2}>
            Partidas Jogadas
          </Text>
          <Text style={styles.mediaTitle}>Média</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {players.map(rank => (
            <View style={styles.dataContainer} key={rank.jogador}>
              <Text style={styles.playerTitle}>{rank.jogador}</Text>
              <Text style={styles.golTitle}>{rank.golContra}</Text>
              <Text style={styles.partidaTitle}>{rank.partida}</Text>
              <Text style={styles.mediaTitle}>{rank.media}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.row}>
        <IconButton icon="arrow-left" onPress={handlePrev} color={'white'} />
        <Text style={styles.dateTitle}>{format(date, 'yyyy')}</Text>
        <IconButton icon="arrow-right" onPress={handleNext} color={'white'} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d1d1d1',
    paddingVertical: 15,
    marginVertical: 2,
    paddingHorizontal: 15
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#e1e1e1'
  },
  playerTitle: {
    width: '40%'
  },
  golTitle: { width: '15%', textAlign: 'center' },
  partidaTitle: { width: '30%', textAlign: 'center' },
  mediaTitle: { width: '15%', textAlign: 'center' },
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
