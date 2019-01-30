import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { withAuthenticator } from 'aws-amplify-react-native'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation'

import Schedule from './Schedule'
import Profile from './Profile'

const Tabs = createBottomTabNavigator({
  Schedule: {
    screen: Schedule
  },
  Profile: {
    screen: Profile
  }
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
