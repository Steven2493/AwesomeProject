import { StackNavigator, TabNavigator } from "react-navigation";

import UserControlScreen from "./Users/UserControl.js";
import LoginScreen from "./Users/Login.js";
import RegisterScreen from "./Users/Register.js";

import UserIndexScreen from "./UserIndex.js";
import HighScoreScreen from "./HighScoreScreen.js";
import AwesomeProjectScreen from "./Map.js";


export const SignedOut = StackNavigator({
  SignUp: {
    screen: RegisterScreen,
    navigationOptions: {
      tabBarLabel: "Sign Up"
    }
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      tabBarLabel: "Welcome Back!"
    }
  }
});

export const SignedIn = TabNavigator({
  Home: {
    screen: UserIndexScreen,
    navigationOptions: {
    tabBarLabel: "Home"
    }
  },
  AwesomeProject: {
    screen: AwesomeProjectScreen,
    navigationOptions: {
    tabBarLabel: "Game",
    drawerLockMode: 'locked-closed'
    }
  }
});

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      },
      Global: {
        screen: HighScoreScreen
      }
    },
    {
      headerMode: "none",
      mode: "modal",
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
