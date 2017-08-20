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

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Welcome Back',
  };
  render() {
    return (
      <View>

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
            title="Login" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 80,
    fontSize: 30,
    backgroundColor: '#FFF',
  },
});
