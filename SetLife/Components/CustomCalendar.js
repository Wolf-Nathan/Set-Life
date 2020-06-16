// Components/CustomCalendar.js

import React from 'react'
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import Constants from 'expo-constants';
import RowTask from './RowTask';
import {connect} from "react-redux";

class CustomCalendar extends React.Component {
    constructor(props) {
        super(props);
    }

    /*
     * Create the planning with the tasks saved
     */
    createPlanning() {
        let taskList = this.props.taskReducer.taskList;
        let sortedTasks = this.sortTasks(taskList);
    }

    /*
     * Sort the tasks with a score calculated depends on task informations
     */
    sortTasks(taskList) {
        let scoringTab = [];
        for(let task of taskList) {
            let score = 0;

            if(task.hourChoice === "fix"){
                score += 10;
            }else{
                score += 5;
            }

            if(task.type === "recurrent"){
                switch(task.recurrence){
                    case "hour" : 
                        score += 1;
                        break;
                    case "day" : 
                        score += 2;
                        break;
                    case "week" : 
                        score += 3;
                        break;
                    case "month" : 
                        score += 5;
                        break;
                    default : 
                        console.log("unknown recurrence type");
                }
            }else{
                score += 10;
            }

            switch (task.importance) {
                case 1:
                    score *= 0,5;
                    break;
                case 2:
                    score *= 0,75;
                    break;
                case 3:
                    score *= 1;
                    break;
                case 4:
                    score *= 1,5;
                    break;
                case 5:
                    score *= 2;
                    break;
                default:
                    console.log("unknown importance level");
            }

            scoringTab.push({
                taskName : task.name,
                score : score,
                dates: []
            });
        }
        scoringTab.sort(this.compareTaskScoring);
        scoringTab.reverse();
        console.log(scoringTab)
        return scoringTab;
    }

    /*
     * Personalized compare method of tasks
     */
    compareTaskScoring(a,b) {
        if(a.score > b.score){
            return +1;
        } else if (b.score > a.score){
            return -1;
        } else {
            let aDurationMin = a.duration.substr(3);
            let aDurationHour = parseInt(a.duration.substr(0,2))*60;
            let aDuration = parseInt(aDurationMin) + aDurationHour;

            let bDurationMin = b.duration.substr(3);
            let bDurationHour = parseInt(b.duration.substr(0,2))*60;
            let bDuration = parseInt(bDurationMin) + bDurationHour;

            if(aDuration > bDuration){
                return +1;
            } else if (bDuration > aDuration){
                return -1;
            }else{
                return 0;
            }
        }
    }

    /*componentDidMount(){
        this.createPlanning();
    }*/

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

        // Set language calendar
        LocaleConfig.locales['fr'] = {
            monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
            monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
            dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
            dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.'],
            today: 'Aujourd\'hui'
        };
        LocaleConfig.defaultLocale = 'fr';

        // Mark multiple dates
        // Exemple: vacantion, workout
        const vacation = {key:'vacation', color: 'red', selectedDotColor: 'yellow'};
        const workout = {key:'workout', color: 'blue', selectedDotColor: 'yellow'};

        return (
            <View style={styles.container}>
                <Calendar 
                    style={styles.calendar} 
                    markedDates={{
                        '2020-06-11': {startingDay: true, color: 'red', endingDay: true},

                        '2020-06-16': {startingDay: true, color: 'green', textColor: 'white'},
                        '2020-06-17': {color: 'green', textColor: 'white', marked: true, dotColor: 'yellow'},
                        '2020-06-18': {selected: true, endingDay: true, color: 'green', textColor: 'white'},

                        '2020-06-25': {startingDay: true, color: 'red', endingDay: true}
                    }}
                    markingType={'period'}
                />
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

const mapStateToProps = state => {
    return {
        taskReducer: state.task
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    calendar: {
        marginBottom: 20,
        paddingVertical: 15,
        backgroundColor: '#F2F2F2',
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

export default connect(mapStateToProps)(CustomCalendar);