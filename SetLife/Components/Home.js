// Components/Home.js

import React from 'react'
import {Text, View, FlatList, TouchableOpacity} from "react-native";
import RowTask from './RowTask';
import { connect } from "react-redux";
import { stylesHome } from '../assets/style/stylesheet';
import RowNews from "./RowNews";

let limitOne = 1;

/**
 * Component for Home view.
 * @class Home
 * @extends {Component}
 */
class Home extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};
    }

    /**
     * Function to collect data from the Promise get by the Reducer.
     * @returns {Promise<void>}
     */
    async loadRss() {
        let dataNews = await this.props.rssReducer.rss.catch(() => false);
        this.setState({dataNews: dataNews});
    }

    /**
     * Show the list of News if there load.
     * @returns {View|null}
     */
    showNews() {
        if (limitOne === 1) {
            this.loadRss();
            limitOne++;
        }
        if (this.state.dataNews) {
           return(
               <View>
                   <FlatList
                        data={this.state.dataNews.items}
                        renderItem={({item}) => {
                            return(
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('NewsDetails', {newsDetails: item})}>
                                    <RowNews item={item} />
                                </TouchableOpacity>
                            )
                        }}
                        keyExtractor={(item, index)=> index.toString()}
                   />
               </View>
           )
        }
    }

    /**
     * Render the view of the Home component.
     * @returns {View}
     */
    render() {
        const date = new Date().toDateString();
        const taskExample = { name: "Meal", startHour: "07:45", type: "recurrent", recurrence: "day", endHour: "8:30" };
        const listDayTasks = [];
        let i = 0;
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
                <Text style={stylesHome.helloText}>Hello {this.props.loginReducer.username}</Text>
                <Text style={stylesHome.dateText}>{date}</Text>
                {
                    listDayTasks.length ?
                        <View style={stylesHome.dayProgramView}>
                            <Text style={stylesHome.dayProgramText}>Your day program</Text>
                            <FlatList
                                data={listDayTasks}
                                renderItem={({ item }) => {
                                    return(
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskForm', {taskId: item.id})}>
                                            <RowTask item={item} />
                                        </TouchableOpacity>
                                    )}
                                }
                                keyExtractor={(item, index)=> index.toString()}
                                />
                        </View>
                    :
                        <View style={stylesHome.dayOffContainer}>
                            <Text style={stylesHome.freeDayText}>You are free today :D</Text>
                            <Text style={stylesHome.freeDayLabel}>See you tomorrow !</Text>
                        </View>
                }
                <View style={stylesHome.newsView}>
                    <Text style={stylesHome.dayProgramText}>News</Text>
                    { this.showNews() }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        taskReducer: state.task,
        rssReducer: state.rss,
        loginReducer: state.login
    }
};


export default connect(mapStateToProps)(Home);