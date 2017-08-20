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

class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Login below',
  };
  render() {
    return (
      <View>
        <View>
          <Label text="Email" />
          <TextInput
            style={styles.textInput}
          />
        </View>

        <View>
          <Label text="Password" />
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
          />
        </View>
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
