import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ListView,
  Button,
  AsyncStorage,
  TouchableHighlight,
  } from 'react-native';

import { StackNavigator, TabNavigator } from 'react-navigation';
import styles from './Style'
import axios from 'react-native-axios';

AsyncStorage.setItem('userId', "16")

const TIME = new Date ()
const START_TIME = (TIME.getHours() + ":" + TIME.getMinutes() + ":" + TIME.getSeconds())


export default class UserIndexScreen extends Component {

  constructor(){
    super()
    this.state = {
      userid: "",
      username: "",
      highscorePoints: "",
      highscoreDate: "",
      recentGames: [],
      gameID: ''
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userId').then((value) => {
      this.setState({userid: value});
      axios.get('https://phatpac.herokuapp.com/users/' + this.state.userid )
        .then((response) => {
        let games = response.data.map((game) => {
          return game
        })
        this.setState({
          highscorePoints: response.data[0].highscore_score,
          highscoreDate: response.data[0].highscore_date,
          username: response.data[0].username,
          recentGames: games
        })
      })
      .catch((errors) => {
        console.log(errors)
      });
    }).done();
  }

  createGame = () => {
    axios.post('http://localhost:8080/games', {game: {
      user: parseInt(this.state.userid),
      score: 0,
      start_time: START_TIME,
      end_time: START_TIME}
    })
    .then((response) => {
      console.log(response)
      let game = response.data.id
      this.setState({ gameID: game})
      AsyncStorage.setItem('gameId', JSON.stringify(game))
    })
    .catch(function (error) {
      console.log(error)
    })
  };

  static navigationOptions = {
    title: "Stats",
  };

  render() {
    const { navigate } = this.props.navigation;
    return (

      <View style={styles.homeContainer}>
        <View style={styles.userStats}>
          <Text style={styles.globalFont}> Hello, {this.state.username}!</Text>
          <Text style={styles.homeScreenText}> Personal Best:{"\n"} {this.state.highscorePoints} Points On {this.state.highscoreDate} </Text>
          <Text style={styles.homeScreenText}> Recent Game: </Text>
            {this.state.recentGames.map((game, i) => {
              return <Text key={i} style={styles.homeScreenText}>     Points: {game.score}{"\n"}     Duration: {game.duration}{"\n"}     Played On: {game.created_at}</Text>
            })}
        </View>
        <View>
          <TouchableHighlight onPress={() => this.createGame()}>
            <Text style={[styles.homeScreenText, styles.textYellow]}>Global High Score</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.createGame() }>
            <Text style={[styles.homeScreenText, styles.textYellow]}>New Game</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
