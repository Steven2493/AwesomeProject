import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  AsyncStorage,
  AppRegistry,
  TouchableHighlight,
  } from 'react-native';

import styles from '../Style'

import axios from 'axios';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userID: '',
    }
    this.login = this.login.bind(this);
  }

  static navigationOptions = {
    title: 'Welcome Back',
  };

  login = () => {
    axios.post('https://phatpac.herokuapp.com/sessions', {login: {
      email: this.state.email,
      password: this.state.password}
    })
    .then((response) => {
      let user = response.data.id
      this.setState({ userID: user });mail.
      AsyncStorage.setItem('userId', JSON.stringify(user))
    })
    .catch(function (error) {
      console.log(error)
    })
  };

  render() {
    return (
      <View style={styles.loginContainer}>
          <Text style={[styles.globalFont,{padding:10}]}>Email</Text>
          <TextInput autoCapitalize="none"
            style={styles.textInput}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />
          <Text style={[styles.globalFont,{padding:10}]}>Password</Text>
          <TextInput autoCapitalize="none"
            style = {styles.textInput}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />

          <TouchableHighlight onPress={() => this.login() }>
            <Text style={[styles.globalFont,{textAlign:"center",color:"yellow"}]}>Login </Text>
          </TouchableHighlight>
      </View>
    );
  }
}
