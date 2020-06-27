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
     * Generate the planning with the tasks saved
     */
    createPlanning() {
        let taskList = this.props.taskReducer.taskList;
        let sortedTasks = this.sortTasks(taskList);
        let agendaTab = this.determineAgenda(1);

        for(let i = 0; i < sortedTasks.length; i++) {
            let taskI = sortedTasks[i].task;
            let dateTask = this.changeDateFormat(taskI.date.substr(0,10));

            let quarterNb = this.calculateDurationQuarter(taskI.duration);

            let timeAttribute;
            let quarterStart;
            if(taskI.hourChoice === "fix"){
                timeAttribute = taskI.date.substr(11);
                timeAttribute = timeAttribute.substr(0,2);
                quarterStart = Number(taskI.date.substr(11))/15 ;
                quarterStart = quarterStart > 0 ? Math.trunc(quarterStart) + 1 : durationResult;
                
                for(let i = 0; i<quarterNb; i++){
                    agendaTab[dateTask][timeAttribute]["quarter"+(quarterStart%5)].push(taskId)
                }
            }else{
                let timeEndDay;
                timeAttribute,quarterStart,timeEndDay = this.initTaskVars(agendaTab,dateTask,taskI,timeAttribute,quarterStart,timeEndDay)

                while(agendaTab[dateTask][timeAttribute]["quarter"+quarterStart].length > 0){
                    quarterStart++;
                    if(quarterStart > 4){
                        quarterStart = quarterStart%5;

                        let newHour = Number(timeAttribute) +1;
                        if(newHour>timeEndDay){
                            let tomorrow = new Date (dateTask);
                            tomorrow.setDate(tomorrow.getDate()+1);
                            dateTask = this.changeDateFormat(tomorrow.toString())
                            
                            timeAttribute,quarterStart,timeEndDay = this.initTaskVars(agendaTab,dateTask,taskI,timeAttribute,quarterStart,timeEndDay)
                        }else {
                            timeAttribute = newHour.toString().padStart(2,'0');
                        }
                    }
                }

                for(let i = 0; i<quarterNb; i++){
                    agendaTab[dateTask][timeAttribute]["quarter"+(quarterStart%5)].push(taskId)
                }
            }

            agendaTab[dateTask][timeAttribute]["quarter"+quarterStart]
        }

        console.log(agendaTab);
        //console.log(this.props.settings);
    }

    initTaskVars(agendaTab, dateTask, taskI, timeAttribute, quarterStart, timeEndDay){
        if(agendaTab[dateTask].work === true && taskI.workTask ){
            timeAttribute = this.props.workMorningStart.substr(0,2);
            quarterStart = this.calculateDurationQuarter("00:"+this.props.workMorningStart.substr(0,3));
            timeEndDay = Number(this.props.workAfternoonEnd.substr(0,2));
        }else if(agendaTab[dateTask].work === true && !taskI.workTask ){
            timeAttribute = this.props.wakeupWeek.substr(0,2);
            quarterStart = this.calculateDurationQuarter("00:"+this.props.wakeupWeek.substr(0,3));
            timeEndDay = Number(this.props.bedtimeWeek.substr(0,2));
        }else {
            timeAttribute = this.props.wakeupWeekEnd.substr(0,2);
            quarterStart = this.calculateDurationQuarter("00:"+this.props.wakeupWeekEnd.substr(0,3));
            timeEndDay = Number(this.props.bedtimeWeekend.substr(0,2));
        }
        return timeAttribute,quarterStart,timeEndDay;
    }

    calculateDurationQuarter(duration){
        let durationHour = duration.substr(0, 2);
        let durationMinute = duration.substr(3);

        let durationResult = (Number(durationHour)*60 + Number(durationMinute))/15;
        durationResult = durationResult > 0 ? Math.trunc(durationResult) + 1 : durationResult;

        return durationResult;
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
                    score *= 0.5;
                    break;
                case 2:
                    score *= 0.75;
                    break;
                case 3:
                    score *= 1;
                    break;
                case 4:
                    score *= 1.5;
                    break;
                case 5:
                    score *= 2;
                    break;
                default:
                    console.log("unknown importance level");
            }

            scoringTab.push({
                task : task,
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

    determineAgenda(nbMonth){

        let now = new Date();
        let actualMonth = now.getMonth() +1;
        let actualDay = now.getDate();
        let actualYear = now.getFullYear();
        
        let tabAgenda = {};
        for (let month =actualMonth; month<actualMonth + nbMonth; month++){
            for(let day=1;day<= this.lastDayOfMonth(actualYear,month); day++){
                let dayDate = actualYear+"-"
                +month.toString().padStart(2,'0')+"-"
                +day.toString().padStart(2,'0');

                tabAgenda[dayDate] = this.constructDayObject(dayDate);
            }
            if(month == 12){
                actualYear ++;
            }
        }
        return tabAgenda;
    }

    constructDayObject(dateString){
        let startTime;
        let endTime;
        let durationDay;

        let work = false;
        let date = new Date(dateString);
        switch(date.getDay()){
            case 0 : 
                work = this.props.settings.workday.sunday;
                break;
            case 1 : 
                work = this.props.settings.workday.monday;
                break;
            case 2 : 
                work = this.props.settings.workday.tuesday;
                break;
            case 3 : 
                work = this.props.settings.workday.wednesday;
                break;
            case 4 : 
                work = this.props.settings.workday.thursday;
                break;
            case 5 : 
                work = this.props.settings.workday.friday;
                break;
            case 6 : 
                work = this.props.settings.workday.saturday;
                break;
            default :
                console.log("unknown day : " + date.getDay());
        }
        //console.log("day : " + date.getDay());

        //console.log("work : " + work);

        if (work === true){
            startTime = this.props.settings.wakeupWeek;
            endTime = this.props.settings.bedtimeWeek;
        }else {
            startTime = this.props.settings.wakeupWeekend;
            endTime = this.props.settings.bedtimeWeekend;
        }

        //console.log("starttime : " + Number(startTime.substr(0, 2)));
        //console.log("starttime : " + endTime);

        durationDay = Number(endTime.substr(0, 2)) - Number(startTime.substr(0, 2));
        let finalObject = {work : work};
        for(let i = Number(startTime.substr(0, 2)); i <= Number(endTime.substr(0, 2)); i++){
            finalObject[i.toString().padStart(2,'0')] = {
                quarter0 : [],
                quarter1 : [],
                quarter2 : [],
                quarter3 : [],
                quarter4 : [],
                full : false
            }
        }

        return finalObject;
    }

    changeDateFormat(dateString){
        let date = new Date(dateString);
        let dateFinal = date.getFullYear() +"-"+
            (date.getMonth() +1 ).toString().padStart(2,'0') +"-"+
            date.getDate().toString().padStart(2,'0');

        return dateFinal;
    }

    lastDayOfMonth(y,m){
        return new Date(y,m,0).getDate();
    }

    componentDidUpdate(){
        this.createPlanning();
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
                    showWeekNumbers={true}
                    onDayPress={(day) => {console.log('selected day :', day.dateString)}}
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
        taskReducer: state.task,
        settings: state.settings
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
