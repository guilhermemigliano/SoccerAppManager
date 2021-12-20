import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  Button,
  Platform
} from 'react-native'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import db from '../config/firebase'

import PickTeam from './PickTeam'

const Player = ({
  player,
  playersTeam1,
  playersTeam2,
  addRemovePlayerHandler
}) => {
  return (
    <View style={styles.playerContainer}>
      <Text style={{ color: 'white', flex: 1 }}>{player.jogador}</Text>
      {playersTeam1.some(elem => elem.jogador == player.jogador) ? (
        <TouchableOpacity
          style={[{ ...styles.buttonLeft }, { backgroundColor: 'tomato' }]}
          onPress={addRemovePlayerHandler.bind(this, player, 1)}
        >
          <Text style={{ color: 'white' }}>TIME 1</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={addRemovePlayerHandler.bind(this, player, 1)}
        >
          <Text style={{ color: 'white' }}>TIME 1</Text>
        </TouchableOpacity>
      )}

      {playersTeam2.some(elem => elem.jogador == player.jogador) ? (
        <TouchableOpacity
          style={[{ ...styles.buttonRight }, { backgroundColor: '#3f6dd4' }]}
          onPress={addRemovePlayerHandler.bind(this, player, 2)}
        >
          <Text style={{ color: 'white' }}>TIME 2</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttonRight}
          onPress={addRemovePlayerHandler.bind(this, player, 2)}
        >
          <Text style={{ color: 'white' }}>TIME 2</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default function ListPlayers(props) {
  const [players, setPlayers] = useState([])

  async function readPlayers() {
    const querySnapshot = await getDocs(collection(db, 'Players'))
    const list = []
    querySnapshot.forEach(doc => {
      list.push({
        id: doc.id,
        jogador: doc.data().jogador,
        tipo: doc.data().tipo
      })
      //console.log(`${doc.id} => ${doc.data()}  => ${doc.data().id}`)
    })
    list.sort(function (a, b) {
      if (a.jogador > b.jogador) {
        return 1
      }
      if (a.jogador < b.jogador) {
        return -1
      }
      // a must be equal to b
      return 0
    })
    setPlayers(list)
    console.log(players)
  }

  useEffect(() => {
    readPlayers()
  }, [])

  return (
    <Modal
      animationType="slide"
      visible={props.modalPlayers}
      onRequestClose={() => {
        setModalPlayers(false)
      }}
    >
      <SafeAreaView style={{ flex: 0, backgroundColor: '#31343b' }} />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{ backgroundColor: '#31343b' }}
          showsVerticalScrollIndicator={false}
        >
          <PickTeam team={props.team1} setTeam={props.setTeam1} num={1} />
          <PickTeam team={props.team2} setTeam={props.setTeam2} num={2} />
          {players.map(jogador => (
            <Player
              key={jogador.jogador}
              player={jogador}
              playersTeam1={props.playersTeam1}
              playersTeam2={props.playersTeam2}
              addRemovePlayerHandler={props.addRemovePlayerHandler}
            />
          ))}
        </ScrollView>
        <View>
          <TouchableOpacity
            style={styles.buttonModal}
            onPress={props.closeModal}
          >
            <Text style={styles.buttonModalTitle}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#454852' },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    marginVertical: 10
  },
  buttonLeft: {
    backgroundColor: '#454852',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginRight: 10,
    borderRadius: 5
  },
  buttonRight: {
    backgroundColor: '#454852',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5
  },
  buttonModal: {
    backgroundColor: '#454852',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginTop: 0,
    borderTopWidth: 2,
    borderColor: '#31343b'
  },
  buttonModalTitle: {
    fontWeight: '700',
    color: 'white',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 0
  }
})
