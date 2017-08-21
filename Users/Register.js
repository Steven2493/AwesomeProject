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
  static navigationOptions = {
    title: 'Create a New Account'
  };
  render() {
    return (
      <View>
        <Text>Username</Text>
        <TextInput
          style={styles.textInput}
        />

        <Text>Email</Text>
        <TextInput
          style={styles.textInput}
        />

        <Text>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
        />

        <Button
          onPress={() => navigate('#')}
          title="Create Account" />
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
