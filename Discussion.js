import React, {Component} from 'react';
import {StyleSheet, Text, View } from 'react-native';

import { API, graphqlOperation } from 'aws-amplify'
import { listDiscussions } from './graphql/queries'
import { onCreateDiscussion } from './graphql/subscriptions'

export default class Discussion extends Component {
  static navigationOptions = (props) => ({
    title: "Discussion"
  })
  state = { comments: [], message: '' }
  onChangeText = message => {
    this.setState({ message })
  }
  async componentDidMount() {
    const { navigation: { state: { params }}} = this.props
    try {
      const discussionData = await API.graphql(graphqlOperation(listDiscussions, {
        talkId: params.id
      }))
      const { data: { listDiscussions: { items }}} = discussionData
      this.setState({ comments: items })
    } catch (err) {
      console.log('error fetching talks: ', err)
    }

    const subscription = API.graphql(
      graphqlOperation(onCreateDiscussion, { talkId: params.id })
    )
    .subscribe({
      next: data => {
        const { value: { data: { onCreateDiscussion }}} = data
        const comments = [
          ...this.state.comments,
          onCreateDiscussion
        ]
        this.setState({ comments })
      }
    })
  }
  render() {
    const { navigation: { state: { params }}} = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Commments</Text>
        {
          this.state.comments.map((c, i) => (
            <View key={i}>
              <Text>{c.message}</Text>
            </View>
          ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
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
    marginBottom: 5
  },
  time: {
    color: 'rgba(0, 0, 0, .5)'
  }
});

