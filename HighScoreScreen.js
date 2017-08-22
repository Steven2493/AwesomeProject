import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native'

import PlayerHighScore from './PlayerHighScore';
import axios from 'react-native-axios'
import styles from './Style'

export default class HighScore extends Component {

  constructor(){
    super()
    this.state = {
      highscore: []
    }
  }
  componentWillMount(){
    axios.get('http://localhost:3000/scores')
    .then((response) => {
      this.setState({highscore: response.data})
    })
  }
  render(){
    return (
      <View style={styles.highScoreCotainer}>
        <Text style={styles.highScoreText}>High Score</Text>
          <View style={styles.PlayersScoreContainer}>
            {this.state.highscore.map(function(user,i) {
              return (
                <PlayerHighScore
                  key={i}
                  user={user}
                  index={i}
                />
              )
            }
          )
        }
      </View>
      <Image source={require('./imgs/ghost.png')} style={{width:220, height:50}}/>
    </View>
    )
  }
}
