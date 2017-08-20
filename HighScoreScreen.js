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
      <Image  source={require('./imgs/pan.jpeg')} style={styles.container}>
          <View style={[styles.highScoreDiv, styles.floatContainer]}>
            <Text style={[styles.highScoreText, styles.highScoreHeader]}>High Score</Text>
              {this.state.highscore.map(function(user,i) {
                return <PlayerHighScore key={i} user={user} />
              }
            )
          }
        </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  highScoreHeader:{
    bottom:150,
  },
  highScoreText: {
    color: 'white',
    bottom:50,
    fontSize:20,
  },
  container:{
    backgroundColor: 'rgba(0,0,0,0.7)',
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highScoreDiv:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
      height: 400,
      width: 400,
  }
});
