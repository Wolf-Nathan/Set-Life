// Components/Login.js

import React from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import logoGreen from '../assets/images/logo_green_500.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import { stylesLogin } from '../assets/style/stylesheet';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showPassword: true,
            press: false,
            login: "",
            password: ""
        }
    }

    showPassword() {
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
        let user = {
            login: this.state.login,
            password: this.state.password
        };
        // Check login infos here
        let action = {type: "LOG_IN", value: user};
        this.props.dispatch(action);
        // this.props.navigation.navigate('Home');
    }

    onChangeLogin(login) {
        this.setState({
            login: login
        })
    }

    onChangePassword(password) {
        this.setState({
            password: password
        })
    }

    render() {
        return(
            <View style={stylesLogin.viewContainer}>
                <View style={stylesLogin.logoContainer}>
                    <Image source={logoGreen} style={stylesLogin.logo} />
                    <Text style={stylesLogin.logoText}>Sign in</Text>
                </View>

                <View style={stylesLogin.formContainer}>
                    <Icon name={'ios-person'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesLogin.inputIcon} />
                    <TextInput 
                        placeholder={'Username'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        style={stylesLogin.input}
                        onChangeText={(login) => this.onChangeLogin(login)}
                    />
                </View>

                <View style={stylesLogin.formContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesLogin.inputIcon} />
                    <TextInput 
                        placeholder={'Password'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPassword}
                        style={stylesLogin.input}
                        onChangeText={(password) => this.onChangePassword(password)}
                    />
                    <TouchableOpacity style={stylesLogin.ctaTogglePassword} onPress={this.showPassword.bind(this)}>
                        <Icon name={this.state.press === false ? 'ios-eye' : 'ios-eye-off'} color={'rgba(0, 0, 0, 0.7)'} size={26} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={stylesLogin.ctaLogin} onPress={() => this.signIn()}>
                    <Text style={stylesLogin.textLogin}>Sign in</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginReducer: state.login
    }
};

export default connect(mapStateToProps)(Login);