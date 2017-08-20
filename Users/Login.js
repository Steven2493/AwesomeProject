import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button,
  } from 'react-native';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Login below',
  };
  render() {
    return (
      <View>
        <Container>
          <Button
            label="Forgot Login/Pass"
            onPress={this.press.bind(this)} />
        </Container>

        <Container>
          <Label text="Email" />
          <TextInput
            style={styles.textInput}
          />
        </Container>

        <Container>
          <Label text="Password" />
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
          />
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 80,
    fontSize: 30,
    backgroundColor: '#FFF'
  }
});
