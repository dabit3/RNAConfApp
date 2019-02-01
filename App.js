import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
