import React, { useState, useContext, useEffect } from 'react'

import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'

import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'

import { collection, getDocs } from 'firebase/firestore'
import db from '../config/firebase'

import AuthContext from '../config/AuthContext'
import ArtilheiroAno from '../components/ArtilheiroAno'
import ArtilheiroFDK from '../components/ArtilheiroFDK'
import ArtilheiroContraFDK from '../components/ArtilheiroContraFDK'
import ArtilheiroContraAno from '../components/ArtilheiroContraAno'

export default function Ranking({ navigation }) {
  const [ranking, setRanking] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [matches, setMatches] = useState([])
  const [players, setPlayers] = useState([])

  //const { listOfPlayers, listOfMatches } = useContext(AuthContext)

  const placeholder = {
    label: 'Selecione um ranking...',
    value: null,
    color: '#9EA0A4'
  }

  async function getMatches() {
    setIsLoading(true)
    const queryMatches = await getDocs(collection(db, 'Matches')).then(data => {
      const listMatches = []

      data.forEach(doc => {
        listMatches.push({
          date: doc.data().date.toDate(),
          jogadoresTime1: doc.data().jogadoresTime1,
          jogadoresTime2: doc.data().jogadoresTime2,
          resultado: doc.data().resultado,
          time1: doc.data().time1,
          time2: doc.data().time2,
          id: doc.id
        })
      })

      //Ordenando as partidas
      listMatches.sort(function (a, b) {
        if (a.date > b.date) {
          return 1
        }
        if (a.date < b.date) {
          return -1
        }
        // a must be equal to b
        return 0
      })
      setMatches(listMatches)
    })
  }
  const getPlayers = async () => {
    //lista de jogadores

    const queryPlayers = await getDocs(collection(db, 'Players'))
    //const p = { label: '', value: '' }

    const listPlayers = []

    queryPlayers.forEach(p => {
      listPlayers.push({
        id: p.id,
        jogador: p.data().jogador,
        tipo: p.data().tipo,
        status: p.data().status
      })
    })
    setPlayers(listPlayers)
    setIsLoading(false)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMatches().then(() => {
        getPlayers()
      })
    })

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe
  }, [navigation])

  if (isLoading) {
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
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </View>
    )
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
        <ArtilheiroFDK listOfMatches={matches} listOfPlayers={players} />
      ) : ranking == 1 ? (
        <ArtilheiroAno listOfMatches={matches} listOfPlayers={players} />
      ) : ranking == 2 ? (
        <ArtilheiroContraFDK listOfMatches={matches} listOfPlayers={players} />
      ) : ranking == 3 ? (
        <ArtilheiroContraAno listOfMatches={matches} listOfPlayers={players} />
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
