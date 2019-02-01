import React, {Component} from 'react';
import {StyleSheet, Text, View } from 'react-native';

export default class Talk extends Component {
  static navigationOptions = (props) => ({
    title: props.navigation.state.params.name
  })
  render() {
    const { navigation: { state: { params }}} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.name}>{params.name}</Text>
        <Text style={styles.speakerName}>{params.speakerName}</Text>
        <Text style={styles.time}>{params.time}</Text>
        <Text style={styles.title}>Summary</Text>
        <Text>{params.summary}</Text>
        <Text style={styles.title}>Bio</Text>
        <Text>{params.speakerBio}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa'
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: '400'
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 15
  },
  speakerName: {
    marginBottom: 5,
    fontWeight: '500',
    fontSize: 16
  },
  time: {
    color: 'rgba(0, 0, 0, .5)'
  }
});

