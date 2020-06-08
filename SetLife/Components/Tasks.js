// Components/Tasks.js

import React from 'react'
import {Text, View, Button, TouchableOpacity, StyleSheet} from "react-native";
import TaskForm from "./TaskForm";

class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addTask: false
        };
    }

    render() {
        return (
            <View>
                <Text>Tasks :></Text>
                <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('NewTask')}>
                    <Text style={styles.buttonText}>New Task</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

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

export default Tasks;