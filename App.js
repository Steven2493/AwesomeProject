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

// import axios from 'react-native-axios';
import axios from 'axios';
import ControlScreen from './Users/UserControl.js';

import AwesomeProjectScreen from './Map.js';
import HighScoreScreen from './HighScoreScreen';

//user is hardcoded right here - once login/register works remove this line
AsyncStorage.setItem('userId', '3');
// AsyncStorage.removeItem('userId');


class HomeScreen extends Component {

  constructor(){
    super()
    this.state = {
      userid: "",
      username: "",
      highscorePoints: "",
      highscoreDate: "",
      recentGames: []
    }
    this.userPage = this.userPage.bind(this)
  }

  componentDidMount() {

    AsyncStorage.getItem("userId").then((value) => {
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
      });
    }).done();
  }

  userPage(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.homeContainer}>
        <View style={styles.userStats}>
          <Text style={styles.homeScreenText}> Hello, User!</Text>
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
    )
  }

  static navigationOptions = {
    title: 'Welcome User',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.homeContainer}>
       { this.state.userid === "" ? <ControlScreen /> : this.userPage() }
      </View>
    );
  }
}

  const MainScreenNavigator = TabNavigator({
    Home: { screen: HomeScreen },
    AwesomeProject: { screen: AwesomeProjectScreen},
  });

  const Navigator = StackNavigator({
    Home: { screen: MainScreenNavigator },
    Global: { screen: HighScoreScreen},
    AwesomeProject: { screen: AwesomeProjectScreen},
  });


// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Navigator);
