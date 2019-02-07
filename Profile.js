import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { Auth } from 'aws-amplify'

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
        <Text style={styles.username}>{this.state.username}</Text>
        <Text style={styles.email}>{this.state.email}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 20,
    backgroundColor: '#F5FCFF',
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
