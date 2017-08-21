import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  AsyncStorage,
  } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';

import styles from './Style'

import axios from 'react-native-axios';
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
      axios.get('http://localhost:3000/users/' + this.state.userid )
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
        <Text style={styles.globalFont}> Hello, {this.state.username}!</Text>
        <Text style={styles.globalFont}> personal best: {this.state.highscorePoints} points on {this.state.highscoreDate} </Text>
        <Text style={styles.globalFont}> Recent games: </Text>
        {this.state.recentGames.map((game, i) => {
          return <Text key={i} style={styles.globalFont} > - points: {game.score}, duration: {game.duration}, played on: {game.created_at} </Text>
        })}
        <Button
          onPress={() => navigate('Global')}
          title="Global High Scores" />
        <Button
          onPress={() => navigate('AwesomeProject')}
          title="New Game" />
      </View>
    )
  }

  static navigationOptions = {
    title: "Stats",
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.homeContainer} >
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
