// Components/Register.js

import React from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import logoGreen from '../assets/images/logo_green_500.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import { stylesRegister } from '../assets/style/stylesheet';

/**
 * Component for user registration.
 * @class Register
 * @extends {React.Component}
 */
class Register extends React.Component {
    /**
     * Constructor declaration of the component register.
     * @param props 
     */
    constructor(props) {
        super(props)
        this.state = {
            showPassword: true,
            press: false,
            username: "",
            login: "",
            password: "",
            confirmPassword: ""
        }
    }

    /**
     * Function to show or hide the password in the input field.
     */
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

    /**
     * Function that triggers the action of registering a user of loginReducer and allows a user to register.
     */
    signUp() {
        let newUser = {
            username: this.state.username,
            login: this.state.login,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        let action = {type: "SIGN_UP", value: newUser};
        this.props.dispatch(action);

        if(this.props.loginReducer.signUpSuccess) {
            this.props.navigation.navigate('Login');
        }
    }

    /**
     * Change username in the state.
     * @param username 
     */
    onChangeUsername(username) {
        this.setState({
            username: username
        })
    }

    /**
     * Change login in the state.
     * @param login 
     */
    onChangeLogin(login) {
        this.setState({
            login: login
        })
    }

    /**
     * Change password in the state.
     * @param password 
     */
    onChangePassword(password) {
        this.setState({
            password: password
        })
    }

    /**
     * Change confirmPassword in the state.
     * @param confirmPassword 
     */
    onChangeConfirmPassword(confirmPassword) {
        this.setState({
            confirmPassword: confirmPassword
        })
    }

    /**
     * Function that displays errors during register.
     */
    errorSignUp() {
        if(this.props.loginReducer.emptyFields) {
            return(
                <Text style={ {marginTop: 50} }>Please complete all fields.</Text>
            );
        }
        if(this.props.loginReducer.loginUsed) {
            return(
                <Text style={ {marginTop: 50} }>The login is already used.</Text>
            );
        }
        if(!this.props.loginReducer.confirmPassword) {
            return(
                <Text style={ {marginTop: 50} }>The passwords don't match.</Text>
            );
        }
    }

    /**
     * Returns the view of the register form.
     * @returns {View}
     */
    render() {
        return(
            <View style={stylesRegister.viewContainer}>
                <View style={stylesRegister.logoContainer}>
                    <Image source={logoGreen} style={stylesRegister.logo} />
                    <Text style={stylesRegister.logoText}>Sign up</Text>
                </View>

                <View style={stylesRegister.formContainer}>
                    <Icon name={'person'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesRegister.inputIcon} />
                    <TextInput 
                        placeholder={'Name'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        style={stylesRegister.input}
                        onChangeText={(username) => this.onChangeUsername(username)}
                    />
                </View>

                <View style={stylesRegister.formContainer}>
                    <Icon name={'person'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesRegister.inputIcon} />
                    <TextInput 
                        placeholder={'Login'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        style={stylesRegister.input}
                        onChangeText={(login) => this.onChangeLogin(login)}
                    />
                </View>

                <View style={stylesRegister.formContainer}>
                    <Icon name={'lock-closed-outline'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesRegister.inputIcon} />
                    <TextInput 
                        placeholder={'Password'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPassword}
                        style={stylesRegister.input}
                        onChangeText={(password) => this.onChangePassword(password)}
                    />
                    <TouchableOpacity style={stylesRegister.ctaTogglePassword} onPress={this.showPassword.bind(this)}>
                        <Icon name={this.state.press === false ? 'eye' : 'eye-off'} color={'rgba(0, 0, 0, 0.7)'} size={26} />
                    </TouchableOpacity>
                </View>

                <View style={stylesRegister.formContainer}>
                    <Icon name={'lock-closed-outline'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesRegister.inputIcon} />
                    <TextInput 
                        placeholder={'Password confirmation'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPassword}
                        style={stylesRegister.input}
                        onChangeText={(confirmPassword) => this.onChangeConfirmPassword(confirmPassword)}
                    />
                    <TouchableOpacity style={stylesRegister.ctaTogglePassword} onPress={this.showPassword.bind(this)}>
                        <Icon name={this.state.press === false ? 'eye' : 'eye-off'} color={'rgba(0, 0, 0, 0.7)'} size={26} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={stylesRegister.ctaLogin}>
                    <Text style={stylesRegister.textLogin} onPress={() => this.signUp()}>Sign up</Text>
                </TouchableOpacity>
                {this.errorSignUp()}
            </View>
        )
    }
}

/**
 * Set reducers in the component.
 * @param state 
 */
const mapStateToProps = state => {
    return {
        loginReducer: state.login
    }
}

/**
 * Connect the reducers with the component.
 */
export default connect(mapStateToProps)(Register);