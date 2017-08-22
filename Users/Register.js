import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Container,
  TextInput,
  Label,
  Text,
  View,
  Button,
  } from 'react-native';
import axios from 'axios';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
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
    console.log(response)
  })
  .catch(function (error) {
    console.log(error)
  })
};

  render() {

    return (
      <View>
        <Text>Username</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />

        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />

        <Button
          onPress={() => this.register() }
          title="Create Account" />

        <Button
          onPress={ this.pressMe.bind(this) }
          title="already have an account?" />

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
