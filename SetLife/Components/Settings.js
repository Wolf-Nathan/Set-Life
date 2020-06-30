// Components/Settings.js

import React from 'react'
import {Text, View, TouchableOpacity} from "react-native";
import DatePicker from 'react-native-datepicker';
import WeekdaySelector from './WeekdaySelector';
import { connect } from 'react-redux';

import { stylesSettings } from '../assets/style/stylesheet';

/**
 * Component to define user preference, import/export and sign out.
 * @class Settings
 * @extends {Component}
 */
class Settings extends React.Component {

    /**
     * Function to toggle wake up time during week.
     * This method call settings reducer.
     * @param newValue
     */
    toggleWakeupWeek = (newValue) => {
        const toggle = { type: "TOGGLE_WAKEUPWEEK", value: newValue }
        this.props.dispatch(toggle);
    }

    /**
     * Function to toggle wake up time during week-end.
     * This method call settings reducer.
     * @param newValue
     */
    toggleWakeupWeekend = (newValue) => {
        const toggle = { type: "TOGGLE_WAKEUPWEEKEND", value: newValue }
        this.props.dispatch(toggle);
    }
    
    /**
     * Function to toggle bed time during week.
     * This method call settings reducer.
     * @param newValue
     */
    toggleBedtimeWeek = (newValue) => {
        const toggle = { type: "TOGGLE_BEDTIMEWEEK", value: newValue }
        this.props.dispatch(toggle);
    }

    /**
     * Function to toggle bed time during week-end.
     * This method call settings reducer.
     * @param newValue
     */
    toggleBedtimeWeekend = (newValue) => {
        const toggle = { type: "TOGGLE_BEDTIMEWEEKEND", value: newValue }
        this.props.dispatch(toggle);
    }
    
    /**
     * Function to toggle work morning start time.
     * This method call settings reducer.
     * @param newValue
     */
    toggleWorkMorningStart = (newValue) => {
        const toggle = { type: "TOGGLE_WORKMORNINGSTART", value: newValue }
        this.props.dispatch(toggle);
    }

    /**
     * Function to toggle work morning end time.
     * This method call settings reducer.
     * @param newValue
     */
    toggleWorkMorningEnd = (newValue) => {
        const toggle = { type: "TOGGLE_WORKMORNINGEND", value: newValue }
        this.props.dispatch(toggle);
    }

    /**
     * Function to toggle work afternoon start time.
     * This method call settings reducer.
     * @param newValue
     */
    toggleWorkAfternoonStart = (newValue) => {
        const toggle = { type: "TOGGLE_WORKAFTERNOONSTART", value: newValue }
        this.props.dispatch(toggle);
    }

    /**
     * Function to toggle work afternoon end time.
     * This method call settings reducer.
     * @param newValue
     */
    toggleWorkAfternoonEnd = (newValue) => {
        const toggle = { type: "TOGGLE_WORKAFTERNOONEND", value: newValue }
        this.props.dispatch(toggle);
    }

