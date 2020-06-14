// Components/Calendar.js

import React from 'react'
import {Text, View} from "react-native";

class Calendar extends React.Component {
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
        return (
            <View>
                <Text>Calendar :></Text>
            </View>
        )
    }
}

export default Calendar;