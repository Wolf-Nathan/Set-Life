import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { Provider } from 'react-redux';
import Store from './Redux/Store/configureStore';
import Navigation from "./Navigation/Navigation";
import * as Font from 'expo-font';
import logoGreen from './assets/images/logo_green_500.png';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assetsLoaded: false
    }    
  }

  async componentDidMount() {
      await Font.loadAsync({
        Montserrat: require('./assets/fonts/Montserrat.ttf')
      });
      this.setState({ assetsLoaded: true });
  }

  render() {
    
    if (this.state.assetsLoaded) {
      return (
        <Provider store={Store}>
          <Navigation/>
        </Provider>
      );
    } else {
      return (
        <View style={styles.loadingContainer}>
          <Image source={logoGreen} style={styles.logo} />
          <ActivityIndicator size="large" color="#1B5044" />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200
  }
});
