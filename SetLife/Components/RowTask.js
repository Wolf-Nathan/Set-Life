import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

export default class rowTask extends Component {

    render() {
        //TODO get infos of task from props and display it.
        const task = this.props.item;

        return (
            <View style={styles.row}>
                <View style={styles.opt_btn}>
                    <TouchableWithoutFeedback>
                        <MaterialCommunityIcons name="dots-vertical" color={'#F2F2F2'} size={30} />
                    </TouchableWithoutFeedback>
                </View>  
                <Text style={styles.title}>{task.name}</Text>
                <Text style={styles.timeText}>{task.date}{task.startHour ? " " + task.startHour : ""} - 08h15</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: '#1B5044',
        borderRadius: 15,
        padding: 5,
        paddingLeft: 15,
        width: width-20,
        margin: 5,
        alignSelf: 'center'
        
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#F2F2F2'
    },
    timeText: {
        fontFamily: 'Montserrat',
        fontSize: 13,
        color: '#F2F2F2'
    },
    opt_btn: {
        zIndex: 1,
        padding: 5,
        margin: 5,
        position: 'absolute',
        right: -5,
        top: 3,
    }
});