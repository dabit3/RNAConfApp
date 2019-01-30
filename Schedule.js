import React, {Component} from 'react'
import {ScrollView, TouchableHighlight, StyleSheet, Text, View} from 'react-native'

import { createStackNavigator } from 'react-navigation'
import { API, graphqlOperation } from 'aws-amplify'
import { listTalks } from './graphql/queries'

import Pager from './Pager'

class Schedule extends Component {
  static navigationOptions = {
    title: "RNA Schedule"
  }
  state = {
    talks: []
    // talks: [{
    //   name: "Our Holistic View of React Native Performance",
    //   speakerName: "Valentin Shergin",
    //   time: "9:30am - 10:30am",
    //   summary: "Our team envisions react Native applications to be very cool.",
    //   speakerBio: "Valentin has been passionate about developing sophisticated user interfaces for his entire life. Now he is working on making React Native more reliable, faster & more responsive than it was even considered possible."
    // }]
  }
  async componentDidMount() {
    try {
      const talkData = await API.graphql(graphqlOperation(listTalks))
      this.setState({ talks: talkData.data.listTalks.items })
      console.log('talkData:', talkData)
    } catch (err) {
      console.log('err: ', err)
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.talks.map((talk, i) => (
            <TouchableHighlight
              key={i} 
              onPress={
                () => this.props.navigation.push('Talk', talk)
              }
            >
              <View style={styles.talk}>
                <Text style={styles.name}>{talk.name}</Text>
                <Text style={styles.speakerName}>{talk.speakerName}</Text>
                <Text>{talk.time}</Text>
              </View>
            </TouchableHighlight>
          ))
        }
      </ScrollView>
    );
  }
}

const ScheduleNav = createStackNavigator({
  Schedule: { screen: Schedule },
  Talk: { screen: Pager }
})

export default ScheduleNav

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  talk: {
    padding: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 10
  },
  speakerName: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 10,
  }
});
