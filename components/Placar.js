import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { format } from 'date-fns'

const brahma = require('../assets/imgs/brahma.png')
const skol = require('../assets//imgs/skol.png')
const antartica = require('../assets/imgs/antartica.png')
const heineken = require('../assets/imgs/heineken.png')

export default function Placar({ score1, score2, team1, team2 }) {
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
    <View style={styles.container}>
      <View style={styles.score}>
        <Text style={styles.scoreTitle}>{score1}</Text>
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.imageContainer}>
          {team1 ? <Image style={styles.logo} source={time(team1)} /> : null}
        </View>
        <Text style={styles.placarSeparador}>:</Text>
        <View style={styles.imageContainer}>
          {team2 ? <Image style={styles.logo} source={time(team2)} /> : null}
        </View>
      </View>

      <View style={styles.score}>
        <Text style={styles.scoreTitle}>{score2}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%'
  },
  score: {
    backgroundColor: '#fcfcfc',
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
    marginHorizontal: Dimensions.get('window').width * 0.03,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    elevation: 10,
    borderRadius: 10,
    minWidth: 65,
    alignItems: 'center'
  },
  scoreTitle: {
    fontSize: 40,
    color: 'black'
  },
  placarSeparador: {
    color: 'white',
    fontSize: 40
  },
  dateTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 50,
    height: 50
  },
  imageContainer: {
    width: 50,
    height: 50,
    marginHorizontal: 20
  }
})
