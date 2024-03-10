// Components/CustomCalendar.js

import React from 'react'
import { Text, View, StyleSheet, FlatList } from "react-native";
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import Constants from 'expo-constants';
import RowTask from './RowTask';
import {connect} from "react-redux";
import { Switch } from 'react-native-paper';

/**
 * Component for Custom Calendar.
 * @class CustomCalendar
 * @extends {React.Component}
 */
class CustomCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agendaTab : {},
            markedDates : {},
            taskOfTheDay : []
        }
    }


    /**
     * Generate the planning with the tasks saved
     */
    createPlanning() {
        let taskList = this.props.taskReducer.taskList;
        let sortedTasks = this.sortTasks(taskList);
        this.state.agendaTab = this.determineAgenda(2);

        for(let i = 0; i < sortedTasks.length; i++) {
            let taskI = sortedTasks[i].task;
            //console.log(taskI.name);
            let dateTask = this.changeDateFormat(taskI.date.substr(0,10));
            this.state.agendaTab = this.assignTaskToAgenda(this.state.agendaTab,taskI,dateTask);
        }

        //console.log(this.state.agendaTab[Object.keys(this.state.agendaTab)[29]]);
        //console.log(this.props.settings);
    }

    /**
     * Assign a time in the agenda table
     * @param agendaTab
     * @param taskI
     * @param dateTask
     * @returns {*}
     */
    assignTaskToAgenda(agendaTab,taskI,dateTask){
        if(agendaTab[dateTask] === undefined){
            return agendaTab;
        }

        let quarterNb = this.calculateDurationQuarter(taskI.duration);

        let timeAttribute;
        let quarterStart;
        let timeEndDay;

        function changeHourAndDate(){
            let newHour = Number(timeAttribute) +1;
            if(newHour>timeEndDay){
                let tomorrow = new Date (dateTask);
                tomorrow.setDate(tomorrow.getDate()+1);
                dateTask = tomorrow.getFullYear()+"-"
                +tomorrow.getMonth()+"-"
                +tomorrow.getDate();
                
                let values = this.initTaskVars(agendaTab,dateTask,taskI,timeAttribute,quarterStart,timeEndDay);
                timeAttribute = values[0];
                quarterStart = values[1];
                timeEndDay = values[2];
            }else {
                timeAttribute = newHour.toString().padStart(2,'0');
            }
        }

        let values = this.initTaskVars(agendaTab,dateTask,taskI,timeAttribute,quarterStart,timeEndDay);
        timeAttribute = values[0];
        quarterStart = values[1];
        timeEndDay = values[2];

        if(taskI.hourChoice === "fix"){
            timeAttribute = taskI.startHour.substr(0,2);
            quarterStart = Number(taskI.date.substr(11))/15 ;
            quarterStart = quarterStart > 0 ? Math.trunc(quarterStart) + 1 : quarterStart;
            for(let i = quarterStart; i<quarterStart+quarterNb; i++){
                if(i%5 === 0 && i !== 0){
                    changeHourAndDate();
                }
                agendaTab[dateTask][timeAttribute]["quarter"+(i%5)].push(taskI);
            }
            agendaTab[dateTask].hasTask=true;
        }else{
            while(agendaTab[dateTask][timeAttribute]["quarter"+quarterStart].length > 0){
                quarterStart++;
                if(quarterStart > 4){
                    quarterStart = quarterStart%5;
                    changeHourAndDate(); 
                }
            }

            for(let i = 0; i<quarterNb; i++){
                if(i%5 === 0 && i !== 0){
                    changeHourAndDate();
                }
                agendaTab[dateTask][timeAttribute]["quarter"+(i%5)].push(taskI);
            }
            agendaTab[dateTask].hasTask=true;

        }

        if(taskI.type === "recurrent"){
            let date = new Date (dateTask);
            switch (taskI.recurrence) {
                case "hour":
                    changeHourAndDate();
                    break;
                case "day":
                    date.setDate(date.getDate()+1);
                    break;
                case "week":
                    date.setDate(date.getDate()+7);
                    break;
                case "month":
                    date.setMonth(date.getMonth()+1);
                    break;
                default: 
                    break;
            }


            dateTask = date.getFullYear()+"-"
                +(date.getMonth()+1).toString().padStart(2,'0')+"-"
                +date.getDate().toString().padStart(2,'0');

            return this.assignTaskToAgenda(agendaTab,taskI, dateTask);
        }

        return agendaTab;
    }

    /**
     * Init vars to determine when day start and end
     * @param agendaTab
     * @param dateTask
     * @param taskI
     * @param timeAttribute
     * @param quarterStart
     * @param timeEndDay
     * @returns {(string|number)[]}
     */
    initTaskVars(agendaTab, dateTask, taskI, timeAttribute, quarterStart, timeEndDay){

        if(agendaTab[dateTask].work === true && taskI.secondType === "work" ){
            timeAttribute = this.props.settings.workMorningStart.substr(0,2);
            quarterStart = this.calculateDurationQuarter("00:"+this.props.settings.workMorningStart.substr(3));
            timeEndDay = Number(this.props.settings.workAfternoonEnd.substr(0,2));
        }else if(agendaTab[dateTask].work === true && taskI.secondType !== "work" ){
            if(timeAttribute === this.props.settings.wakeupWeek.substr(0,2)){
                timeAttribute = this.props.settings.workAfternoonEnd.substr(0,2);
                quarterStart = this.calculateDurationQuarter("00:"+this.props.settings.workAfternoonEnd.substr(3));
                timeEndDay = Number(this.props.settings.bedtimeWeek.substr(0,2));
            }else{
                timeAttribute = this.props.settings.wakeupWeek.substr(0,2);
                quarterStart = this.calculateDurationQuarter("00:"+this.props.settings.wakeupWeek.substr(3));
                timeEndDay = Number(this.props.settings.workMorningStart.substr(0,2));
            }
        }else {
            timeAttribute = this.props.settings.wakeupWeekend.substr(0,2);
            quarterStart = this.calculateDurationQuarter("00:"+this.props.settings.wakeupWeekend.substr(3));
            timeEndDay = Number(this.props.settings.bedtimeWeekend.substr(0,2));
        }
        return [timeAttribute,quarterStart,timeEndDay];
    }


    /**
     * Calculate the duration of a task in quarter.
     * @param duration
     * @returns {number}
     */
    calculateDurationQuarter(duration){
        let durationHour = duration.substr(0, 2);
        let durationMinute = duration.substr(3);

        let durationResult = (Number(durationHour)*60 + Number(durationMinute))/15;
        durationResult = durationResult > 0 ? Math.trunc(durationResult) + 1 : durationResult;

        return durationResult;
    }


    /**
     * Sort the tasks with a score calculated depends on task information.
     * @param taskList
     * @returns {[]}
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
        //console.log(scoringTab)
        return scoringTab;
    }


    /**
     * Personalized compare method of tasks
     * @param a
     * @param b
     * @returns {number}
     */
    compareTaskScoring(a,b) {
        if(a.score > b.score){
            return +1;
        } else if (b.score > a.score){
            return -1;
        } else {
            let aDurationMin = a.task.duration.substr(3);
            let aDurationHour = parseInt(a.task.duration.substr(0,2))*60;
            let aDuration = parseInt(aDurationMin) + aDurationHour;

            let bDurationMin = b.task.duration.substr(3);
            let bDurationHour = parseInt(b.task.duration.substr(0,2))*60;
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

    /**
     * Generate an agenda table, which will be display in vue
     * @param nbMonth
     * @returns {{}}
     */
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

    /**
     * Generate an object to complete the agenda, it corresponds to a day with different hours
     * @param dateString
     * @returns {{hasTask: boolean, work: boolean}}
     */
    constructDayObject(dateString){
        let settings = this.props.settings;
        let workday = settings.workday;
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

        let startTime;
        let endTime;
        let durationDay;

        let date = new Date(dateString);

        // Boolean who get if current date is a work date or not.
        let work = settings.workday[days[date.getDay()]];

        if (work === true){
            startTime = this.props.settings.wakeupWeek?.getHours();
            endTime = this.props.settings.bedtimeWeek?.getHours();
        }else {
            startTime = this.props.settings.wakeupWeekend.getHours();
            endTime = this.props.settings.bedtimeWeekend.getHours();
        }

        durationDay = endTime - startTime;
        let finalObject = {work : work, hasTask : false};
        for(let i = startTime; i <= endTime; i++){
            finalObject[i.toString().padStart(2,'0')] = {
                quarter0 : [],
                quarter1 : [],
                quarter2 : [],
                quarter3 : [],
                quarter4 : []
            }
        }

        return finalObject;
    }

    /**
     * Change the format of a date "dd/MM/YYYY".
     * @param dateString
     * @returns {string}
     */
    changeDateFormat(dateString){
        let date = dateString.split("/");
        let dateFinal = date[2] +"-"+
        date[1] +"-"+
        date[0];

        return dateFinal;
    }

    /**
     * Get the last day of a month.
     * @param y
     * @param m
     * @returns {number}
     */
    lastDayOfMonth(y,m){
        return new Date(y,m,0).getDate();
    }

    /**
     * When component is mounted, init the agenda and table of scores.
     */
    componentDidMount(){
        this.createPlanning();
        this.createMarkedDateArray();

        let date = new Date();
        date = date.getFullYear()+"-"
        +(date.getMonth()+1).toString().padStart(2,'0')+"-"
        +date.getDate().toString().padStart(2,'0');
        this.getTaskOfTheDay()
    }

    /**
     * When component is updated (agenda), init the agenda and table of scores.
     * @param prevProps
     */
    componentDidUpdate(prevProps){
        if(prevProps.taskReducer.taskList !== this.props.taskReducer.taskList){
            this.createPlanning();
            this.createMarkedDateArray();
        }
    }

    /**
     * Create the array of all tasks to display on the calendar vue.
     */
    createMarkedDateArray(){
        for(let date in this.state.agendaTab){
            if(this.state.agendaTab[date].hasTask){
                this.state.markedDates[date] = {marked: true};
            }
        }
        this.setState({markedDates:this.state.markedDates})
    }

    /**
     * Get the current list of tasks of a day
     * @param day
     */
    getTaskOfTheDay(day){
        let tasks = [];
        for(let hour in this.state.agendaTab[day]){
            if(hour !== "work" && hour !== "hasTask"){
                for(let i = 0; i < 5; i++){
                    let quarter = this.state.agendaTab[day][hour]["quarter"+i];
                    for(let j = 0; j < quarter.length; j++){
                        if(!tasks.includes(quarter[j])){
                            tasks.push(quarter[j])
                        }
                    }
                }
            }
        }
        this.setState({taskOfTheDay:tasks}) ;    
    }

    /**
     * Render View of CustomCalendar component.
     * @returns {View}
     */
    render() {
        //console.log(date);

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
                    markedDates={this.state.markedDates}
                    markingType={'dot'}
                    showWeekNumbers={true}
                    onDayPress={(day) => {this.getTaskOfTheDay(day.dateString)}}
                />
                {
                    this.state.taskOfTheDay.length ?
                        <View>
                            <Text style={styles.dayProgramText}>Your day program</Text>
                            <FlatList
                                data={this.state.taskOfTheDay }
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
