// Navigation/Navigation.js

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Opening from '../Components/Opening';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Home from '../Components/Home';

const HomeStackNavigator = createStackNavigator({
  Opening: {
    screen: Opening,
    navigationOptions: {
      title: 'Opening',
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerShown: false,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Register',
      headerShown: false,
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Home',
      headerShown: false,
    },
  },
});

export default createAppContainer(HomeStackNavigator);
