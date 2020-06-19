// Components/RowNews.js

import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { stylesRowTask } from '../assets/style/stylesheet';

export default class RowNews extends React.Component {

    render() {
        //TODO get infos of news from props and display it.
        const news = this.props.item;
        const date = new Date(news.published);
        console.log(date);
        const day = date.toLocaleString('en-GB', { timeZone: 'UTC' }).substr(0, 10);
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