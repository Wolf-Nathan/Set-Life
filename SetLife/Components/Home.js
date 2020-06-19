// Components/Home.js

import React from 'react'
import { Text, View, FlatList } from "react-native";
import RowTask from './RowTask';
import { connect } from "react-redux";
import { stylesHome } from '../assets/style/stylesheet';
import RowNews from "./RowNews";

let limitOne = 1;

class Home extends React.Component {

    constructor (props) {
        super(props);
        this.state = {};
    }

    /*
     * Function to collect data from the Promise get by the Reducer.
     */
    async loadRss() {
        let dataNews = await this.props.rssReducer.rss.catch(() => false);
        console.log(dataNews);
        this.setState({dataNews: dataNews});
    }

    /*
     * Show the list of News if theyre load.
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
                                <RowNews item={item} />
                            )
                        }}
                        keyExtractor={(item, index)=> index}
                   />
               </View>
           )
        }
    }

    render() {
        const date = new Date().toDateString();
        const taskExample = { name: "Meal", startHour: "07:45", type: "recurrent", recurrence: "day", endHour: "8:30" };
        const listDayTasks = [taskExample, taskExample];
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
                    { this.showNews() }
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        taskReducer: state.task,
        rssReducer: state.rss
    }
};


export default connect(mapStateToProps)(Home);