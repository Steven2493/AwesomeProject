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

const onRegister = () => AsyncStorage.setItem(USER_KEY, "true")

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
    axios.post('https://phatpac.herokuapp.com/users', {user: {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password}
  })
  .then((response) => {
    let user = response.data.id
    this.setState({ userID: user });
    AsyncStorage.setItem('userId', JSON.stringify(user))
    navigate("SignedIn")
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
          value={this.state.password} />

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
