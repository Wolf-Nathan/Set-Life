// Components/Settings.js

import React from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity} from "react-native";
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker';
import WeekdaySelector from './WeekdaySelector';

const { width: WIDTH} = Dimensions.get('window');

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            typeChoice: "date",
            wakeupWeek: null,
            wakeupWeekend: null,
            breakfast: null,
            lunch: null,
            dinner: null,
            workday: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false
            },
            workMorningStart: null,
            workMorningEnd: null,
            workAfternoonStart: null,
            workAfternoonEnd: null,
        }
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
                                date={this.state.wakeupWeek}
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
                                onDateChange={(wakeupWeek) => {this.setState({wakeupWeek: wakeupWeek})}} />
                        </View>
                        <View>
                            <Text style={styles.text}>Weekend day</Text>
                            <DatePicker 
                                style={styles.inputTime}
                                date={this.state.wakeupWeekend}
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
                                onDateChange={(wakeupWeekend) => {this.setState({wakeupWeekend: wakeupWeekend})}} />
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
                                date={this.state.breakfast}
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
                                onDateChange={(breakfast) => {this.setState({breakfast: breakfast})}} />
                        </View>
                        <View>
                            <Text style={styles.text}>Lunch</Text>
                            <DatePicker 
                                style={styles.inputTime}
                                date={this.state.lunch}
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
                                onDateChange={(lunch) => {this.setState({lunch: lunch})}} />
                        </View>
                        <View>
                            <Text style={styles.text}>Dinner</Text>
                            <DatePicker 
                                style={styles.inputTime}
                                date={this.state.dinner}
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
                                onDateChange={(dinner) => {this.setState({dinner: dinner})}} />
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
                                    date={this.state.workMorningStart}
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
                                    onDateChange={(workMorningStart) => {this.setState({workMorningStart: workMorningStart})}} />
                                    <DatePicker 
                                    style={styles.inputTime}
                                    date={this.state.workMorningEnd}
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
                                    onDateChange={(workMorningEnd) => {this.setState({workMorningEnd: workMorningEnd})}} />
                            </View>
                        </View>
                        <View>
                            <Text style={styles.text}>Afternoon</Text>
                            <View style={styles.rowContainerSub}>
                                <DatePicker 
                                    style={styles.inputTime}
                                    date={this.state.workAfternoonStart}
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
                                    onDateChange={(workAfternoonStart) => {this.setState({workAfternoonStart: workAfternoonStart})}} />
                                    <DatePicker 
                                    style={styles.inputTime}
                                    date={this.state.workAfternoonEnd}
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
                                    onDateChange={(workAfternoonEnd) => {this.setState({workAfternoonEnd: workAfternoonEnd})}} />
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

export default Settings;