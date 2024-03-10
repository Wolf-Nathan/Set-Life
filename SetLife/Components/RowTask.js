// Components/RowTask.js

import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { stylesRowTask } from '../assets/style/stylesheet';

/**
 * Component to show a Task.
 * @class RowTask
 * @extends {Component}
 */
export default class RowTask extends React.Component {

    /**
     * Get String version of task date.
     * @param task
     * @returns {string}
     */
    taskDateToString(task) {
        if (!task?.date) {
            return '';
        }

        let date = task.date;

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ];

        let day = days[date.getDay()];
        let month = months[date.getMonth()];

        return day + " " + date.getDate() + " " + month + " " + date.getFullYear();
    }

    /**
     * Render the View of RowTask component.
     * @returns {View}
     */
    render() {
        const task = this.props.item;
        let taskDate = this.taskDateToString(task);

        return (
            <View style={stylesRowTask.row}>
                <View style={stylesRowTask.opt_btn}>
                    <TouchableWithoutFeedback>
                        <MaterialCommunityIcons name="dots-vertical" color={'#F2F2F2'} size={30} />
                    </TouchableWithoutFeedback>
                </View>  
                <Text style={stylesRowTask.title}>{task.name}</Text>
                <Text style={stylesRowTask.timeText}>{taskDate}</Text>
            </View>
        )
    }
}