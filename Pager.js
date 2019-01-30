import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel'

import Talk from './Talk'
import Discussion from './Discussion'

const { width } = Dimensions.get('window')

export default class Pager extends Component {
  state = {
    index: 0,
    entries: [0, 1]
  }
  onSnapToItem = (index) => {
    this.setState({ index })
  }
  _renderItem = ({item, index}) => {
    if (index === 0) return <Talk {...this.props} />
    return (
        <Discussion {...this.props} />
    );
  }

  render () {
    const t1 = 'Talk Info'
    const t2 = 'Talk Discussion'
      return (
          <View style={{flex: 1}}>
            <Text style={styles.heading}>{this.state.index === Number(0) ? t1 : t2}</Text>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={width}
              itemWidth={width}
              onSnapToItem={this.onSnapToItem}
            />
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    padding: 25
  },
})