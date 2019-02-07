import React, {Component} from 'react';
import {ScrollView, TextInput, StyleSheet, Text, View , Dimensions} from 'react-native';
import { API, graphqlOperation } from 'aws-amplify'

import { listDiscussions } from './graphql/queries'
import { onCreateDiscussion as OnCreateDiscussion } from './graphql/subscriptions'
import { createDiscussion } from './graphql/mutations'

const { width } = Dimensions.get('window')

export default class Discussion extends Component {
  static navigationOptions = () => ({
    title: "Discussion"
  })
  state = { comments: [], message: '' }
  async componentDidMount() {
    const { navigation: { state: { params }}} = this.props
    try {
      const discussionData = await API.graphql(
        graphqlOperation(listDiscussions, {
        talkId: params.id
     }))
      const { data: { listDiscussions: { items }}} = discussionData
      this.setState({ comments: items })
    } catch (err) {
      console.log('error fetching talks: ', err)
    }

    const subscription = API.graphql(
      graphqlOperation(OnCreateDiscussion, { talkId: params.id })
    )
    .subscribe({
      next: data => {
        const { value: { data: { onCreateDiscussion }}} = data
        let isDuplicate = false
        this.state.comments.forEach(c => {
          if (c.message === onCreateDiscussion.message) isDuplicate = true
        })
        if (isDuplicate) return
        const comments = [
          ...this.state.comments,
          onCreateDiscussion
        ]
        this.setState({ comments })
      }
    })
  }
  createMessage = async () => {
    const { navigation: { state: { params }}} = this.props
    const { message } = this.state
    const comments = [...this.state.comments, { message }]
    this.setState({ comments, message: '' })
    try {
      await API.graphql(graphqlOperation(createDiscussion, {
        input: {
          talkId: params.id,
          message
        }
      }))
    } catch (err) {
      console.log('error: ', err)
    }
  }
  onChangeText = message => {
    this.setState({ message })
  }
  render() {
    const { navigation: { state: { params }}} = this.props
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {
            this.state.comments.map((c, i) => (
              <View key={i} style={styles.comment}>
                <Text>{c.message}</Text>
              </View>
            ))
          }
        </ScrollView>
        <TextInput
          value={this.state.message}
          onChangeText={this.onChangeText}
          style={styles.input}
          onSubmitEditing={this.createMessage}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width,
    backgroundColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    left: 0,
    fontSize: 18,
    paddingHorizontal: 8
  },
  scrollView: {
    padding: 20
  },
  container: {
    flex: 1,
    paddingBottom: 50,
    backgroundColor: '#ededed'
  },
  title: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: '400',
  },
  speakerName: {
    marginBottom: 5
  },
  time: {
    color: 'rgba(0, 0, 0, .5)'
  },
  comment: {
    padding: 20,
    marginBottom: 5,
    borderRadius: 25,
    backgroundColor: "white"
  }
});

