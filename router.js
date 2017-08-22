import { StackNavigator, TabNavigator } from "react-navigation";

import UserControlScreen from "./Users/UserControl.js";
import UserIndexScreen from "./UserIndex.js";
import HighScoreScreen from "./HighScoreScreen.js";
import AwesomeProjectScreen from "./Map.js";


export const SignedOut = StackNavigator({
  SignUp: {
    screen: UserControlScreen
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
    tabBarLabel: "Game"
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
        screen: UserControlScreen
      },
      Global: {
        screen: HighScoreScreen
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
