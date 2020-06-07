// Components/Login.js

import React from 'react';
import {Text, View, ImageBackground, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity, ScrollView} from "react-native";
import logoGreen from '../assets/images/logo_green_500.png';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: WIDTH} = Dimensions.get('window');
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: true,
            press: false
        }
    }

    showPassword = () => {
        if(this.state.press === false) {
            this.setState({
                showPassword: false,
                press: true
            })
        } else {
            this.setState({
                showPassword: true,
                press: false
            })
        }
    }

    signIn() {
        // Check login infos here
        this.props.navigation.navigate('Home');
    }


    render() {
        return(
            <View style={styles.ViewContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logoGreen} style={styles.logo} />
                    <Text style={styles.logoText}>Sign in</Text>
                </View>

                <View style={styles.formContainer}>
                    <Icon name={'ios-person'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={styles.inputIcon} />
                    <TextInput 
                        placeholder={'Username'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        style={styles.input}
                    />
                </View>

                <View style={styles.formContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={styles.inputIcon} />
                    <TextInput 
                        placeholder={'Password'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPassword}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.ctaTogglePassword} onPress={this.showPassword.bind(this)}>
                        <Icon name={this.state.press === false ? 'ios-eye' : 'ios-eye-off'} color={'rgba(0, 0, 0, 0.7)'} size={26} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.ctaLogin} onPress={() => this.signIn()}>
                    <Text style={styles.textLogin}>Sign in</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    ViewContainer: {
        flex: 1,
        alignItems: 'center',
        width: null,
        height: null,
        paddingTop: 100
    },
    logoContainer: {
        alignItems: 'center'
    },
    logo: {
        width: 200,
        height: 200
    },
    logoText: {
        fontSize: 30,
        color: '#77897F',
        fontWeight: '500',
        fontFamily: 'Montserrat'
    },
    formContainer: {
        marginTop: 25
    },  
    inputIcon: {
        position: 'absolute',
        top: 8,
        left: 37
    },
    input: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 10,
        fontSize: 19,
        paddingLeft: 45,
        marginHorizontal: 25,
        borderColor: "#1B5044",
        borderWidth: 2,
        fontFamily: 'Montserrat'
    },
    ctaTogglePassword: {
        position: 'absolute',
        top: 10,
        right: 37
    },
    ctaLogin: {
        width: WIDTH - 55,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#1B5044',
        justifyContent: 'center',
        marginTop: 50
    },
    textLogin: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Montserrat'
    }
})