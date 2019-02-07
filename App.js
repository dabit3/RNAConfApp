import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import Schedule from './Schedule'
import Profile from './Profile'

import { withAuthenticator } from 'aws-amplify-react-native'

const Tabs = createBottomTabNavigator({
  Schedule: {
    screen: Schedule
  },
  Profile: {
    screen: Profile,
  }
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: () => {
      const { routeName } = navigation.state
      if (routeName === 'Schedule') {
        return <Icon size={20} name='calendar' />
      }
      return <Icon size={20} name='user' />
    }
  })
})

const App = createAppContainer(Tabs)

export default withAuthenticator(App)