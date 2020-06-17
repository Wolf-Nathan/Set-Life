// Components/TaskForm.js

import React from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Dimensions} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';

import { stylesTaskForm } from '../assets/style/stylesheet';

/*
 * Component for Task Form.
 */
class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        const taskId = this.props.route.params ? this.props.route.params.taskId : null;
        let now = new Date();
        let nowDate = now.getDate().toString().padStart(2,'0') +"/"+
            (now.getMonth() +1 ).toString().padStart(2,'0') +"/"+
            now.getFullYear();
        let nowHours = now.getHours().toString().padStart(2,'0') + ":" + now.getMinutes().toString().padStart(2,'0');
        let dateDefault = nowDate + ":" + nowHours;
        if(taskId) {
            let task = this.getTask(taskId);
            if (task) {
                this.state = {
                    taskId: taskId,
                    taskName: task.name,
                    date: task.hourChoice === "fix" ? task.date + " " + task.startHour : task.date,
                    typeChoice: task.type,
                    recurrenceChoice: task.type === "recurrent" ? task.recurrence : null,
                    hourChoice: task.hourChoice,
                    importance: task.importance,
                    duration: task.duration
                };
            }
            else {
                this.state = {
                    typeChoice: "date",
                    date: dateDefault,
                    hourChoice: "free",
                    importance: 3,
                    duration: "01:00"
                }
            }
        }
        else {
            this.state = {
                typeChoice: "date",
                date: dateDefault,
                hourChoice: "free",
                importance: 3,
                duration: "01:00"
            }
        }
    }

    /*
     * Function to make form at default value.
     */
    cleanForm(){
        this.setState({
            taskName: "",
            date: "",
            typeChoice: "date",
            recurrenceChoice: "",
            hourChoice: "free",
            importance: 3,
            duration: "01:00"
        })
    }

    /*
     * Delete the task from the application data.
     */
    deleteTask() {
        let action = {type: "DELETE_TASK", value: this.getTask(this.state.taskId)};
        this.props.dispatch(action);
        this.props.navigation.navigate("Tasks");
    }

    /*
     * Change taskName in the state.
     * @String text
     */
    onChangeTaskName(text) {
        this.setState({taskName: text});
    }

    /*
     * Change hourChoice in the state.
     * @String text
     */
    hourChoice(text){
        this.setState({hourChoice: text});
    }

    /*
     * Change typeChoice in the state.
     * @String text
     */
    typeChoice(text) {
        this.setState({typeChoice: text});
    }

    /*
     * Change recurrenceChoice in the state.
     * @String text
     */
    recurrenceChoice(text) {
        this.setState({recurrenceChoice: text});
    }

    /*
     * Change importance in the state.
     * @integer importance
     */
    importanceChoice(importance) {
        this.setState({importance: importance});
    }

    /*
     * Return DatePicker view in function of the hourChoice.
     */
    dateInput() {
        if (this.state.hourChoice === "fix") {
            return (
                <DatePicker
                    style={stylesTaskForm.input}
                    date={this.state.date}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    mode="datetime"
                    format={"DD/MM/YYYY H:mm"}
                    customStyles={{
                        dateIcon: {
                            display: 'none'
                        },
                        dateInput: {
                            borderWidth: 0
                        },
                        dateText: {
                            fontSize: 19,
                        }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}} />
            )
        }
        else {
            return (
                <DatePicker
                    style={stylesTaskForm.input}
                    date={this.state.date}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    mode="date"
                    format={"DD/MM/YYYY"}
                    customStyles={{
                        dateIcon: {
                            display: 'none'
                        },
                        dateInput: {
                            borderWidth: 0
                        },
                        dateText: {
                            fontSize: 19,
                        }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}} />
            )
        }
    }

    /*
     * Return choice of recurrence View if type selected is recurrent.
     */
    recurrence() {
        if (this.state.typeChoice === "recurrent") {
            return (
                <View>
                    <Text style={stylesTaskForm.label}>Recurrence</Text>
                    <View style={stylesTaskForm.choiceContainer}>
                        <TouchableOpacity
                            style={this.state.recurrenceChoice === "hour" ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.recurrenceChoice("hour")}>
                            <Text style={stylesTaskForm.buttonText}>
                                Hour
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.recurrenceChoice === "day" ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.recurrenceChoice("day")}>
                            <Text style={stylesTaskForm.buttonText}>
                                Day
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.recurrenceChoice === "week" ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.recurrenceChoice("week")}>
                            <Text style={stylesTaskForm.buttonText}>
                                Week
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.recurrenceChoice === "month" ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.recurrenceChoice("month")}>
                            <Text style={stylesTaskForm.buttonText}>
                                Month
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
    /*
     * Add a 0 before a string if he has one character to make it Hour format.
     * @int value
     */
    convertTimer(value) {
        let string = value.toString();
        if (string.length === 1) {
            return "0" + string;
        }
        return value;
    }

    /*
     * Get data from the state to the task.
     * @return Object task
     */
    dataToTask() {
        let task = {
            name: this.state.taskName,
            date: this.state.date.substr(0, 10),
            type: this.state.typeChoice,
            recurrence: this.state.typeChoice === 'recurrent' ? this.state.recurrenceChoice : null,
            hourChoice: this.state.hourChoice,
            startHour: this.state.hourChoice === "fix" ? this.state.date.substr(11) : null,
            importance: this.state.importance,
            duration: this.state.duration,
            endHour: null
        };
        // Calculate endHour if the hour is fix.
        if (task.hourChoice === "fix") {
            let startHour = task.startHour.substr(0,2);
            let durationHour = task.duration.substr(0, 2);
            let startMinute = task.startHour.substr(3);
            let durationMinute = task.duration.substr(3);
            if ( startMinute === "00") {
                let endHour = (parseInt(startHour) + parseInt(durationHour));
                // If endHour is over 23, the task is over the next day.
                if( endHour > 23 ) {
                    endHour = endHour - 24;
                }
                endHour = this.convertTimer(endHour);
                task.endHour = endHour + ":" + durationMinute;
            }
            else if ( durationMinute === "00" ) {
                let endHour = (parseInt(startHour) + parseInt(durationHour));
                // If endHour is over 23, the task is over the next day.
                if ( endHour > 23 ) {
                    endHour = endHour - 24;
                }
                endHour = this.convertTimer(endHour);
                task.endHour = endHour + ":" + startMinute;
            }
            else {
                let minute = (parseInt(startMinute) + parseInt(durationMinute));
                let bonusHour = 0;
                // If minute is over 60 we have an additional hour to the endHour.
                if ( minute > 60) {
                    minute = minute - 60;
                    bonusHour = 1;
                }
                let endHour = (parseInt(startHour) + parseInt(durationHour)) + bonusHour;
                // If endHour is over 23, the task is over the next day.
                if ( endHour > 23 ) {
                    endHour = endHour - 24;
                }
                minute = this.convertTimer(minute);
                endHour = this.convertTimer(endHour);
                task.endHour = endHour + ":" + minute;
            }
        }
        return task;
    }

    /*
     * Make action with the taskReducer to save or update the task
     * in function of the situation, then return to Tasks View.
     */
    save(){
        // If we already have a taskId we edit a task.
        if (this.state.taskId) {
            let task = this.dataToTask();
            task.id = this.state.taskId;
            let action = {type: "UPDATE_TASK", value: task};
            this.props.dispatch(action);
        }
        // If we haven't it's a new task.
        else {
            let task = this.dataToTask();
            let action = {type: "ADD_TASK", value: task};
            this.props.dispatch(action);
        }
        this.props.navigation.navigate('Tasks');
    }

    /*
     * Get a task in the list by his id.
     */
    getTask(taskId){
        let selectTask = null;
        let taskList = this.props.taskReducer.taskList;
        taskList.forEach(task => {
            if (task.id === taskId) {
                selectTask = task;
            }
        });
        return selectTask;
    }

    render() {
        return (
            <View style={stylesTaskForm.container}>
                <ScrollView>
                    <Text style={stylesTaskForm.title}>New task</Text>
                    <Text style={stylesTaskForm.label}>Name</Text>
                    <TextInput style={stylesTaskForm.input} value={this.state.taskName} onChangeText={text => this.onChangeTaskName(text)}/>
                    <Text style={stylesTaskForm.label}>Hour</Text>
                    <View style={stylesTaskForm.choiceContainer}>
                        <TouchableOpacity
                            style={this.state.hourChoice === "free" ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.hourChoice("free")}>
                            <Text style={stylesTaskForm.buttonText}>
                                Free
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.hourChoice === "fix" ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.hourChoice("fix")}>
                            <Text style={stylesTaskForm.buttonText}>
                                Fix
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={stylesTaskForm.label}>Date</Text>
                    { this.dateInput()}
                    <Text style={stylesTaskForm.label}>Type</Text>
                    <View style={stylesTaskForm.choiceContainer}>
                        <TouchableOpacity
                            style={this.state.typeChoice === "date" ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.typeChoice("date")}>
                            <Text style={stylesTaskForm.buttonText}>
                                Dated
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.typeChoice === "recurrent" ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.typeChoice("recurrent")}>
                            <Text style={stylesTaskForm.buttonText}>
                                Recurrent
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {this.recurrence()}
                    <Text style={stylesTaskForm.label}>Duration</Text>
                    <DatePicker
                        style={stylesTaskForm.input}
                        date={this.state.duration}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        mode="time"
                        format={"HH:mm"}
                        customStyles={{
                            dateIcon: {
                                display: 'none'
                            },
                            dateInput: {
                                borderWidth: 0
                            },
                            dateText: {
                                fontSize: 19,
                            }
                        }}
                        value={this.state.duration}
                        onDateChange={(date) => {this.setState({duration: date})}} />
                    <Text style={stylesTaskForm.label}>Importance</Text>
                    <View style={stylesTaskForm.choiceContainer}>
                        <TouchableOpacity
                            style={this.state.importance === 1 ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.importanceChoice(1)}>
                            <Text style={stylesTaskForm.buttonText}>
                                Very low
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.importance === 2 ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.importanceChoice(2)}>
                            <Text style={stylesTaskForm.buttonText}>
                                Low
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.importance === 3 ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.importanceChoice(3)}>
                            <Text style={stylesTaskForm.buttonText}>
                                Neutral
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.importance === 4 ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.importanceChoice(4)}>
                            <Text style={stylesTaskForm.buttonText}>
                                High
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.importance === 5 ? stylesTaskForm.boxSelected : stylesTaskForm.box}
                            onPress={() => this.importanceChoice(5)}>
                            <Text style={stylesTaskForm.buttonText}>
                                Very high
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={stylesTaskForm.buttonLine}>
                    <TouchableOpacity style={stylesTaskForm.button} onPress={() => this.save()}>
                        <Text style={stylesTaskForm.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={stylesTaskForm.button} onPress={() => this.cleanForm() }>
                        <Text style={stylesTaskForm.buttonText}>Clean</Text>
                    </TouchableOpacity>
                    {this.state.taskId ?
                        <TouchableOpacity style={stylesTaskForm.button} onPress={() => this.deleteTask()}>
                            <Text style={stylesTaskForm.buttonText}>Delete</Text>
                        </TouchableOpacity>
                        : null
                    }
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

export default connect(mapStateToProps)(TaskForm);
