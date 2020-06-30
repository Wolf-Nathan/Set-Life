// Components/NewsDetails.js

import React from 'react';
import { Text, View, TouchableOpacity, Linking, Image, ScrollView } from 'react-native';
import { stylesNewsDetails } from '../assets/style/stylesheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

/**
 * Component to show details of a news.
 * @class NewsDetails
 * @extends {Component}
 */
class NewsDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgWidth: 0,
            imgHeight: 0,
        }
    }

    /**
     * Load the dimensions of the picture during the mounting of the component.
     */
    componentDidMount() {
        Image.getSize(this.props.route.params.newsDetails.enclosures[0].url, (width, height) => {
          this.setState({imgWidth: width, imgHeight: height});
        })
      }

    /**
     * Render the View of NewsDetails component.
     * @returns {View}
     */
    render() {
      let state = this.state;

      return (
        <View>
          <TouchableOpacity onPress={ () => this.props.navigation.navigate('Home')} style={stylesNewsDetails.goBack}>
            <MaterialCommunityIcons name="arrow-left-bold" color="#1B5044" size={50} />
          </TouchableOpacity>
          <ScrollView style={stylesNewsDetails.container}>
            <Text style={stylesNewsDetails.title}>{this.props.route.params.newsDetails.title}</Text>
            <Image
              style={stylesNewsDetails.picture, {width: state.imgWidth, height: state.imgHeight}}
              source={{uri: this.props.route.params.newsDetails.enclosures[0].url}}
            />
            <Text style={stylesNewsDetails.content}>{this.props.route.params.newsDetails.content}</Text>
            <Text style={stylesNewsDetails.date}>{this.props.route.params.newsDetails.published}</Text>
            <TouchableOpacity style={stylesNewsDetails.seeMore} onPress={ ()=> Linking.openURL(this.props.route.params.newsDetails.id) } >
              <Text style={stylesNewsDetails.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )
  }
}

export default NewsDetails;
