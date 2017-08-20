import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native'

export default class PlayerHighScore extends Component {

  render(){
    let {user} = this.props

      return <Text  style={styles.highScoreText}>{user.user}..........{user.score}</Text>
      }
  }

const styles = StyleSheet.create({
  highScoreText: {
    color: 'white',
    bottom:50,
    fontSize:20,
    textAlign: 'left',
  }
})
