import React, {Component} from 'react'
import {Image, ScrollView, TouchableOpacity, StyleSheet, Text, View} from 'react-native'
import { createStackNavigator } from 'react-navigation'
import Pager from './Pager'
import { colors } from './theme'

import { API, graphqlOperation } from 'aws-amplify'
import { listTalks } from './graphql/queries'

const logo = require('./assets/logo.jpg')

class Schedule extends Component {
  static navigationOptions = props => ({
    headerLeft: <Image
        source={logo}
        resizeMode='contain'
        style={styles.logo}
      />
  })
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
                <View style={styles.speakerContainer}>
                 <Text style={styles.name}>{talk.name}</Text>
                 <Image
                   style={{ width: 50, height: 60, borderWidth: 2, borderColor: colors.primary, borderRadius: 3 }}
                   source={{ uri: "https://pbs.twimg.com/profile_images/981977686678622208/bKQTdDgx_400x400.jpg"}}
                   />
                </View>
                <Text style={styles.speakerName}>{talk.speakerName}</Text>
                <Text style={styles.speakerBio}>{talk.speakerBio}</Text>
                <View style={styles.timeContainer}>
                  <Text style={styles.timeHeading}>Time</Text>
                  <Text>{talk.time}</Text>
                </View>
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
}, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: colors.primary
    },
  }
})

export default ScheduleNav

const styles = StyleSheet.create({
  speakerContainer: {
    flexDirection: 'row'
  },
  logo: {
    marginLeft: 10,
    marginBottom: 4,
    width: 100,
    height: 35
  },
  container: {
  },
  talk: {
    backgroundColor: '#ededed',
    borderRadius: 15,
    margin: 15,
    paddingTop: 20,
    paddingBottom: 0,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1
  },
  timeContainer: {
    backgroundColor: "#ddd",
    padding: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  timeHeading: {
    fontWeight: "bold",
  },
  name: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  speakerName: {
    fontWeight: "bold",
    fontSize: 14,
    paddingHorizontal: 20
  },
  speakerBio: {
    paddingHorizontal: 20,
    marginBottom: 15,
    color: 'rgba(0, 0, 0, .6)'
  }
});
