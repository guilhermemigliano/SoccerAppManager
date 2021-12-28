import React, { useContext, Fragment } from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native'

import { format } from 'date-fns'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AuthContext from '../config/AuthContext'

const brahma = require('../assets/imgs/brahma.png')
const skol = require('../assets//imgs/skol.png')
const antartica = require('../assets/imgs/antartica.png')
const heineken = require('../assets/imgs/heineken.png')

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

export default function Partida({
  matchId,
  time1,
  time2,
  resultado,
  data,
  jogadoresTime1,
  jogadoresTime2,
  navigation
}) {
  const { isLogged } = useContext(AuthContext)

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
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.dataTitle}>
          {monthBr(format(data, 'dd/MM/yyyy'))}
        </Text>
        {isLogged ? (
          <TouchableOpacity
            onPress={() =>
              navigation.push('Editar Partida', {
                matchId: matchId
              })
            }
          >
            <Ionicons
              name="ios-settings-sharp"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.matchContent}>
        <View style={styles.teamLogo}>
          <Image style={styles.logo} source={time(time1)} />
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.matchResult}>{resultado[0]}</Text>
        </View>
        <Text style={styles.matchResult}> : </Text>
        <View style={styles.scoreContainer}>
          <Text style={styles.matchResult}>{resultado[1]}</Text>
        </View>
        <View style={styles.teamLogo}>
          <Image style={styles.logo} source={time(time2)} />
        </View>
      </View>

      <View style={styles.playersContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.playersContent}>
            <View style={styles.teamsContainer}>
              {jogadoresTime1.map(jogador => (
                <Fragment key={Math.random()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      marginVertical: 5
                    }}
                  >
                    <Text
                      style={styles.playerNameText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {jogador.jogador}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 28,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start'
                    }}
                  >
                    {jogador.gol.map(gol => (
                      <Ionicons
                        name="ios-football"
                        size={10}
                        color="#000"
                        key={Math.random()}
                        style={styles.ballIcon}
                      />
                    ))}
                    {jogador.golContra.map(gol => (
                      <Ionicons
                        key={Math.random()}
                        name="ios-football"
                        size={10}
                        color="red"
                        key={Math.random()}
                        style={styles.ballIcon}
                      />
                    ))}
                  </View>
                </Fragment>
              ))}
            </View>
            <View style={styles.teamsContainer}>
              {jogadoresTime2.map(jogador => (
                <Fragment key={Math.random()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      marginVertical: 5
                    }}
                  >
                    <Text
                      style={[
                        {
                          textAlign: 'right'
                        },
                        styles.playerNameText
                      ]}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {jogador.jogador}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 28,
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end'
                    }}
                  >
                    {jogador.gol.map(gol => (
                      <Ionicons
                        key={Math.random()}
                        name="ios-football"
                        size={10}
                        color="#000"
                        key={Math.random()}
                        style={styles.ballIcon}
                      />
                    ))}
                    {jogador.golContra.map(gol => (
                      <Ionicons
                        name="ios-football"
                        size={10}
                        color="red"
                        key={Math.random()}
                        style={styles.ballIcon}
                      />
                    ))}
                  </View>
                </Fragment>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'rgba(220, 227, 215, 0.9)',
    flex: 1,

    marginVertical: 10,
    padding: 0,
    borderRadius: 30
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 10
  },
  teamLogo: {
    backgroundColor: 'white',
    borderRadius: 100,
    width: 75,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 10,
    marginVertical: 10,
    marginHorizontal: 10
  },
  logo: {
    width: 70,
    height: 70
  },
  scoreContainer: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    justifyContent: 'center',
    flex: 0,
    //backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 10
  },
  teamsContainer: {
    flex: 1,
    //backgroundColor: 'grey',
    marginVertical: 10,
    marginHorizontal: 20
  },
  dataTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
    flex: 1,
    marginLeft: 10
  },
  matchResult: {
    fontSize: 35,
    fontWeight: '700',
    color: 'black'
  },

  playersContainer: {
    backgroundColor: 'rgba(242, 242, 242, 0.8)',
    flex: 1,
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: { width: 4, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    elevation: 10
  },

  playersContent: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10
  },
  playerNameText: {
    flex: 1,
    overflow: 'hidden',
    fontWeight: '700',
    color: 'black'
  },
  ballIcon: {
    marginLeft: 3,
    marginVertical: 1
  }
})
