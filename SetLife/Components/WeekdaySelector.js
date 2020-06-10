import React, {Component} from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';

const { width: WIDTH} = Dimensions.get('window');

class WeekdaySelector extends Component {

    toggleWeek = (day) => {
        const toggle = { type: "TOGGLE_WORKDAY", value: day }
        this.props.dispatch(toggle);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={this.props.settings.workday.sunday ? styles.daySelected : styles.day} onPress={() => this.toggleWeek('SUNDAY')}>
                    <Text style={styles.text}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.monday ? styles.daySelected : styles.day} onPress={() => this.toggleWeek('MONDAY')}>
                    <Text style={styles.text}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.tuesday ? styles.daySelected : styles.day} onPress={() => this.toggleWeek('TUESDAY')}>
                    <Text style={styles.text}>T</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.wednesday ? styles.daySelected : styles.day} onPress={() => this.toggleWeek('WEDNESDAY')}>
                    <Text style={styles.text}>W</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.thursday ? styles.daySelected : styles.day} onPress={() => this.toggleWeek('THURSDAY')}>
                    <Text style={styles.text}>T</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.friday ? styles.daySelected : styles.day} onPress={() => this.toggleWeek('FRIDAY')}>
                    <Text style={styles.text}>F</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.saturday ? styles.daySelected : styles.day} onPress={() => this.toggleWeek('SATURDAY')}>
                    <Text style={styles.text}>S</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return { 
        settings: state.settings
    }
};

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

export default connect(mapStateToProps)(WeekdaySelector);