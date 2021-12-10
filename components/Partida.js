import React from 'react'

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

import { format } from 'date-fns'

const brahma = require('../assets/imgs/brahma.png')
const skol = require('../assets//imgs/skol.png')
const antartica = require('../assets/imgs/antartica.png')
const heineken = require('../assets/imgs/heineken.png')
const golFavor = require('../assets/imgs/bola.png')
const golContra = require('../assets/imgs/bola-contra.png')

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

export default function Partida(props) {
  const time = time => {
    switch (time) {
      case 'Brahma':
        return brahma
      case 'Skol':
        return skol
      case 'Antartica':
        return antartica
      case 'Heineken':
        return heineken
      default:
        console.log('Time sem nome')
    }
  }

  const monthBr = month => {
    let mes = month.split('/')

    return mes[0] + '/' + MESES[parseInt(mes[1]) - 1] + '/' + mes[2]
  }

  return (
    <View style={styles.container}>
      <View style={styles.dataPartida}>
        <Text style={styles.dataTitle}>
          {monthBr(format(props.data, 'dd/MM/yyyy'))}
        </Text>
      </View>

      <View style={styles.infoPartida}>
        <Image style={styles.logo} source={time(props.time1)} />
        <Text style={styles.matchResult}>
          {props.resultado[0] + ' x ' + props.resultado[1]}
        </Text>
        <Image style={styles.logo} source={time(props.time2)} />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.timeContainer}>
          {props.jogadoresTime1.map(jogador => (
            <View key={jogador.Jogador}>
              <Text style={styles.nomeJogador}>{jogador.Jogador}</Text>
              <View style={{ flexDirection: 'row' }}>
                {jogador.Gols.map(gol => (
                  <Image
                    style={styles.bola}
                    source={golFavor}
                    fadeDuration={100}
                  />
                ))}
                {jogador.GolContra.map(gol => (
                  <Image
                    style={styles.bola}
                    source={golContra}
                    fadeDuration={100}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
        <View style={styles.timeContainer}>
          {props.jogadoresTime2.map(jogador => (
            <View key={jogador.Jogador}>
              <Text style={[styles.nomeJogador, { textAlign: 'right' }]}>
                {jogador.Jogador}
              </Text>
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
              >
                {jogador.GolContra.map(gol => (
                  <Image
                    style={styles.bola}
                    source={golContra}
                    fadeDuration={100}
                  />
                ))}
                {jogador.Gols.map(gol => (
                  <Image
                    style={styles.bola}
                    source={golFavor}
                    fadeDuration={100}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'rgba(220, 227, 215, 0.9)',
    flex: 1,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10
  },
  dataPartida: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.80)',
    padding: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10
  },
  dataTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: 'white'
  },
  infoPartida: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: 'rgba(220, 227, 215, 1)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 5
  },
  teamTitle: {
    marginHorizontal: 20,
    fontWeight: '700',
    fontSize: 16
  },
  logo: {
    width: 40,
    height: 40,
    marginHorizontal: 20
  },
  matchResult: {
    fontSize: 22,
    fontWeight: '700'
  },
  cardContainer: {
    backgroundColor: 'rgba(220, 227, 215, 0.9)',
    flexDirection: 'row',
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    justifyContent: 'space-between'
  },
  timeContainer: {
    marginHorizontal: 10
  },
  nomeJogador: {
    fontWeight: '700',
    fontSize: 12,
    marginVertical: 10
  },
  bola: {
    width: 8,
    height: 8,
    marginHorizontal: 3
  }
})
