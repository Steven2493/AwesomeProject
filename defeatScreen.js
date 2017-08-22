import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions,
  AsyncStorage,
  Image,
} from 'react-native'

import styles from './Style'

export default class Defeat extends Component {
  render(){
    return(
      <View style={styles.defeatContainer}>
        <Text style={styles.gameOver}>Game Over!</Text>
        <Image source={require('./imgs/defeat.gif')} style={{width:300, height:180,top:250}} />
        <View style={{flex: 1, flexDirection: 'row',alignItems:"center",top:50}}>
        <Image source={require('./imgs/insta.png')} style={{width:60, height:60}}/><Text style={styles.globalFont}>Pan</Text>
        <Image source={require('./imgs/snapchat.png')} style={{width:50, height:50}}/><Text style={styles.globalFont}>Pan</Text>
      </View>

      </View>
    )
  }
}
