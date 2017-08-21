import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  AsyncStorage,
  } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import axios from 'react-native-axios';
import AwesomeProjectScreen from './Map.js';

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
      <View>
        <Text> Hello, User!</Text>
        <Text> personal best: {this.state.highscorePoints} points on {this.state.highscoreDate} </Text>
        <Text> Recent games: </Text>
        {this.state.recentGames.map((game, i) => {
          return <Text key={i}> - points: {game.score}, duration: {game.duration}, played on: {game.created_at} </Text>
        })}
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

class GlobalScreen extends Component {
  static navigationOptions = {
    title: 'Global High Scores',
  };
  render() {
    return (
      <View>
        <Text>Global High Scores</Text>
      </View>
    );
  }
}

const MainScreenNavigator = TabNavigator({
  Home: { screen: HomeScreen },
  AwesomeProject: { screen: AwesomeProjectScreen}
});

const Navigator = StackNavigator({
  Home: { screen: MainScreenNavigator },
  Global: { screen: GlobalScreen},
  AwesomeProject: { screen: AwesomeProjectScreen}
});
// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Navigator);
