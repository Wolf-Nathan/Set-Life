// Components/TaskForm.js

import React from 'react';
import {View, Text, TextInput, Button, TouchableOpacity, Picker, StyleSheet, Dimensions} from 'react-native';
import Constants from "expo-constants";
import DatePicker from 'react-native-datepicker';
import {connect} from 'react-redux';

const { width: WIDTH} = Dimensions.get('window');

/*
 * Component for Task Form.
 */
class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        const taskId = this.props.navigation.state.params ? this.props.navigation.state.params.taskId : null;
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
                    date: null,
                    hourChoice: "free",
                    importance: 3,
                    duration: "01:00"
                }
            }
        }
        else {
            this.state = {
                typeChoice: "date",
                date: null,
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
                    style={styles.input}
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
                    style={styles.input}
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
                    <Text style={styles.label}>Recurrence</Text>
                    <View style={styles.choiceContainer}>
                        <TouchableOpacity
                            style={this.state.recurrenceChoice === "hour" ? styles.boxSelected : styles.box}
                            onPress={() => this.recurrenceChoice("hour")}>
                            <Text style={styles.buttonText}>
                                Hour
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.recurrenceChoice === "day" ? styles.boxSelected : styles.box}
                            onPress={() => this.recurrenceChoice("day")}>
                            <Text style={styles.buttonText}>
                                Day
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.recurrenceChoice === "week" ? styles.boxSelected : styles.box}
                            onPress={() => this.recurrenceChoice("week")}>
                            <Text style={styles.buttonText}>
                                Week
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.recurrenceChoice === "month" ? styles.boxSelected : styles.box}
                            onPress={() => this.recurrenceChoice("month")}>
                            <Text style={styles.buttonText}>
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
            date: this.state.hourChoice === "fix" ? this.state.date.substr(0, 10) : this.state.date,
            type: this.state.typeChoice,
            recurrence: this.state.typeChoice === 'recurrent' ? this.state.recurrenceChoice : null,
            hourChoice: this.state.hourChoice,
            startHour: this.state.hourChoice === "fix" ? this.state.date.substr(11) : null,
            importance: this.state.importance,
            duration: this.state.duration,
            endHour: null
        };
        // Caclculate endHour if the hour is fix.
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
        console.log(this.props);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>New task</Text>
                <TouchableOpacity onPress={() => this.cleanForm() }>
                    <Text>Supprimer les données</Text>
                </TouchableOpacity>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} value={this.state.taskName} onChangeText={text => this.onChangeTaskName(text)}/>
                <Text style={styles.label}>Hour</Text>
                <View style={styles.choiceContainer}>
                    <TouchableOpacity
                        style={this.state.hourChoice === "free" ? styles.boxSelected : styles.box}
                        onPress={() => this.hourChoice("free")}>
                        <Text style={styles.buttonText}>
                            Free
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.hourChoice === "fix" ? styles.boxSelected : styles.box}
                        onPress={() => this.hourChoice("fix")}>
                        <Text style={styles.buttonText}>
                            Fix
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.label}>Date</Text>
                { this.dateInput()}
                <Text style={styles.label}>Type</Text>
                <View style={styles.choiceContainer}>
                    <TouchableOpacity
                        style={this.state.typeChoice === "date" ? styles.boxSelected : styles.box}
                        onPress={() => this.typeChoice("date")}>
                        <Text style={styles.buttonText}>
                            Dated
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.typeChoice === "recurrent" ? styles.boxSelected : styles.box}
                        onPress={() => this.typeChoice("recurrent")}>
                        <Text style={styles.buttonText}>
                            Recurrent
                        </Text>
                    </TouchableOpacity>
                </View>
                {this.recurrence()}
                <Text style={styles.label}>Duration</Text>
                <DatePicker
                    style={styles.input}
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
                <Text style={styles.label}>Importance</Text>
                <View style={styles.choiceContainer}>
                    <TouchableOpacity
                        style={this.state.importance === 1 ? styles.boxSelected : styles.box}
                        onPress={() => this.importanceChoice(1)}>
                        <Text style={styles.buttonText}>
                            Very low
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.importance === 2 ? styles.boxSelected : styles.box}
                        onPress={() => this.importanceChoice(2)}>
                        <Text style={styles.buttonText}>
                            Low
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.importance === 3 ? styles.boxSelected : styles.box}
                        onPress={() => this.importanceChoice(3)}>
                        <Text style={styles.buttonText}>
                            Neutral
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.importance === 4 ? styles.boxSelected : styles.box}
                        onPress={() => this.importanceChoice(4)}>
                        <Text style={styles.buttonText}>
                            High
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={this.state.importance === 5 ? styles.boxSelected : styles.box}
                        onPress={() => this.importanceChoice(5)}>
                        <Text style={styles.buttonText}>
                            Very high
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.save()}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
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
    title: {
        fontFamily: 'Montserrat',
        color: '#77897F',
        fontSize: 24,
        textAlign: 'center',
    },
    choiceContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: WIDTH-55,
        borderRadius: 7,
        overflow: 'hidden'
    },
    box: {
        height: 40,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#77897F",
        alignSelf: 'center'
    },
    boxSelected: {
        height: 40,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#1B5044",
        alignSelf: 'center'
    },
    button: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: "#1B5044",
        borderRadius: 15,
        width: 150,
        height: 50,
        margin: 5,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#F2F2F2',
        alignSelf: 'center'
    },
    label: {
        fontFamily: 'Montserrat',
        color: '#77897F',
        fontSize: 18,
        marginLeft: 25,
        marginTop: 5
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 7,
        fontSize: 19,
        marginHorizontal: 25,
        borderColor: "#1B5044",
        borderWidth: 2,
        fontFamily: 'Montserrat'
    },
});

export default connect(mapStateToProps)(TaskForm);
