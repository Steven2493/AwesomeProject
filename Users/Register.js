import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  AppRegistry,
  View,
  Button,
  TouchableHighlight,
  AsyncStorage,
  } from 'react-native';

import axios from 'axios';
import styles from '../Style'

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userID: '',
    }
    this.register = this.register.bind(this);
  }

  pressMe(){
    this.props.press();
  }

  static navigationOptions = {
    title: 'Create a New Account'
  };

  register = () => {
    axios.post('http://localhost:8080/users', {register: {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password}
  })
  .then((response) => {
    let user = response.data.id
    this.setState({ userID: user });
    AsyncStorage.setItem('userId', JSON.stringify(user))
  })
  .catch(function (error) {
    console.log(error)
  })
};

  render() {

    return (
      <View style={styles.loginContainer}>
        <Text style={[styles.globalFont,{padding:10,textAlign:"center"}]}>REGISTER</Text>
        <Text style={[styles.globalFont,{padding:10}]}>Username</Text>
        <TextInput autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />

        <Text style={[styles.globalFont,{padding:10}]}>Email</Text>
        <TextInput autoCapitalize="none"
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />

        <Text style={[styles.globalFont,{padding:10}]}>Password</Text>
        <TextInput autoCapitalize="none"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <TouchableHighlight onPress={() => this.register() }>
          <Text style={[styles.globalFont,{textAlign:"center",color:"yellow"}]}>Create Account</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={ this.pressMe.bind(this) }>
          <Text style={[styles.globalFont,{textAlign:"center",color:"yellow"}]}>Already Have An Account?</Text>
        </TouchableHighlight>


      </View>
    );
  }
}
