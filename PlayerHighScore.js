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
    let {user, id} = this.props
    return <Text style={{color:colorText[id % colorText.length], bottom:50, fontSize:20,}} >
      {user.user}..........{user.score}
    </Text>
      }
  }

let colorText = ["#18e5d6", "#ff6e1f", "#a5f658", "#9736ce", "#ff12ad"]
