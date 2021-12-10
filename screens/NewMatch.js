import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'

import Header from '../components/Header'
import ListPlayers from '../components/ListPLayers'
import PickDate from '../components/PickDate'
import PickTeam from '../components/PickTeam'
import Placar from '../components/Placar'

const image = require('../assets/imgs/campo4.jpg')

const brahma = require('../assets/imgs/brahma.png')
const skol = require('../assets//imgs/skol.png')
const antartica = require('../assets/imgs/antartica.png')
const heineken = require('../assets/imgs/heineken.png')

const Jogador = ({
  jogador,
  addScore,
  removeScore,
  addScoreAgainst,
  removeScoreAgainst
}) => (
  <View style={playerComponent.container}>
    <View style={{ alignItems: 'center' }}>
      <Text style={playerComponent.playerName}>{jogador.jogador}</Text>
    </View>
    <View style={playerComponent.playerContainer}>
      <View style={playerComponent.playerContent}>
        <Text>Gols: </Text>
        <TouchableOpacity
          style={playerComponent.button}
          onPress={addScore.bind(this, jogador)}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <Text>{jogador.gol.length}</Text>
        <TouchableOpacity
          style={playerComponent.button}
          onPress={removeScore.bind(this, jogador)}
        >
          <Text>-</Text>
        </TouchableOpacity>
      </View>

      <View style={playerComponent.playerContent}>
        <Text>Contra: </Text>
        <TouchableOpacity
          style={playerComponent.button}
          onPress={addScoreAgainst.bind(this, jogador)}
        >
          <Text>+</Text>
        </TouchableOpacity>
        <Text>{jogador.golContra.length}</Text>
        <TouchableOpacity
          style={playerComponent.button}
          onPress={removeScoreAgainst.bind(this, jogador)}
        >
          <Text>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
)

