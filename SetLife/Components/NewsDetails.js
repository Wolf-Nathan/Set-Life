// Components/NewsDetails.js

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { stylesNewsDetails } from '../assets/style/stylesheet';

class NewsDetails extends React.Component {
  render() {
      return (
          <View style={stylesNewsDetails.container}>
              <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home')}>
                  <Text>Close</Text>
              </TouchableOpacity>
              <Text>{this.props.route.params.newsDetails}</Text>
          </View>
      )
  }
}

export default NewsDetails;
