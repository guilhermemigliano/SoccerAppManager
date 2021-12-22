import React from 'react'

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native'

export default function Jogador({
  jogador,
  addScore,
  removeScore,
  addScoreAgainst,
  removeScoreAgainst
}) {
  return (
    <View>
      {jogador.tipo == 'goleiro' ? (
        <View style={playerComponent.goalKeeper}>
          <View style={playerComponent.playerContainer}>
            <Text style={playerComponent.playerName}>{jogador.jogador}</Text>
          </View>
          <View style={playerComponent.buttonContainer}>
            <View style={playerComponent.playerContent}>
              <Text style={playerComponent.text}>Gols: </Text>
              <TouchableOpacity
                style={playerComponent.button}
                onPress={addScore.bind(this, jogador)}
              >
                <Text style={playerComponent.text}>+</Text>
              </TouchableOpacity>
              <Text style={playerComponent.text}>{jogador.gol.length}</Text>
              <TouchableOpacity
                style={playerComponent.button}
                onPress={removeScore.bind(this, jogador)}
              >
                <Text style={playerComponent.text}>-</Text>
              </TouchableOpacity>
            </View>

            <View style={playerComponent.playerContent}>
              <Text style={playerComponent.text}>Contra: </Text>
              <TouchableOpacity
                style={playerComponent.button}
                onPress={addScoreAgainst.bind(this, jogador)}
              >
                <Text style={playerComponent.text}>+</Text>
              </TouchableOpacity>
              <Text style={playerComponent.text}>
                {jogador.golContra.length}
              </Text>
              <TouchableOpacity
                style={playerComponent.button}
                onPress={removeScoreAgainst.bind(this, jogador)}
              >
                <Text style={playerComponent.text}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={playerComponent.container}>
          <View style={playerComponent.playerContainer}>
            <Text style={playerComponent.playerName}>{jogador.jogador}</Text>
          </View>
          <View style={playerComponent.buttonContainer}>
            <View style={playerComponent.playerContent}>
              <Text style={playerComponent.text}>Gols: </Text>
              <TouchableOpacity
                style={playerComponent.button}
                onPress={addScore.bind(this, jogador)}
              >
                <Text style={playerComponent.text}>+</Text>
              </TouchableOpacity>
              <Text style={playerComponent.text}>{jogador.gol.length}</Text>
              <TouchableOpacity
                style={playerComponent.button}
                onPress={removeScore.bind(this, jogador)}
              >
                <Text style={playerComponent.text}>-</Text>
              </TouchableOpacity>
            </View>

            <View style={playerComponent.playerContent}>
              <Text style={playerComponent.text}>Contra: </Text>
              <TouchableOpacity
                style={playerComponent.button}
                onPress={addScoreAgainst.bind(this, jogador)}
              >
                <Text style={playerComponent.text}>+</Text>
              </TouchableOpacity>
              <Text style={playerComponent.text}>
                {jogador.golContra.length}
              </Text>
              <TouchableOpacity
                style={playerComponent.button}
                onPress={removeScoreAgainst.bind(this, jogador)}
              >
                <Text style={playerComponent.text}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const playerComponent = StyleSheet.create({
  container: {
    paddingVertical: 0,
    marginTop: 5,
    backgroundColor: '#454952',
    borderRadius: 10
  },
  goalKeeper: {
    paddingVertical: 0,
    marginTop: 5,
    backgroundColor: '#606570',
    borderRadius: 10
  },
  playerContainer: {
    alignItems: 'center'
  },
  playerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#454952',
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    elevation: 2,
    width: 35,
    height: 35
  },
  playerName: {
    color: 'white',
    fontWeight: '700',
    paddingVertical: 5
  },
  text: {
    color: 'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 5,
    backgroundColor: '#31343b',
    borderRadius: 10
  }
})
