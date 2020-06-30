// Components/Tasks.js

import React from 'react'
import {Text, View, TouchableOpacity, FlatList} from "react-native";
import {connect} from 'react-redux';
import RowTask from "./RowTask";

import { stylesTasks } from '../assets/style/stylesheet';

/**
 * Component for Task list and management.
 * @class Tasks
 * @extends {React.Component}
 */
class Tasks extends React.Component {

    /**
     * Return the list of tasks or a message if there is no task.
     * @returns {View|Text}
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
                <Text style={stylesTasks.textEmpty}>You have no task !</Text>
            )
        }
    }

    /**
     * Render the View of Tasks component.
     * @returns {View}
     */
    render() {
        return (
            <View style={stylesTasks.container}>
                <Text style={stylesTasks.title}>Your tasks</Text>
                { this.taskList() }
                <TouchableOpacity style={stylesTasks.button} onPress={() => this.props.navigation.navigate('TaskForm')}>
                    <Text style={stylesTasks.buttonAdd}>New Task</Text>
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

export default connect(mapStateToProps)(Tasks);