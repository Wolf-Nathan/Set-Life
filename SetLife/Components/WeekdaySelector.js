import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { stylesWeekdaySelector } from '../assets/style/stylesheet';

/**
 * Component to toggle work day into the settings reducer.
 * @class WeekdaySelector
 * @extends {Component}
 */
class WeekdaySelector extends React.Component {

    /**
     * Function to toggle day work into the settings reducer.
     * @param day
     */
    toggleWeek = (day) => {
        const toggle = { type: "TOGGLE_WORKDAY", value: day }
        this.props.dispatch(toggle);
    }

    /**
     * Render the WeekdaySelector.
     * @returns {View}
     */
    render() {
        return (
            <View style={stylesWeekdaySelector.container}>
                <TouchableOpacity style={this.props.settings.workday.sunday ? stylesWeekdaySelector.daySelected : stylesWeekdaySelector.day} onPress={() => this.toggleWeek('SUNDAY')}>
                    <Text style={stylesWeekdaySelector.text}>S</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.monday ? stylesWeekdaySelector.daySelected : stylesWeekdaySelector.day} onPress={() => this.toggleWeek('MONDAY')}>
                    <Text style={stylesWeekdaySelector.text}>M</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.tuesday ? stylesWeekdaySelector.daySelected : stylesWeekdaySelector.day} onPress={() => this.toggleWeek('TUESDAY')}>
                    <Text style={stylesWeekdaySelector.text}>T</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.wednesday ? stylesWeekdaySelector.daySelected : stylesWeekdaySelector.day} onPress={() => this.toggleWeek('WEDNESDAY')}>
                    <Text style={stylesWeekdaySelector.text}>W</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.thursday ? stylesWeekdaySelector.daySelected : stylesWeekdaySelector.day} onPress={() => this.toggleWeek('THURSDAY')}>
                    <Text style={stylesWeekdaySelector.text}>T</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.friday ? stylesWeekdaySelector.daySelected : stylesWeekdaySelector.day} onPress={() => this.toggleWeek('FRIDAY')}>
                    <Text style={stylesWeekdaySelector.text}>F</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.props.settings.workday.saturday ? stylesWeekdaySelector.daySelected : stylesWeekdaySelector.day} onPress={() => this.toggleWeek('SATURDAY')}>
                    <Text style={stylesWeekdaySelector.text}>S</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

/**
 * Function to get settings reducer.
 */
const mapStateToProps = state => {
    return { 
        settings: state.settings
    }
};

export default connect(mapStateToProps)(WeekdaySelector);