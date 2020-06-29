// Components/NewsDetails.js

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { stylesNewsDetails } from '../assets/style/stylesheet';

/**
 * Component to show details of a news.
 * @class NewsDetails
 * @extends {Component}
 */
class NewsDetails extends React.Component {

    /**
     * Render the View of NewsDetails component.
     * @returns {View}
     */
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
