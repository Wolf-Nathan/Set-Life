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
                    hourChoice: task.hourChoice
                };
            }
            else {
                this.state = {
                    typeChoice: "date",
                    date: null,
                    hourChoice: "free"
                }
            }
        }
        else {
            this.state = {
                typeChoice: "date",
                date: null,
                hourChoice: "free"
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
            hourChoice: "free"
        })
    }

    /*
     * Change taskName in the state.
     */
    onChangeTaskName(text) {
        this.setState({taskName: text});
    }

    /*
     * Change hourChoice in the state.
     */
    hourChoice(text){
        this.setState({hourChoice: text});
    }

    /*
     * Change typeChoice in the state.
     */
    typeChoice(text) {
        this.setState({typeChoice: text});
    }

    /*
     * Change recurrenceChoice in the state.
     */
    recurrenceChoice(text) {
        this.setState({recurrenceChoice: text});
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
     * Make action with the taskReducer to save or update the task
     * in function of the situation, then return to Tasks View.
     */
    save(){
        // If we already have a taskId we edit a task.
        if (this.state.taskId) {
            let task = {
                id: this.state.taskId,
                name: this.state.taskName,
                date: this.state.hourChoice === "fix" ? this.state.date.substr(0, 10) : this.state.date,
                type: this.state.typeChoice,
                recurrence: this.state.typeChoice === 'recurrent' ? this.state.recurrenceChoice : null,
                hourChoice: this.state.hourChoice,
                startHour: this.state.hourChoice === "fix" ? this.state.date.substr(11) : null
            };
            let action = {type: "UPDATE_TASK", value: task};
            this.props.dispatch(action);
        }
        // If we haven't it's a new task.
        else {
            let task = {
                name: this.state.taskName,
                date: this.state.hourChoice === "fix" ? this.state.date.substr(0, 10) : this.state.date,
                type: this.state.typeChoice,
                recurrence: this.state.typeChoice === 'recurrent' ? this.state.recurrenceChoice : null,
                hourChoice: this.state.hourChoice,
                startHour: this.state.hourChoice === "fix" ? this.state.date.substr(11) : null
            };
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
