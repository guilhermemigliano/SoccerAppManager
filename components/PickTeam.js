import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import RNPickerSelect from 'react-native-picker-select'
import { Ionicons } from '@expo/vector-icons'

export default function PickTeam(props) {
  const placeholder = {
    label: 'Selecione um time...',
    value: null,
    color: '#9EA0A4'
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.teamTitle}>
          {props.num == 1 ? 'Time 1' : 'Time 2'}
        </Text>
        <RNPickerSelect
          style={pickerSelectStyles}
          placeholder={placeholder}
          onValueChange={value => props.setTeam(value)}
          value={props.team}
          useNativeAndroidPickerStyle={false}
          Icon={() => {
            return (
              <Ionicons
                name="arrow-down-circle"
                size={20}
                color="#ccc"
                style={{ paddingVertical: 10, paddingHorizontal: 10 }}
              />
            )
          }}
          items={[
            { label: 'Skol', value: 'Skol' },
            { label: 'Brahma', value: 'Brahma' },
            { label: 'Heineken', value: 'Heineken' },
            { label: 'Antartica', value: 'Antartica' }
          ]}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  teamTitle: {
    fontWeight: '600',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 1)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: 'white',
    textAlign: 'center'
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: '100%',
    height: 40,
    fontSize: 16,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: '#c9c9c9',
    color: 'black',
    backgroundColor: 'rgba(256, 256, 256, 1)',
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingVertical: 10,
    justifyContent: 'center'
  },
  inputAndroid: {
    width: '100%',
    height: 40,
    fontSize: 16,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#c9c9c9',
    color: 'black',
    backgroundColor: 'rgba(256, 256, 256, 1)',
    paddingRight: 30, // to ensure the text is never behind the icon
    padding: 0,
    justifyContent: 'center'
  }
})
