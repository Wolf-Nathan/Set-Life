// Components/Tasks.js

import React from 'react'
import {Text, View, Button, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import {connect} from 'react-redux';
import RowTask from "./RowTask";

class Tasks extends React.Component {

    /*
     * Return the list of tasks or a message if there is no task.
     */
    taskList() {
        if (this.props.taskReducer.taskList.length > 0) {
            return (
                <View>
                    <FlatList
                        data={this.props.taskReducer.taskList}
                        renderItem={({ item }) => {
                            return(
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('TaskForm', {taskId: item.id})}>
                                    <RowTask item={item} />
                                </TouchableOpacity>
                            )}
                        }
                        keyExtractor={(item, index)=> index}
                    />
                </View>
            )
        } else {
            return (
                <Text>You have no task !</Text>
            )
        }
    }

    render() {
        return (
            <View>
                <Text>Your tasks</Text>
                { this.taskList() }
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('TaskForm')}>
                    <Text style={styles.buttonText}>New Task</Text>
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
    }
});

export default connect(mapStateToProps)(Tasks);