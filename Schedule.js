import React, {Component} from 'react'
import {ScrollView, TouchableOpacity, StyleSheet, Text, View} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Pager from './Pager'

import { API, graphqlOperation } from 'aws-amplify'
import { listTalks } from './graphql/queries'

class Schedule extends Component {
  static navigationOptions = {
    title: "RNA Schedule",
  }
  state = {
    talks: []
  }
  async componentDidMount() {
    try {
      const talkData = await API.graphql(graphqlOperation(listTalks))
      this.setState({ talks: talkData.data.listTalks.items })
    } catch (err) {
      console.log('err: ', err)
    }
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        {
          this.state.talks.map((talk, i) => (
            <TouchableOpacity
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
            </TouchableOpacity>
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