export default function NewMatch(props) {
  const [modalPlayers, setModalPlayers] = useState(false)
  const [date, setDate] = useState(new Date())
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)
  const [playersTeam1, setPlayersTeam1] = useState([])
  const [playersTeam2, setPlayersTeam2] = useState([])

  const removePLayerAlert = oldPlayer =>
    Alert.alert(
      'Remover Jogador',
      `Remover jogador ${oldPlayer.jogador} do time ${oldPlayer.time}?`,
      [
        {
          text: 'Cancel',
          onPress: () => false,
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            if (oldPlayer.time === 1) {
              setScore1(prevState => {
                return prevState - oldPlayer.gol.length
              })
              setScore2(prevState => {
                return prevState - oldPlayer.golContra.length
              })
              setPlayersTeam1(players => {
                return players.filter(
                  player => player.jogador != oldPlayer.jogador
                )
              })
            } else {
              setScore2(prevState => {
                return prevState - oldPlayer.gol.length
              })
              setScore1(prevState => {
                return prevState - oldPlayer.golContra.length
              })
              setPlayersTeam2(players => {
                return players.filter(
                  player => player.jogador != oldPlayer.jogador
                )
              })
            }
          }
        }
      ]
    )

  const addRemovePlayerHandler = (player, team) => {
    const newPlayer = {
      jogador: player.jogador,
      gol: [],
      golContra: [],
      time: team
    }

    if (team === 1) {
      const oldPlayer = playersTeam1.find(
        element => element.jogador == newPlayer.jogador
      )
      if (oldPlayer === undefined) {
        setPlayersTeam1(prevState => {
          return [...prevState, newPlayer]
        })
      } else {
        removePLayerAlert(oldPlayer)
      }
    } else {
      const oldPlayer = playersTeam2.find(
        element => element.jogador == newPlayer.jogador
      )
      if (oldPlayer === undefined) {
        setPlayersTeam2(prevState => {
          return [...prevState, newPlayer]
        })
      } else {
        removePLayerAlert(oldPlayer)
      }
    }
  }

  const addScore = player => {
    player.gol.push(1)
    if (player.time == 1) {
      setScore1(prevState => {
        return prevState + 1
      })
      let p = playersTeam1.map(pl => {
        if (pl.jogador == player.jogador) {
          return player
        } else {
          return pl
        }
      })
      setPlayersTeam1(p)
    } else {
      setScore2(prevState => {
        return prevState + 1
      })
      let p = playersTeam2.map(pl => {
        if (pl.jogador == player.jogador) {
          return player
        } else {
          return pl
        }
      })
      setPlayersTeam2(p)
    }
  }

  const addScoreAgainst = player => {
    if (player.time == 1) {
      let p = playersTeam1.filter(pl => pl.jogador == player.jogador)

      setScore2(prevState => {
        return prevState + 1
      })
      let newTeam1 = playersTeam1.map(pl => {
        if (pl.jogador == player.jogador) {
          pl.golContra.push(1)
          return pl
        } else {
          return pl
        }
      })
      setPlayersTeam1(newTeam1)
    } else {
      let p = playersTeam2.filter(pl => pl.jogador == player.jogador)

      setScore1(prevState => {
        return prevState + 1
      })
      let newTeam2 = playersTeam2.map(pl => {
        if (pl.jogador == player.jogador) {
          pl.golContra.push(1)
          return pl
        } else {
          return pl
        }
      })
      setPlayersTeam2(newTeam2)
    }
  }

  const removeScore = player => {
    if (player.gol.length > 0) {
      player.gol.pop()
      if (player.time == 1) {
        setScore1(prevState => {
          return prevState > 0 ? prevState - 1 : prevState
        })
        let p = playersTeam1.map(pl => {
          if (pl.jogador == player.jogador) {
            return player
          } else {
            return pl
          }
        })
        setPlayersTeam1(p)
      } else {
        setScore2(prevState => {
          return prevState > 0 ? prevState - 1 : prevState
        })
        let p = playersTeam2.map(pl => {
          if (pl.jogador == player.jogador) {
            return player
          } else {
            return pl
          }
        })
        setPlayersTeam2(p)
      }
    }
  }

  const removeScoreAgainst = player => {
    if (player.golContra.length > 0) {
      player.golContra.pop()
      if (player.time == 1) {
        setScore2(prevState => {
          return prevState > 0 ? prevState - 1 : prevState
        })
        let p = playersTeam1.map(pl => {
          if (pl.jogador == player.jogador) {
            return player
          } else {
            return pl
          }
        })
        setPlayersTeam1(p)
      } else {
        setScore1(prevState => {
          return prevState > 0 ? prevState - 1 : prevState
        })
        let p = playersTeam2.map(pl => {
          if (pl.jogador == player.jogador) {
            return player
          } else {
            return pl
          }
        })
        setPlayersTeam2(p)
      }
    }
  }

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

  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      onRequestClose={() => {
        setModalVisible(false)
      }}
    >
      <View style={styles.container}>
        <Header title="Nova Partida" />
        <PickDate date={date} setDate={newDate => setDate(newDate)} />

        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.logoContainer}>
            <View style={styles.logoContent}>
              {team1 ? (
                <Image style={styles.logo} source={time(team1)} />
              ) : null}
            </View>
            <View style={styles.logoContent}>
              {team2 ? (
                <Image style={styles.logo} source={time(team2)} />
              ) : null}
            </View>
          </View>

          <Placar score1={score1} score2={score2} />
        </ImageBackground>

        <ScrollView>
          <PickTeam team={team1} setTeam={team1 => setTeam1(team1)} num={1} />

          <View style={styles.playersContaier}>
            <View style={styles.playersContaierTitle}>
              <Text>Jogadores {team1}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalPlayers(true)}
              >
                <Ionicons name="ios-person-add-sharp" size={16} color="white" />
              </TouchableOpacity>
            </View>

            <View style={styles.playersContent}>
              {playersTeam1.map(jogador => (
                <Jogador
                  key={jogador.jogador + 'time1'}
                  jogador={jogador}
                  addScore={addScore}
                  removeScore={removeScore}
                  addScoreAgainst={addScoreAgainst}
                  removeScoreAgainst={removeScoreAgainst}
                /> ///// COMPONENTE PLAYER
              ))}
            </View>
            <PickTeam team={team2} setTeam={team2 => setTeam2(team2)} num={2} />
            <View style={styles.playersContaierTitle}>
              <Text>Jogadores {team2}</Text>
            </View>
            <View style={styles.playersContent}>
              {playersTeam2.map(jogador => (
                <Jogador
                  key={jogador.jogador + 'time2'}
                  jogador={jogador}
                  addScore={addScore}
                  removeScore={removeScore}
                  addScoreAgainst={addScoreAgainst}
                  removeScoreAgainst={removeScoreAgainst}
                /> ///// COMPONENTE PLAYER
              ))}
            </View>
          </View>

          <Button title="Fechar" onPress={props.closeModal} />

          <Button
            title="Aumentar placar"
            onPress={() => setPlacarTime1(placarTime1 + 1)}
          />
          <Button
            title="Diminuir placar"
            onPress={() => setPlacarTime1(placarTime1 - 1)}
          />
        </ScrollView>
      </View>

      <ListPlayers
        modalPlayers={modalPlayers}
        closeModal={() => setModalPlayers(!modalPlayers)}
        playersTeam1={playersTeam1}
        playersTeam2={playersTeam2}
        addRemovePlayerHandler={addRemovePlayerHandler}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  image: {},
  playersContaierTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 10
  },
  playersContent: {
    marginHorizontal: 10,
    marginVertical: 10
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 5
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 70
  },
  logoContent: { width: 70 },
  logo: {
    width: 70,
    height: 70,
    marginTop: 10
  }
})

const playerComponent = StyleSheet.create({
  container: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    marginTop: 5,
    backgroundColor: 'white'
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  playerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    elevation: 2
  },
  playerName: {
    color: 'tomato',
    fontWeight: '600',
    paddingBottom: 10
  }
})
