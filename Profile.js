import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Auth } from 'aws-amplify'

import BaseHeader from './BaseHeader'

export default class Profile extends Component {
  
  state = {
    username: 'some username',
    email: 'some email'
  }
  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser()
    console.log('user:', user)
    const { signInUserSession: { idToken: { payload }}} = user
    this.setState({
      username: user.username,
      email: payload.email
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <BaseHeader />
        <View style={styles.profileContainer}>
          <Text style={styles.username}>{this.state.username}</Text>
          <Text style={styles.email}>{this.state.email}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    padding: 20
  },
  username: {
    fontSize: 26,
    marginBottom: 5,
    fontFamily: 'Lato-Regular'
  },
  email: {
    color: 'rgba(0, 0, 0, .45)',
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Lato-Regular'
  }
});
