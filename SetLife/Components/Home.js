// Components/Home.js

import React from 'react'
import {Text, View, StyleSheet, FlatList} from "react-native";
import Constants from 'expo-constants';
import RowTask from './RowTask';

class Home extends React.Component {
    render() {
        const date = new Date().toDateString();
        const listDayTasks = ["task1", "task2"];
        //TODO get from reducers day tasks.

        return (
            <View style={styles.container}>
                <Text style={styles.helloText}>Hello Gringo</Text>
                <Text style={styles.dateText}>{date}</Text>
                {
                    listDayTasks.length ?
                        <View>
                            <Text style={styles.dayProgramText}>Your day program</Text>
                            <FlatList
                                data={listDayTasks}
                                renderItem={({ item }) => {
                                    return(
                                        <RowTask item={item} />
                                    )}
                                }
                                keyExtractor={(item, index)=> index}
                                />
                        </View>
                    :
                        <View style={styles.dayOffContainer}>
                            <Text style={styles.freeDayText}>You are free today :D</Text>
                            <Text style={styles.freeDayLabel}>See you tomorrow !</Text>
                        </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    helloText: {
        fontFamily: 'Montserrat',
        color: '#344644',
        fontSize: 30,
        textAlign: 'center'
    },
    dateText: {
        fontFamily: 'Montserrat',
        color: '#77897F',
        fontSize: 24,
        textAlign: 'center'
    },
    dayProgramText: {
        fontFamily: 'Montserrat',
        color: '#77897F',
        fontSize: 22,
        marginLeft: 10
    },
    dayOffContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    freeDayText: {
        fontFamily: 'Montserrat',
        color: '#1B5044',
        fontSize: 26,
    },
    freeDayLabel: {
        fontFamily: 'Montserrat',
        color: '#344644',
        fontSize: 24,
    }
});

export default Home;