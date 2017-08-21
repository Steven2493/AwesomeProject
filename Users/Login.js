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
  TouchableHighlight,
  } from 'react-native';

import styles from '../Style'
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

  // componentDidMount() {
  //   axios.post('http://localhost:8080/users')
  //   .then((response) => {
  //     console.log(response)
  //     // let login = response.data
  //     // this.setState({
  //     //   email: this.response.
  //     })
  //   })
  // }

  render() {
    return (
      <View style={styles.loginContainer}>

          <Text style={styles.loginTextInfo}>Email</Text>
          <TextInput
            style={styles.textInput}
            returnKeyLabel = {"email"}
            onChangeText={(text) => this.setState({email:text})}
          />

          <Text style={styles.loginTextInfo}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
          />

          <TouchableHighlight onPress={() => navigate('#')}>
            <Text style={{color:"white", textAlign:'center', fontFamily:"Pixeled"}}>Login</Text>
          </TouchableHighlight>

      </View>
    );
  }
}
