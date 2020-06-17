// Components/Register.js

import React from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import logoGreen from '../assets/images/logo_green_500.png';
import Icon from 'react-native-vector-icons/Ionicons';

import { stylesRegister } from '../assets/style/stylesheet';

class Register extends React.Component {

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

    render() {
        return(
            <View style={stylesRegister.viewContainer}>
                <View style={stylesRegister.logoContainer}>
                    <Image source={logoGreen} style={stylesRegister.logo} />
                    <Text style={stylesRegister.logoText}>Sign up</Text>
                </View>

                <View style={stylesRegister.formContainer}>
                    <Icon name={'ios-person'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesRegister.inputIcon} />
                    <TextInput 
                        placeholder={'Username'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        style={stylesRegister.input}
                    />
                </View>

                <View style={stylesRegister.formContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesRegister.inputIcon} />
                    <TextInput 
                        placeholder={'Password'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPassword}
                        style={stylesRegister.input}
                    />
                    <TouchableOpacity style={stylesRegister.ctaTogglePassword} onPress={this.showPassword.bind(this)}>
                        <Icon name={this.state.press === false ? 'ios-eye' : 'ios-eye-off'} color={'rgba(0, 0, 0, 0.7)'} size={26} />
                    </TouchableOpacity>
                </View>

                <View style={stylesRegister.formContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesRegister.inputIcon} />
                    <TextInput 
                        placeholder={'Password confirmation'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPassword}
                        style={stylesRegister.input}
                    />
                    <TouchableOpacity style={stylesRegister.ctaTogglePassword} onPress={this.showPassword.bind(this)}>
                        <Icon name={this.state.press === false ? 'ios-eye' : 'ios-eye-off'} color={'rgba(0, 0, 0, 0.7)'} size={26} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={stylesRegister.ctaLogin}>
                    <Text style={stylesRegister.textLogin}>Sign up</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Register;