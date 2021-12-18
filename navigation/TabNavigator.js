import React from 'react'
import { TouchableOpacity, Platform } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Home from '../screens/Home'
import Ranking from '../screens/Ranking'
import Settings from '../screens/Settings'

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === 'Home') {
            iconName = focused ? 'whistle' : 'whistle-outline'
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size * 0.8}
                color={color}
              />
            )
          } else if (route.name === 'Ranking') {
            iconName = focused ? 'trophy' : 'trophy-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline'
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size * 0.8} color={color} />
        },
        tabBarActiveTintColor: '#3f6dd4',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: 'white' },
        headerStyle: {
          backgroundColor: '#31343b'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
          marginBottom: Platform.OS === 'ios' ? 10 : 0
        },
        headerTitleAlign: 'center'
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Partidas',
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{
          title: 'Ranking'
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configurações'
        }}
      />
    </Tab.Navigator>
  )
}
