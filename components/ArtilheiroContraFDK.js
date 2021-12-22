import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, ScrollView } from 'react-native'

export default function ArtilheiroContraFDK({ listOfPlayers, listOfMatches }) {
  const [players, setPlayers] = useState([])

  const getPlayers = () => {
    const dataArray = []
    const playersArray = listOfPlayers.map(pl => {
      return pl.jogador
    })

    listOfMatches.forEach(partida => {
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
    paddingHorizontal: 15,
    marginHorizontal: 10
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 2,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#e1e1e1',
    marginHorizontal: 10
  },
  playerTitle: {
    width: '40%'
  },
  golTitle: { width: '15%', textAlign: 'center' },
  partidaTitle: { width: '30%', textAlign: 'center' },
  mediaTitle: { width: '15%', textAlign: 'center' }
})
