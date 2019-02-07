import React from 'react'
import {
  Image,
  View,
  Text,
  StyleSheet
} from 'react-native'

import logo from './assets/logo.jpg'
import { colors } from './theme'

class BaseHeader extends React.Component {
  render() {
    console.log('props:', this.props)
    return (
      <View style={styles.container}>
        <Image
          source={logo}
          resizeMode='contain'
          style={styles.logo}
        />
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    left: 10,
    bottom: 5,
    width: 100,
    height: 30
  },
  title: {
    color: 'white',
    fontFamily: 'Lato-Regular',
    marginTop: 50,
    fontSize: 16
  },
  container: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    height: 80
  }
})

export default BaseHeader