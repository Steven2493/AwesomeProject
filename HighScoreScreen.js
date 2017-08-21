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
import axios from 'axios'
import styles from './Styles'

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
              <View style={styles.container}>
                {this.state.highscore.map(function(user,i) {
                  return (
                    <PlayerHighScore
                      key={i}
                      user={user}
                      id={i}
                    />
                  )
                }
              )
            }
          </View>
        </View>
    )
  }
}


// const styles = StyleSheet.create({
//   // highScoreText: {
//   //   color: 'white',
//   //   bottom:60,
//   //   fontSize:20,
//   //   fontFamily:'Pixeled'
//   // },
//   container:{
//     justifyContent: 'flex-start',
//   },
//   highScoreCotainer:{
//     flex:1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#182445',
//
//   }
// });
