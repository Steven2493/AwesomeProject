import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import LoginScreen from './Users/Login.js';
import RegisterScreen from './Users/Register.js';
import AwesomeProjectScreen from './Map.js';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome User',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Text>Hello, User!</Text>
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
  AwesomeProject: { screen: AwesomeProjectScreen},
  Login: { screen: LoginScreen },
});
// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Navigator);
