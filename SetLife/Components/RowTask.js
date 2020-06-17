// Components/RowTask.js

import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { stylesRowTask } from '../assets/style/stylesheet';

export default class RowTask extends React.Component {

    render() {
        //TODO get infos of task from props and display it.
        const task = this.props.item;

        return (
            <View style={stylesRowTask.row}>
                <View style={stylesRowTask.opt_btn}>
                    <TouchableWithoutFeedback>
                        <MaterialCommunityIcons name="dots-vertical" color={'#F2F2F2'} size={30} />
                    </TouchableWithoutFeedback>
                </View>  
                <Text style={stylesRowTask.title}>{task.name}</Text>
                <Text style={stylesRowTask.timeText}>{task.date}{task.startHour ? " " + task.startHour : ""}{task.endHour ? " - " + task.endHour : ""}</Text>
            </View>
        )
    }
}