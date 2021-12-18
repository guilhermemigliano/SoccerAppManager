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
                /> ///// COMPONENTE JOGADOR
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
                /> ///// COMPONENTE JOGADOR
              ))}
            </View>
          </View>



          import { collection, getDocs, addDoc } from 'firebase/firestore'
import db from '../config/firebase'


          async function addFirebase() {
            const docRef = await addDoc(collection(db, 'Players'), {
              id: 'id03',
              name: 'James'
            })
            console.log('Document written with ID: ', docRef.id)
          }
          
          async function readPlayers() {
            const querySnapshot = await getDocs(collection(db, 'Players'))
            list = []
            querySnapshot.forEach(doc => {
              list.push(doc.data)
              console.log(`${doc.id} => ${doc.data()}  => ${doc.data().id}`)
            })
        
          }