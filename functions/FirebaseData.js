// Pegar partidas

import { collection, getDocs } from 'firebase/firestore'
import db from '../config/firebase'

export async function getMatches() {
  const queryMatches = await getDocs(collection(db, 'Matches'))
  const listMatches = []

  queryMatches.forEach(doc => {
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

  return listMatches
}

//Pegar jogadores

export async function getPlayers() {
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

  return listPlayers
}
