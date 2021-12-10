import React, { useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  Button
} from 'react-native'

const Player = ({
  player,
  playersTeam1,
  playersTeam2,
  addRemovePlayerHandler
}) => {
  return (
    <View style={styles.playerContainer}>
      {playersTeam1.some(elem => elem.jogador == player.jogador) ? (
        <TouchableOpacity
          style={[{ ...styles.buttonLeft }, { backgroundColor: '#f58d64' }]}
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

      <Text>{player.jogador}</Text>
      {playersTeam2.some(elem => elem.jogador == player.jogador) ? (
        <TouchableOpacity
          style={[{ ...styles.buttonRight }, { backgroundColor: '#000' }]}
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

const jogadores = [
  { jogador: 'Guilherme Migliano' },
  { jogador: 'Guilherme Migliano1' },
  { jogador: 'Guilherme Migliano2' },
  { jogador: 'Guilherme Migliano3' },
  { jogador: 'Guilherme Migliano4' },
  { jogador: 'Guilherme Migliano5' },
  { jogador: 'Guilherme Migliano6' },
  { jogador: 'Guilherme Migliano7' },
  { jogador: 'Guilherme Migliano8' },
  { jogador: 'Guilherme Migliano9' }
]

export default function ListPlayers(props) {
  return (
    <Modal
      animationType="slide"
      visible={props.modalPlayers}
      onRequestClose={() => {
        setModalPlayers(false)
      }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {jogadores.map(jogador => (
            <Player
              key={jogador.jogador}
              player={jogador}
              playersTeam1={props.playersTeam1}
              playersTeam2={props.playersTeam2}
              addRemovePlayerHandler={props.addRemovePlayerHandler}
            />
          ))}
        </ScrollView>
        <View style={{ alignItems: 'center' }}>
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
  container: { flex: 1 },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#c1c1c1',
    borderRadius: 10
  },
  buttonLeft: {
    width: '30%',
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 0,
    borderTopEndRadius: 0,
    borderTopStartRadius: 8
  },
  buttonRight: {
    width: '30%',
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 8,
    borderTopEndRadius: 8,
    borderTopStartRadius: 0
  },
  buttonModal: {
    width: 100,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8
  },
  buttonModalTitle: {
    fontWeight: '600',
    color: 'white'
  }
})
