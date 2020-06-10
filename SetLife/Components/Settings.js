// Components/Settings.js

import React from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import WeekdaySelector from './WeekdaySelector';
import { connect } from 'react-redux';

const { width: WIDTH} = Dimensions.get('window');

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
            <View style={styles.container}>
                <Text style={styles.title}>Preferences</Text>
                <View>
                    <Text style={styles.subTitle}>Wake up</Text>
                    <View style={styles.rowContainer}>
                        <View>
                            <Text style={styles.text}>Week day</Text>
                            <DatePicker 
                                style={styles.inputTime}
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
                            <Text style={styles.text}>Weekend day</Text>
                            <DatePicker 
                                style={styles.inputTime}
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
                    <Text style={styles.subTitle}>Meal up</Text>
                    <View style={styles.rowContainer}>
                        <View>
                            <Text style={styles.text}>Breakfast</Text>
                            <DatePicker 
                                style={styles.inputTime}
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
                            <Text style={styles.text}>Lunch</Text>
                            <DatePicker 
                                style={styles.inputTime}
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
                            <Text style={styles.text}>Dinner</Text>
                            <DatePicker 
                                style={styles.inputTime}
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
                    <Text style={styles.subTitle}>Work</Text>
                    <WeekdaySelector />
                    <View style={styles.rowContainer}>
                        <View>
                            <Text style={styles.text}>Morning</Text>
                            <View style={styles.rowContainerSub}>
                                <DatePicker 
                                    style={styles.inputTime}
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
                                    style={styles.inputTime}
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
                            <Text style={styles.text}>Afternoon</Text>
                            <View style={styles.rowContainerSub}>
                                <DatePicker 
                                    style={styles.inputTime}
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
                                    style={styles.inputTime}
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
                    <Text style={styles.subTitle}>Import / Export</Text>
                    <View style={styles.rowContainer}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Import</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Export</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={[styles.button, styles.buttonDisconnect]}>
                    <Text style={styles.buttonText}>Sign out</Text>
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
        backgroundColor: '#F2F2F2',
        flex: 1,
        paddingTop: Constants.statusBarHeight
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: WIDTH-20,
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 15
    },
    rowContainerSub: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginTop: 5,
        marginBottom: 15
    },
    title: {
        fontFamily: 'Montserrat',
        color: '#344644',
        fontSize: 30,
        textAlign: 'center'
    },
    subTitle: {
        fontFamily: 'Montserrat',
        color: '#77897F',
        fontSize: 24,
        marginLeft: 10
    },
    text: {
        fontFamily: 'Montserrat',
        color: '#77897F',
        fontSize: 18,
        textAlign: 'center'
    },
    button: {
        backgroundColor: "#1B5044",
        borderRadius: 15,
        width: 150,
        height: 50,
        margin: 5,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Montserrat',
        fontSize: 18,
        color: '#F2F2F2',
        alignSelf: 'center'
    },
    buttonDisconnect: {
        position: 'absolute',
        bottom: 10
    },
    inputTime: {
        padding: 3,
        marginLeft: 3,
        marginRight: 3,
        width: 80,
        alignSelf: 'center',
        borderRadius: 5,
        backgroundColor: "#1B5044"
    }
});

export default connect(mapStateToProps)(Settings);