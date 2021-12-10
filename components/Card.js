import React, { useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import Carousel from 'react-native-snap-carousel'
import { addDays, addMonths, isSameMonth, subDays, subMonths } from 'date-fns'
import Partida from './Partida'

export default function Card(props) {
  const [collection, setCollection] = useState([
    {
      id: '0',
      time1: 'Brahma',
      time2: 'Skol',
      date: subDays(new Date(), 10),
      resultado: [10, 13],
      jogadoresTime1: [
        { Jogador: 'Jogador1', Gols: [1, 1, 1, 1, 1, 1], GolContra: [1] },
        { Jogador: 'Jogador2', Gols: [1, 1], GolContra: [] },
        { Jogador: 'Jogador3', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador91', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador92', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador93', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador94', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador95', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador96', Gols: [], GolContra: [] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador4', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador5', Gols: [1, 1, 1, 1, 1, 1, 1], GolContra: [1] },
        { Jogador: 'Jogador6', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador97', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador98', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador99', Gols: [], GolContra: [] },
        { Jogador: 'Jogador100', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador101', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador102', Gols: [1], GolContra: [] },
        { Jogador: 'Jogador103', Gols: [1], GolContra: [] }
      ]
    },
    {
      id: '1',
      time1: 'Brahma',
      time2: 'Heineken',
      date: subDays(new Date(), 5),
      resultado: [15, 23],
      jogadoresTime1: [
        { Jogador: 'Jogador7', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador8', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador9', Gols: [1, 1], GolContra: [] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador10', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador11', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador12', Gols: [1, 1, 1, 1], GolContra: [1] }
      ]
    },
    {
      id: '2',
      time1: 'Antartica',
      time2: 'Skol',
      date: new Date(),
      resultado: [15, 23],
      jogadoresTime1: [
        { Jogador: 'Jogador13', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador14', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador15', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador16', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador17', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador18', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '3',
      time1: 'Brahma',
      time2: 'Skol',
      date: addDays(new Date(), 1),
      resultado: [7, 3],
      jogadoresTime1: [
        { Jogador: 'Jogador19', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador20', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador21', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador22', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador23', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador24', Gols: [1, 1, 1, 1], GolContra: [1] }
      ]
    },
    {
      id: '4',
      time1: 'Antartica',
      time2: 'Skol',
      date: addDays(new Date(), 3),
      resultado: [10, 10],
      jogadoresTime1: [
        { Jogador: 'Jogador25', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador26', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador27', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador28', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador29', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador30', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '5',
      time1: 'Brahma',
      time2: 'Skol',
      date: subMonths(new Date(), 1),
      resultado: [7, 1],
      jogadoresTime1: [
        { Jogador: 'Jogador31', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador32', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador33', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador34', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador35', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador36', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '6',
      time1: 'Brahma',
      time2: 'Heineken',
      date: subMonths(new Date(), 1),
      resultado: [15, 23],
      jogadoresTime1: [
        { Jogador: 'Jogador37', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador38', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador39', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador40', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador41', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador42', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '7',
      time1: 'Brahma',
      time2: 'Skol',
      date: subMonths(new Date(), 1),
      resultado: [2, 1],
      jogadoresTime1: [
        { Jogador: 'Jogador43', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador44', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador45', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador46', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador47', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador48', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '8',
      time1: 'Brahma',
      time2: 'Skol',
      date: subMonths(new Date(), 1),
      resultado: [7, 5],
      jogadoresTime1: [
        { Jogador: 'Jogador49', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador50', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador51', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador52', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador53', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador54', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '9',
      time1: 'Antartica',
      time2: 'Skol',
      date: subMonths(new Date(), 1),
      resultado: [10, 10],
      jogadoresTime1: [
        { Jogador: 'Jogador55', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador56', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador57', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador58', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador59', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador60', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '10',
      time1: 'Brahma',
      time2: 'Skol',
      date: addMonths(new Date(), 1),
      resultado: [1, 8],
      jogadoresTime1: [
        { Jogador: 'Jogador61', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador62', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador63', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador64', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador65', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador66', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '11',
      time1: 'Brahma',
      time2: 'Skol',
      date: addMonths(new Date(), 1),
      resultado: [4, 4],
      jogadoresTime1: [
        { Jogador: 'Jogador67', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador68', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador69', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador70', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador71', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador72', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '12',
      time1: 'Antartica',
      time2: 'Skol',
      date: addMonths(new Date(), 1),
      resultado: [3, 3],
      jogadoresTime1: [
        { Jogador: 'Jogador73', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador74', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador75', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador76', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador77', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador78', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '13',
      time1: 'Brahma',
      time2: 'Heineken',
      date: addMonths(new Date(), 1),
      resultado: [2, 2],
      jogadoresTime1: [
        { Jogador: 'Jogador79', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador80', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador81', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador82', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador83', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador84', Gols: [1, 1], GolContra: [1] }
      ]
    },
    {
      id: '14',
      time1: 'Brahma',
      time2: 'Skol',
      date: addMonths(new Date(), 1),
      resultado: [7, 7],
      jogadoresTime1: [
        { Jogador: 'Jogador85', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador86', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador87', Gols: [1, 1], GolContra: [1] }
      ],
      jogadoresTime2: [
        { Jogador: 'Jogador88', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador89', Gols: [1, 1], GolContra: [1] },
        { Jogador: 'Jogador90', Gols: [1, 1], GolContra: [1] }
      ]
    }
  ])

  const filteredGames = collection.filter(col =>
    isSameMonth(col.date, props.date)
  )

  const SLIDER_WIDTH = Dimensions.get('window').width
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8)

  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        data={filteredGames}
        renderItem={({ item }) => (
          <Partida
            key={item.id}
            time1={item.time1}
            time2={item.time2}
            resultado={item.resultado}
            data={item.date}
            jogadoresTime1={item.jogadoresTime1}
            jogadoresTime2={item.jogadoresTime2}
          />
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        useScrollView={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 }
})
