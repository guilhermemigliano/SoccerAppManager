import React from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TabNavigator from './TabNavigator'
import EditMatch from '../screens/EditMatch'
import NewMatch from '../screens/NewMatch'
import { AuthProvider } from '../config/AuthContext'
const Stack = createNativeStackNavigator() // Stack contains Screen & Navigator properties

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="Index"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Nova Partida"
            component={NewMatch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Editar Partida"
            component={EditMatch}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  )
}
