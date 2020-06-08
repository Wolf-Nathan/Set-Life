import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const { width: WIDTH} = Dimensions.get('window');

export default class WeekdaySelector extends Component {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.day}>
                    <Text style={styles.text}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.day}>
                    <Text style={styles.text}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.daySelected}>
                    <Text style={styles.text}>T</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.day}>
                    <Text style={styles.text}>W</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.daySelected}>
                    <Text style={styles.text}>T</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.daySelected}>
                    <Text style={styles.text}>F</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.day}>
                    <Text style={styles.text}>S</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: WIDTH-60,
        borderRadius: 7,
        overflow: 'hidden'        
    },
    day: {
        height: 40,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#77897F",
        alignSelf: 'center'
    },
    daySelected: {
        height: 40,
        justifyContent: 'center',
        flex: 1,
        backgroundColor: "#1B5044",
        alignSelf: 'center'
    },
    text: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#F2F2F2',
        textAlign: 'center'
    }
});