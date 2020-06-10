// Components/TaskForm.js

import React from 'react';
import {View, Text, TextInput, Button, TouchableOpacity, Picker, StyleSheet, Dimensions} from 'react-native';
import Constants from "expo-constants";
import DatePicker from 'react-native-datepicker'

const { width: WIDTH} = Dimensions.get('window');
/*
 * Component for Task Form.
 */
class TaskForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            typeChoice: "date",
            date: null
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
            recurrenceChoice: ""
        })
    }

    /*
     * Change taskName in the state.
     */
    onChangeTaskName(text) {
        this.setState({taskName: text});
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
                <Text style={styles.title}>New task</Text>
                <TouchableOpacity onPress={() => this.cleanForm() }>
                    <Text>Supprimer les données</Text>
                </TouchableOpacity>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} value={this.state.taskName} onChangeText={text => this.onChangeTaskName(text)}/>
                <Text style={styles.label}>Date</Text>
                <DatePicker 
                    style={styles.input}
                    date={this.state.date}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    mode="datetime"
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

export default TaskForm;
