// Components/Home.js

import React from 'react'
import { Text, View, FlatList } from "react-native";
import RowTask from './RowTask';
import { connect } from "react-redux";
import getRSS from "../RSS/getRSS";
import { stylesHome } from '../assets/style/stylesheet';

class Home extends React.Component {

    constructor (props) {
        super(props);
        let rss = getRSS();
        this.state = {
            rss : rss
        };
    }

    render() {
        const date = new Date().toDateString();
        const taskExample = { name: "Meal", startHour: "07:45", type: "recurrent", recurrence: "day", endHour: "8:30" };
        const listDayTasks = [taskExample, taskExample];
        var today = new Date();
        today = today.toLocaleString('en-GB', { timeZone: 'UTC' }).substr(0, 10);
        this.props.taskReducer.taskList.forEach(task => {
            if (task.date === today) {
                listDayTasks.push(task);
            }
        });
        taskExample.date = today;

        return (
            <View style={stylesHome.container}>
                <Text style={stylesHome.helloText}>Hello Gringo</Text>
                <Text style={stylesHome.dateText}>{date}</Text>
                {
                    listDayTasks.length ?
                        <View>
                            <Text style={stylesHome.dayProgramText}>Your day program</Text>
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
                        <View style={stylesHome.dayOffContainer}>
                            <Text style={stylesHome.freeDayText}>You are free today :D</Text>
                            <Text style={stylesHome.freeDayLabel}>See you tomorrow !</Text>
                        </View>
                }
                <View>
                    <Text style={stylesHome.dayProgramText}>News</Text>
                    <Text>{this.state.rss.title}</Text>
                    <Text>Fuck</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        taskReducer: state.task
    }
};


export default connect(mapStateToProps)(Home);