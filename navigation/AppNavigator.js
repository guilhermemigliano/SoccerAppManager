import React from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabNavigator from './TabNavigator'
import { AuthProvider } from '../config/AuthContext'
const Stack = createNativeStackNavigator() // Stack contains Screen & Navigator properties

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <TabNavigator />
      </AuthProvider>
    </NavigationContainer>
  )
}
