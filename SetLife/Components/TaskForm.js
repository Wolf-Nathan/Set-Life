// Components/TaskForm.js

import React from 'react';
import {View, Text, TextInput, Button, TouchableOpacity, Picker, StyleSheet} from 'react-native';

class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            typeChoice: "date"
        }
    }

    onChangeTaskName(text) {
        if (text !== "") {
            this.setState({taskName: text});
        }
    }

    onChangeDate(text) {
        if (text !== "") {
            this.setState({taskDate: text});
        }
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
                    <Text>Recurrence</Text>
                    <TouchableOpacity onPress={() => this.recurrenceChoice("hour")}>
                        <Text style={this.state.recurrenceChoice === "hour" ? styles.boxSelected : styles.box}>
                            Hour
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.recurrenceChoice("day")}>
                        <Text style={this.state.recurrenceChoice === "day" ? styles.boxSelected : styles.box}>
                            Day
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.recurrenceChoice("week")}>
                        <Text style={this.state.recurrenceChoice === "week" ? styles.boxSelected : styles.box}>
                            Week
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.recurrenceChoice("month")}>
                        <Text style={this.state.recurrenceChoice === "month" ? styles.boxSelected : styles.box}>
                            Month
                        </Text>
                    </TouchableOpacity>
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
            <View>
                <Text>Task name</Text>
                <TextInput value={this.state.taskName} onChangeText={text => this.onChangeTaskName(text)}/>
                <Text>Date</Text>
                <TextInput value={this.state.taskDate} onChangeText={text => this.onChangeDate(text)}/>
                <Text>Type</Text>
                <TouchableOpacity onPress={() => this.typeChoice("date")}>
                    <Text style={this.state.typeChoice === "date" ? styles.boxSelected : styles.box}>
                        Date
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.typeChoice("recurrent")}>
                    <Text style={this.state.typeChoice === "recurrent" ? styles.boxSelected : styles.box}>
                        Recurrent
                    </Text>
                </TouchableOpacity>
                {this.recurrence()}
                <TouchableOpacity style={styles.button} onPress={() => this.save()}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    box: {
        color: "#000000"
    },
    boxSelected: {
        color: "#0000FF"
    },
    button: {
        backgroundColor: "#1B5044",
        borderRadius: 15,
        padding: 5,
        paddingLeft: 15,
        width: 150,
        margin: 5,
        alignSelf: 'center'
    },
    buttonText: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#F2F2F2'
    }
});

export default TaskForm;
