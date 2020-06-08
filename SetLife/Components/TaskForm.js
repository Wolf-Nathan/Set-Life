// Components/TaskForm.js

import React from 'react';
import {View, Text, TextInput, Button, TouchableOpacity, Picker, StyleSheet, Dimensions} from 'react-native';
import Constants from "expo-constants";

const { width: WIDTH} = Dimensions.get('window');

class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            typeChoice: "date"
        }
    }

    onChangeTaskName(text) {
        this.setState({taskName: text});
    }

    onChangeDate(text) {
        this.setState({taskDate: text});
    }

    typeChoice(text) {
        this.setState({typeChoice: text});
    }

    recurrenceChoice(text) {
        this.setState({recurrenceChoice: text});
    }

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

    save(){

    }

    render() {
        const taskId = this.props.taskId;
        if(taskId) {
            /*var task = getTask(taskId);
            this.setState({
                taskName: task.name,
                taskDate: task.date,
                typeChoice: task.typeChoice,
                recurrenceChoice: task.typeChoice === "recurrence" ? task.recurrenceChoice : null
            })*/
        }
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} value={this.state.taskName} onChangeText={text => this.onChangeTaskName(text)}/>
                <Text style={styles.label}>Date</Text>
                <TextInput style={styles.input} value={this.state.taskDate} onChangeText={text => this.onChangeDate(text)}/>
                <Text style={styles.label}>Type</Text>
                <View style={styles.choiceContainer}>
                    <TouchableOpacity
                        style={this.state.typeChoice === "date" ? styles.boxSelected : styles.box}
                        onPress={() => this.typeChoice("date")}>
                        <Text style={styles.buttonText}>
                            Date
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F2',
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    choiceContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    box: {
        backgroundColor: "#77897F",
        borderRadius: 15,
        padding: 15,
        width: 150,
        margin: 5,
        alignSelf: 'center'
    },
    boxSelected: {
        backgroundColor: "#1B5044",
        borderRadius: 15,
        padding: 15,
        width: 150,
        margin: 5,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: "#1B5044",
        borderRadius: 15,
        padding: 15,
        width: 150,
        margin: 5,
        alignSelf: 'center'
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
        fontSize: 22,
        marginLeft: 25,
        marginTop: 5
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 7,
        fontSize: 19,
        paddingLeft: 45,
        marginHorizontal: 25,
        borderColor: "#1B5044",
        borderWidth: 2,
        fontFamily: 'Montserrat'
    },
});

export default TaskForm;
