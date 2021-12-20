import React, { useState, useContext } from 'react'

import { View, Text, StyleSheet } from 'react-native'

import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'

import AuthContext from '../config/AuthContext'
import ArtilheiroAno from '../components/ArtilheiroAno'
import ArtilheiroFDK from '../components/ArtilheiroFDK'
import ArtilheiroContraFDK from '../components/ArtilheiroContraFDK'
import ArtilheiroContraAno from '../components/ArtilheiroContraAno'

export default function Ranking() {
  const [ranking, setRanking] = useState(0)

  const { listOfPlayers, listOfMatches } = useContext(AuthContext)

  const placeholder = {
    label: 'Selecione um ranking...',
    value: null,
    color: '#9EA0A4'
  }

  return (
    <View style={styles.container}>
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={placeholder}
        onValueChange={value => setRanking(value)}
        value={ranking}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return (
            <Ionicons
              name="arrow-down-circle"
              size={20}
              color="#32353b"
              style={{ paddingVertical: 10, paddingHorizontal: 10 }}
            />
          )
        }}
        items={[
          { label: 'Artilheiro FDK', value: 0 },
          { label: 'Artilheiro do Ano', value: 1 },
          { label: 'Artilheiro Gol Contra FDK', value: 2 },
          { label: 'Artilheiro Gol Contra Ano', value: 3 }
        ]}
      />
      {ranking == 0 ? (
        <ArtilheiroFDK
          listOfMatches={listOfMatches}
          listOfPlayers={listOfPlayers}
        />
      ) : ranking == 1 ? (
        <ArtilheiroAno
          listOfMatches={listOfMatches}
          listOfPlayers={listOfPlayers}
        />
      ) : ranking == 2 ? (
        <ArtilheiroContraFDK
          listOfMatches={listOfMatches}
          listOfPlayers={listOfPlayers}
        />
      ) : ranking == 3 ? (
        <ArtilheiroContraAno
          listOfMatches={listOfMatches}
          listOfPlayers={listOfPlayers}
        />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rankingTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#32353b'
  },
  rankingText: {
    fontWeight: '600',
    fontSize: 16,
    color: 'white'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    height: 40,
    fontSize: 16,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: '#e1e1e1',
    color: 'black',
    backgroundColor: '#c1c1c1',
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingVertical: 10,
    justifyContent: 'center',
    textAlign: 'center'
  },
  inputAndroid: {
    width: '100%',
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#c1c1c1',
    color: 'black',
    backgroundColor: '#e1e1e1',
    paddingRight: 30, // to ensure the text is never behind the icon
    padding: 0,
    justifyContent: 'center',
    textAlign: 'center'
  }
})
