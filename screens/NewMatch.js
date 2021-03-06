import React, { useState, useContext, useEffect } from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform
} from 'react-native'

import { Ionicons } from '@expo/vector-icons'
//import Sound from 'react-native-sound'
import { Audio } from 'expo-av'

import { collection, addDoc } from 'firebase/firestore'
import db from '../config/firebase'

import AuthContext from '../config/AuthContext'

import ListPlayers from '../components/ListPLayers'
import Placar from '../components/Placar'
import Jogador from '../components/Jogador'
import DateTimePicker from '@react-native-community/datetimepicker'
import StopWatch from '../components/StopWatch'
import Match from '../models/match'

const image = require('../assets/imgs/campo4.jpg')

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true
  //interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
})

export default function NewMatch({ navigation }) {
  const [date, setDate] = useState(new Date())
  const [isDate, setIsDate] = useState(false)
  const [show, setShow] = useState(false)
  const [modalPlayers, setModalPlayers] = useState(false)
  const [team1, setTeam1] = useState(null)
  const [team2, setTeam2] = useState(null)
  const [score1, setScore1] = useState(0)
  const [score2, setScore2] = useState(0)
  const [playersTeam1, setPlayersTeam1] = useState([])
  const [playersTeam2, setPlayersTeam2] = useState([])
  const [totalTime, setTotalTime] = useState(510)
  const [timer, setTimer] = useState(510)
  const [play, setPlay] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const [sound, setSound] = React.useState()

  const { setUpdate } = useContext(AuthContext)
  //const sound = new Sound('../assets/sounds/audio.mp3')

  async function playSound() {
    console.log('Loading Sound')
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/sounds/audio.mp3')
    )
    setSound(sound)

    console.log('Playing Sound')
    await sound.playAsync()
  }

  global.temporizador

  function startTimer() {
    setPlay(true)
    global.temporizador = setInterval(handleTimer, 1000)
  }

  function stopTimer() {
    clearInterval(global.temporizador)
    setPlay(false)
    setTotalTime(timer)
  }
  const stopTimerAlert = () =>
    Alert.alert('Reiniciar Jogo', `Tem certeza que deseja reiniciar o jogo?`, [
      {
        text: 'N??o',
        onPress: () => false,
        style: 'cancel'
      },
      {
        text: 'Sim',
        onPress: stopTimer
      }
    ])

  function pauseTimer() {
    clearInterval(global.temporizador)
    setPlay(false)
  }

  const handleTimer = () => {
    setTotalTime(prev => {
      if (prev == 1) {
        clearInterval(global.temporizador)
        playSound()
        setPlay(false)
        return prev + timer - 1
      } else {
        return prev - 1
      }
    })
  }

  const setMinutesUp = () => {
    if (!play) {
      setTimer(prevState => {
        return prevState + 60
      })
      setTotalTime(prevState => {
        return prevState + 60
      })
    }
  }
  const setMinutesDown = () => {
    if (!play) {
      setTimer(prevState => {
        return prevState - 60
      })
      setTotalTime(prevState => {
        return prevState - 60
      })
    }
  }
  const setSecondsUp = () => {
    if (!play) {
      setTimer(prevState => {
        return prevState + 1
      })
      setTotalTime(prevState => {
        return prevState + 1
      })
    }
  }

  const setSecondsDown = () => {
    if (!play) {
      setTimer(prevState => {
        return prevState - 1
      })
      setTotalTime(prevState => {
        return prevState - 1
      })
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setDate(currentDate)
  }

  const removePLayerAlert = oldPlayer =>
    Alert.alert(
      'Remover Jogador',
      `Remover o jogador ${oldPlayer.jogador} do time ${oldPlayer.time}?`,
      [
        {
          text: 'Cancelar',
          onPress: () => false,
          style: 'cancel'
        },
        {
          text: 'Confirmar',
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
      time: team,
      id: player.id,
      tipo: player.tipo
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

  const cancelMatchAlert = () =>
    Alert.alert(
      'Cancelar Partida',
      `Tem certeza que deseja cancelar a partida?`,
      [
        {
          text: 'N??o',
          onPress: () => false,
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: cancelMatch
        }
      ]
    )
  const cancelMatch = () => {
    setTeam1(null)
    setTeam2(null)
    setScore1(0)
    setScore2(0)
    setPlayersTeam1([])
    setPlayersTeam2([])
    setTotalTime(510)
    setTimer(510)
    setPlay(false)
    setShowTimer(false)
    setDate(new Date())
    setIsDate(false)
    setShow(false)
    setUpdate()
    navigation.navigate('Home')
  }

  async function saveMatch() {
    try {
      match1 = new Match(date, team1, team2, playersTeam1, playersTeam2, [
        score1,
        score2
      ])
      const docRef = await addDoc(collection(db, 'Matches'), { ...match1 })
        .then(() => {
          Alert.alert('Partida adicionada com sucesso!')
        })
        .then(() => {
          cancelMatch()
        })
    } catch (e) {
      Alert.alert(e)
      //console.error('Error adding document: ', e)
    }
  }

  const saveMatchAlert = () => {
    if (isDate === false) {
      return Alert.alert('Selecione a data da partida!')
    }

    if (team1 === null || team2 === null) {
      return Alert.alert('Selecione os times da partida!')
    }
    if (playersTeam1.length == 0 || playersTeam2.length == 0) {
      return Alert.alert('Selecione os jogadores!')
    }

    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    }

    Alert.alert(
      'Criar partida',
      `Data da partida: ${date.toLocaleDateString('pt-BR', options)}`,
      [
        {
          text: 'Cancelar',
          onPress: () => false,
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => {
            saveMatch()
          }
        }
      ]
    )
  }

  const setDateModal = () => {
    setShow(!show)
    setIsDate(true)
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <Placar
            score1={score1}
            score2={score2}
            date={date}
            team1={team1}
            team2={team2}
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
              width: 200,
              shadowColor: 'black',
              shadowOffset: { width: 5, height: 1 },
              shadowOpacity: 0.4,
              elevation: 10
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(256,256,256, 0.7)',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 10
              }}
            >
              <Text style={{ textAlign: 'center', fontWeight: '700' }}>
                {Math.floor((totalTime % 3600) / 60) > 9
                  ? Math.floor((totalTime % 3600) / 60)
                  : '0' + Math.floor((totalTime % 3600) / 60)}
              </Text>
              <Text style={{ textAlign: 'center', fontWeight: '700' }}>
                {' '}
                :{' '}
              </Text>
              <Text style={{ textAlign: 'center', fontWeight: '700' }}>
                {' '}
                {Math.floor((totalTime % 3600) % 60) > 9
                  ? Math.floor((totalTime % 3600) % 60)
                  : '0' + Math.floor((totalTime % 3600) % 60)}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.menuContainer}>
          <View style={styles.menuContent}>
            <TouchableOpacity
              style={styles.buttonMenu}
              onPress={() => setModalPlayers(true)}
            >
              <Ionicons name="ios-person-add-sharp" size={16} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonMenu} onPress={setDateModal}>
              <Ionicons name="calendar" size={24} color="white" />
            </TouchableOpacity>
            {show && (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                  textColor="white"
                  style={{ width: 90, opacity: 1 }}
                  themeVariant="dark"
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.buttonMenu}
              onPress={() => setShowTimer(!showTimer)}
            >
              <Ionicons name="timer" size={24} color="white" />
            </TouchableOpacity>

            {!play ? (
              <TouchableOpacity style={styles.buttonMenu} onPress={startTimer}>
                <Ionicons name="play" size={24} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonMenu}
                onPress={stopTimerAlert}
              >
                <Ionicons name="ios-stop" size={24} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.buttonMenu} onPress={pauseTimer}>
              <Ionicons name="pause" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {showTimer && (
            <StopWatch
              totalTime={timer}
              setMinutesUp={setMinutesUp}
              setMinutesDown={setMinutesDown}
              setSecondsUp={setSecondsUp}
              setSecondsDown={setSecondsDown}
            />
          )}
          <View style={styles.playersContaier}>
            <View style={styles.playersContainerTitle1}>
              <Text style={styles.playersContainerTitleText}>
                Time 1 {team1 ? `(${team1})` : null} - Jogadores
              </Text>
            </View>

            {playersTeam1.length > 0 ? (
              <View style={styles.playersContent}>
                {playersTeam1.map(jogador => (
                  <Jogador
                    key={jogador.jogador + 'time1'}
                    jogador={jogador}
                    addScore={addScore}
                    removeScore={removeScore}
                    addScoreAgainst={addScoreAgainst}
                    removeScoreAgainst={removeScoreAgainst}
                  /> ///// COMPONENTE JOGADOR
                ))}
              </View>
            ) : (
              <Text
                style={{ textAlign: 'center', marginTop: 20, color: 'white' }}
              >
                Escolha os jogadores no ??cone{'   '}
                <Ionicons
                  name="ios-person-add-sharp"
                  size={16}
                  color="white"
                />{' '}
              </Text>
            )}

            <View style={styles.playersContainerTitle2}>
              <Text style={styles.playersContainerTitleText}>
                Time 2 {team2 ? `(${team2})` : null} - Jogadores
              </Text>
            </View>
            {playersTeam2.length > 0 ? (
              <View style={styles.playersContent}>
                {playersTeam2.map(jogador => (
                  <Jogador
                    key={jogador.jogador + 'time2'}
                    jogador={jogador}
                    addScore={addScore}
                    removeScore={removeScore}
                    addScoreAgainst={addScoreAgainst}
                    removeScoreAgainst={removeScoreAgainst}
                  /> ///// COMPONENTE JOGADOR
                ))}
              </View>
            ) : (
              <Text
                style={{ textAlign: 'center', marginTop: 20, color: 'white' }}
              >
                Escolha os jogadores no ??cone{'   '}
                <Ionicons
                  name="ios-person-add-sharp"
                  size={16}
                  color="white"
                />{' '}
              </Text>
            )}
          </View>
        </ScrollView>
        <View style={{ flexDirection: 'row', paddingTop: 5 }}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={cancelMatchAlert}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
              Fechar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={saveMatchAlert}
          >
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '700' }}>
              Salvar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ListPlayers
        modalPlayers={modalPlayers}
        closeModal={() => setModalPlayers(!modalPlayers)}
        playersTeam1={playersTeam1}
        playersTeam2={playersTeam2}
        addRemovePlayerHandler={addRemovePlayerHandler}
        team1={team1}
        team2={team2}
        setTeam1={team1 => setTeam1(team1)}
        setTeam2={team2 => setTeam2(team2)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31343b'
  },
  imageContainer: {
    borderRadius: 20
  },
  image: { overflow: 'hidden', justifyContent: 'center', alignItems: 'center' },
  playersContainerTitle1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'tomato',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  playersContainerTitle2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3f6dd4',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  playersContainerTitleText: {
    color: 'white',
    fontWeight: '700'
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
  menuContainer: {
    backgroundColor: '#31343b',
    paddingVertical: 5,
    borderTopWidth: 4,
    borderColor: '#454952'
  },
  menuContent: {
    backgroundColor: '#27292e',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    borderRadius: 10
  },
  buttonMenu: {
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: '#454952',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 30 : 10,
    backgroundColor: '#27292e',
    borderRadius: 10,
    borderColor: '#31343b',
    height: 35
  }
})
