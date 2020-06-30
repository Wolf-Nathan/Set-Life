import React, { Component } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { Provider } from 'react-redux';
import Store from './Redux/Store/configureStore';
import Navigation from "./Navigation/Navigation";
import * as Font from 'expo-font';
import logoGreen from './assets/images/logo_green_500.png';

import {stylesApp} from './assets/style/stylesheet';

/**
 * @class App
 * @extends {React.Component}
 */
export default class App extends Component {
  /**
   * Constructor declaration of the component App.
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      assetsLoaded: false
    }    
  }

  /**
   * Import text fonts into the application.
   * @async
   */
  async componentDidMount() {
      await Font.loadAsync({
        Montserrat: require('./assets/fonts/Montserrat.ttf')
      });
      this.setState({ assetsLoaded: true });
  }

  /**
   * Return the navigation or view.
   * @returns {Provider|View}
   */
  render() {
    if (this.state.assetsLoaded) {
      return (
        <Provider store={Store}>
          <Navigation/>
        </Provider>
      );
    } else {
      return (
        <View style={stylesApp.loadingContainer}>
          <Image source={logoGreen} style={stylesApp.logo} />
          <ActivityIndicator size="large" color="#1B5044" />
        </View>
      )
    }
  }
}
