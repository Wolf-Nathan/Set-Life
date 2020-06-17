import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { stylesWeekdaySelector } from '../assets/style/stylesheet';

class WeekdaySelector extends React.Component {

    toggleWeek = (day) => {
        const toggle = { type: "TOGGLE_WORKDAY", value: day }
        this.props.dispatch(toggle);
    }

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

const mapStateToProps = state => {
    return { 
        settings: state.settings
    }
};

export default connect(mapStateToProps)(WeekdaySelector);