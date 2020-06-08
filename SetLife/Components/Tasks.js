// Components/Tasks.js

import React from 'react'
import {Text, View, Button} from "react-native";
import TaskForm from "./TaskForm";

class Tasks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addTask: false
        };
    }

    addTask(){
        if(this.state.addTask) {
            return(
                <TaskForm/>
            )
        }
    }
    render() {
        return (
            <View>
                <Text>Tasks :></Text>
                <Button title={"Add a task"} onPress={() => this.setState({addTask: !this.state.addTask})}/>
                { this.addTask()}
            </View>
        )
    }
}

export default Tasks;