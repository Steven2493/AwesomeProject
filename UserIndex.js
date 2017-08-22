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

export default class UserIndexScreen extends Component {

  constructor(){
    super()
    this.state = {
      userid: "",
      username: "",
      highscorePoints: "",
      highscoreDate: "",
      recentGames: []
    }
  }

  componentDidMount() {

    AsyncStorage.getItem("userId").then((value) => {
      console.log(value)
      this.setState({userid: value});
      axios.get('https://phatpac.herokuapp.com/users/' + this.state.userid )
        .then((response) => {
        console.log(response)
        console.log(this.state.userid)
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
          <TouchableHighlight onPress={() => navigate('Global')}>
            <Text style={[styles.homeScreenText, styles.textYellow]}>Global High Score</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => navigate('AwesomeProject')}>
            <Text style={[styles.homeScreenText, styles.textYellow]}>New Game</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
