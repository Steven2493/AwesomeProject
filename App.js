import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  AsyncStorage,
  } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
//
// import axios from 'react-native-axios';

import styles from './Style'
import LoginScreen from './Users/Login.js';
import RegisterScreen from './Users/Register.js';


import axios from 'axios';


import AwesomeProjectScreen from './Map.js';
import HighScoreScreen from './HighScoreScreen';

AsyncStorage.setItem('userId', '3');

class HomeScreen extends Component {

  constructor(){
    super()
    this.state = {
      userid: "",
      highscorePoints: "",
      highscoreDate: "",
      recentGames: []
    }
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
          recentGames: games
        })
      });
    }).done();

  }

  static navigationOptions = {
    title: 'Welcome User',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.homeContainer}>
        <Text style={styles.globalFont}> Hello, User!</Text>
        <Text style={styles.globalFont}> personal best: {this.state.highscorePoints} points on {this.state.highscoreDate} </Text>
        <Text style={styles.globalFont}> Recent games: </Text>
        {this.state.recentGames.map((game, i) => {
          return <Text key={i} style={styles.globalFont} > - points: {game.score}, duration: {game.duration}, played on: {game.created_at} </Text>
        })}
        <Button
          onPress={() => navigate('Login')}
          title="Login" />
        <Button
          onPress={() => navigate('Register')}
          title="Register" />
        <Button
          onPress={() => navigate('Global')}
          title="Global High Scores" />
        <Button
          onPress={() => navigate('AwesomeProject')}
          title="New Game" />
      </View>
    );
  }
}

const MainScreenNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  AwesomeProject: { screen: AwesomeProjectScreen},
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
});

const Navigator = StackNavigator({
  Home: { screen: MainScreenNavigator },

  Global: { screen: HighScoreScreen},
  AwesomeProject: { screen: AwesomeProjectScreen}

});
// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Navigator);
