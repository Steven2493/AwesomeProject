import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  AsyncStorage,
  } from 'react-native';
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
    axios.post('http://localhost:8080/sessions', {login: {
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
      <View>

          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
          />

          <Text>Password</Text>
          <TextInput
            style = {styles.textInput}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
          />

          <Button
            onPress={() => this.login() }
            title="Login" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    fontSize: 15,
    backgroundColor: '#FFF',
  },
});
