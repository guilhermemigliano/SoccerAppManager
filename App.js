import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './navigation/AppNavigator'

import { enableScreens } from 'react-native-screens'

enableScreens()

const Tab = createBottomTabNavigator()

export default function App() {
  return <AppNavigator />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
