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

import axios from 'react-native-axios';


export default class LoginScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }

  static navigationOptions = {
    title: 'Welcome Back',
  };

  componentDidMount() {
    axios.post('http://localhost:8080/users')
    .then((response) => {
      console.log(response)
      // let login = response.data
      // this.setState({
      //   email: this.response.
    })
  }

  render() {
    return (
      <View>

          <Text>Email</Text>
          <TextInput
            style={styles.textInput}
            returnKeyLabel = {"email"}
            onChangeText={(text) => this.setState({email:text})}
          />

          <Text>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
          />

          <Button
            onPress={() => navigate('#')}
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
