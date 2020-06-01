// Navigation/Navigation.js

import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from '../Components/Login';
import Home from '../Components/Home';

const HomeStackNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Se connecter',
    },
  },
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Accueil',
    },
  },
});


const styles = StyleSheet.create({

});

export default createAppContainer(HomeStackNavigator);