    /**
     * Render the Settings component for edit preference, import/export or sign out.
     * @returns {View}
     */
    render() {
        return (
            <View style={stylesSettings.container}>
                <Text style={stylesSettings.title}>Preferences</Text>
                <View>
                    <Text style={stylesSettings.subTitle}>Wake up</Text>
                    <View style={stylesSettings.rowContainer}>
                        <View>
                            <Text style={stylesSettings.text}>Week day</Text>
                            <DatePicker 
                                style={stylesSettings.inputTime}
                                date={this.props.settings.wakeupWeek}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                mode="time"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none'                            
                                    },
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        fontSize: 19,
                                        fontWeight: 'bold',
                                        color: "#F2F2F2"
                                    }
                                }}
                                onDateChange={(wakeupWeek) => {this.toggleWakeupWeek(wakeupWeek)}} />
                        </View>
                        <View>
                            <Text style={stylesSettings.text}>Weekend day</Text>
                            <DatePicker 
                                style={stylesSettings.inputTime}
                                date={this.props.settings.wakeupWeekend}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                mode="time"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none'                            
                                    },
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        fontSize: 19,
                                        fontWeight: 'bold',
                                        color: "#F2F2F2"
                                    }
                                }}
                                onDateChange={(wakeupWeekend) => {this.toggleWakeupWeekend(wakeupWeekend)}} />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={stylesSettings.subTitle}>Bed time</Text>
                    <View style={stylesSettings.rowContainer}>
                        <View>
                            <Text style={stylesSettings.text}>Week day</Text>
                            <DatePicker 
                                style={stylesSettings.inputTime}
                                date={this.props.settings.bedtimeWeek}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                mode="time"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none'                            
                                    },
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        fontSize: 19,
                                        fontWeight: 'bold',
                                        color: "#F2F2F2"
                                    }
                                }}
                                onDateChange={(bedtimeWeek) => {this.toggleBedtimeWeek(bedtimeWeek)}} />
                        </View>
                        <View>
                            <Text style={stylesSettings.text}>Weekend day</Text>
                            <DatePicker 
                                style={stylesSettings.inputTime}
                                date={this.props.settings.bedtimeWeekend}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                mode="time"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none'                            
                                    },
                                    dateInput: {
                                        borderWidth: 0
                                    },
                                    dateText: {
                                        fontSize: 19,
                                        fontWeight: 'bold',
                                        color: "#F2F2F2"
                                    }
                                }}
                                onDateChange={(bedtimeWeekend) => {this.toggleBedtimeWeekend(bedtimeWeekend)}} />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={stylesSettings.subTitle}>Work</Text>
                    <WeekdaySelector />
                    <View style={stylesSettings.rowContainer}>
                        <View>
                            <Text style={stylesSettings.text}>Morning</Text>
                            <View style={stylesSettings.rowContainerSub}>
                                <DatePicker 
                                    style={stylesSettings.inputTime}
                                    date={this.props.settings.workMorningStart}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    mode="time"
                                    customStyles={{
                                        dateIcon: {
                                            display: 'none'                            
                                        },
                                        dateInput: {
                                            borderWidth: 0
                                        },
                                        dateText: {
                                            fontSize: 19,
                                            fontWeight: 'bold',
                                            color: "#F2F2F2"
                                        }
                                    }}
                                    onDateChange={(workMorningStart) => {this.toggleWorkMorningStart(workMorningStart)}} />
                                    <DatePicker 
                                    style={stylesSettings.inputTime}
                                    date={this.props.settings.workMorningEnd}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    mode="time"
                                    customStyles={{
                                        dateIcon: {
                                            display: 'none'                            
                                        },
                                        dateInput: {
                                            borderWidth: 0
                                        },
                                        dateText: {
                                            fontSize: 19,
                                            fontWeight: 'bold',
                                            color: "#F2F2F2"
                                        }
                                    }}
                                    onDateChange={(workMorningEnd) => {this.toggleWorkMorningEnd(workMorningEnd)}} />
                            </View>
                        </View>
                        <View>
                            <Text style={stylesSettings.text}>Afternoon</Text>
                            <View style={stylesSettings.rowContainerSub}>
                                <DatePicker 
                                    style={stylesSettings.inputTime}
                                    date={this.props.settings.workAfternoonStart}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    mode="time"
                                    customStyles={{
                                        dateIcon: {
                                            display: 'none'                            
                                        },
                                        dateInput: {
                                            borderWidth: 0
                                        },
                                        dateText: {
                                            fontSize: 19,
                                            fontWeight: 'bold',
                                            color: "#F2F2F2"
                                        }
                                    }}
                                    onDateChange={(workAfternoonStart) => {this.toggleWorkAfternoonStart(workAfternoonStart)}} />
                                    <DatePicker 
                                    style={stylesSettings.inputTime}
                                    date={this.props.settings.workAfternoonEnd}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    mode="time"
                                    customStyles={{
                                        dateIcon: {
                                            display: 'none'                            
                                        },
                                        dateInput: {
                                            borderWidth: 0
                                        },
                                        dateText: {
                                            fontSize: 19,
                                            fontWeight: 'bold',
                                            color: "#F2F2F2"
                                        }
                                    }}
                                    onDateChange={(workAfternoonEnd) => {this.toggleWorkAfternoonEnd(workAfternoonEnd)}} />
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={stylesSettings.subTitle}>Import / Export</Text>
                    <View style={stylesSettings.rowContainer}>
                        <TouchableOpacity style={stylesSettings.button}>
                            <Text style={stylesSettings.buttonText}>Import</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={stylesSettings.button}>
                            <Text style={stylesSettings.buttonText}>Export</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={[stylesSettings.button, stylesSettings.buttonDisconnect]}>
                    <Text style={stylesSettings.buttonText}>Sign out</Text>
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

export default connect(mapStateToProps)(Settings);