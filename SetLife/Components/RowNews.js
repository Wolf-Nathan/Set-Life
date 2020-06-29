// Components/RowNews.js

import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { stylesRowTask } from '../assets/style/stylesheet';

/**
 * Component to show News.
 * @class RowNews
 * @extends {Component}
 */
export default class RowNews extends React.Component {

    /**
     * Render the View of RowNews component.
     * @returns {View}
     */
    render() {
        const news = this.props.item;
        // Get date of news.
        const date = new Date(news.published);
        // Collect day in app format.
        const day = date.toLocaleString('en-GB', { timeZone: 'UTC' }).substr(0, 10);
        // Collect hour in app format.
        const hour = date.toLocaleString('en-GB', { timeZone: 'UTC' }).substr(11, 6);

        return (
            <View style={stylesRowTask.row}>
                <View style={stylesRowTask.opt_btn}>
                    <TouchableWithoutFeedback>
                        <MaterialCommunityIcons name="dots-vertical" color={'#F2F2F2'} size={30} />
                    </TouchableWithoutFeedback>
                </View>
                <Text style={stylesRowTask.title}>{ news.title }</Text>
                <Text style={stylesRowTask.timeText}>{ day } { hour }</Text>
            </View>
        )
    }
}