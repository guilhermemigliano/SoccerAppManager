import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabNavigator from './TabNavigator'
const Stack = createNativeStackNavigator() // Stack contains Screen & Navigator properties

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  )
}
