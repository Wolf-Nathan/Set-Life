// Components/Settings.js

import React from 'react'
import {Text, View, TouchableOpacity} from "react-native";
import DatePicker from 'react-native-datepicker';
import WeekdaySelector from './WeekdaySelector';
import { connect } from 'react-redux';

import { stylesSettings } from '../assets/style/stylesheet';

class Settings extends React.Component {

    toggleWakeupWeek = (newValue) => {
        const toggle = { type: "TOGGLE_WAKEUPWEEK", value: newValue }
        this.props.dispatch(toggle);
    }

    toggleWakeupWeekend = (newValue) => {
        const toggle = { type: "TOGGLE_WAKEUPWEEKEND", value: newValue }
        this.props.dispatch(toggle);
    }

    toggleBreakfast = (newValue) => {
        const toggle = { type: "TOGGLE_BREAKFAST", value: newValue }
        this.props.dispatch(toggle);
    }

    toggleLunch = (newValue) => {
        const toggle = { type: "TOGGLE_LUNCH", value: newValue }
        this.props.dispatch(toggle);
    }

    toggleDinner = (newValue) => {
        const toggle = { type: "TOGGLE_DINNER", value: newValue }
        this.props.dispatch(toggle);
    }

    toggleWorkMorningStart = (newValue) => {
        const toggle = { type: "TOGGLE_WORKMORNINGSTART", value: newValue }
        this.props.dispatch(toggle);
    }

    toggleWorkMorningEnd = (newValue) => {
        const toggle = { type: "TOGGLE_WORKMORNINGEND", value: newValue }
        this.props.dispatch(toggle);
    }

    toggleWorkAfternoonStart = (newValue) => {
        const toggle = { type: "TOGGLE_WORKAFTERNOONSTART", value: newValue }
        this.props.dispatch(toggle);
    }

    toggleWorkAfternoonEnd = (newValue) => {
        const toggle = { type: "TOGGLE_WORKAFTERNOONEND", value: newValue }
        this.props.dispatch(toggle);
    }

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
                    <Text style={stylesSettings.subTitle}>Meal up</Text>
                    <View style={stylesSettings.rowContainer}>
                        <View>
                            <Text style={stylesSettings.text}>Breakfast</Text>
                            <DatePicker 
                                style={stylesSettings.inputTime}
                                date={this.props.settings.breakfast}
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
                                onDateChange={(breakfast) => {this.toggleBreakfast(breakfast)}} />
                        </View>
                        <View>
                            <Text style={stylesSettings.text}>Lunch</Text>
                            <DatePicker 
                                style={stylesSettings.inputTime}
                                date={this.props.settings.lunch}
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
                                onDateChange={(lunch) => {this.toggleLunch(lunch)}} />
                        </View>
                        <View>
                            <Text style={stylesSettings.text}>Dinner</Text>
                            <DatePicker 
                                style={stylesSettings.inputTime}
                                date={this.props.settings.dinner}
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
                                onDateChange={(dinner) => {this.toggleDinner(dinner)}} />
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

const mapStateToProps = state => {
    return { 
        settings: state.settings
    }
};

export default connect(mapStateToProps)(Settings);