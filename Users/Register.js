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

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
    }
  }

  pressMe(){
    this.props.press();
  }

  static navigationOptions = {
    title: 'Create a New Account'
  };

  render() {

    return (
      <View>
        <Text>Username</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({username:text})}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => this.setState({email:text})}
        />

        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={(text) => this.setState({password:text})}
        />

        <Button
          onPress={() => navigate('#')}
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

