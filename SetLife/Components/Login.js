// Components/Login.js

import React from 'react';
import {Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import logoGreen from '../assets/images/logo_green_500.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

import { stylesLogin } from '../assets/style/stylesheet';

/**
 * Component for Sign In.
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {
    /**
     * Constructor declaration of the component Login.
     * @param props
     */
    constructor(props) {
        super(props)
        this.state = {
            showPassword: true,
            press: false,
            login: "",
            password: "",
        }
    }

    /**
     * Function to show or hide the password in the input field.
     */
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

    /**
     * Function that triggers the loginReducer login action and allows a user to log in.
     */
    signIn() {
        let user = {
            login: this.state.login,
            password: this.state.password
        };
        // Check login infos here
        let action = {type: "LOG_IN", value: user};
        this.props.dispatch(action);
    }

    /**
     * Function that redirects the user to the home page if logged in.
     */
    validConnection() {
        if(this.props.loginReducer.logged) {
            this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });
        } 
    }

    /**
     * Function that displays errors during connection.
     */
    errorConnection() {
        if(this.props.loginReducer.emptyFields) {
            return(
                <Text style={ {marginTop: 50} }>Please complete all fields.</Text>
            );
        }
        if(!this.props.loginReducer.userExist) {
            return(
                <Text style={ {marginTop: 50} }>User does not exist.</Text>
            );
        }
        if(this.props.loginReducer.wrongPassword) {
            return(
                <Text style={ {marginTop: 50} }>The renamed password is not correct.</Text>
            );
        }
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
     * Change password in the state
     * @param password 
     */
    onChangePassword(password) {
        this.setState({
            password: password
        })
    }

    /**
     * Redirect user to Opening view.
     */
    returnOpening() {
        this.props.navigation.navigate('Opening')
    }

    /**
     * Returns the view of the login form.
     * @returns {View}
     */
    render() {
        return(
            <View style={stylesLogin.viewContainer}>
                <View style={stylesLogin.logoContainer}>
                    <TouchableOpacity onPress={() => this.returnOpening()}>
                        <Image source={logoGreen} style={stylesLogin.logo}/>
                    </TouchableOpacity>
                    <Text style={stylesLogin.logoText}>Sign in</Text>
                </View>

                <View style={stylesLogin.formContainer}>
                    <Icon name={'person'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesLogin.inputIcon} />
                    <TextInput 
                        placeholder={'Username'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        style={stylesLogin.input}
                        onChangeText={(login) => this.onChangeLogin(login)}
                    />
                </View>

                <View style={stylesLogin.formContainer}>
                    <Icon name={'lock-closed-outline'} size={28} color={'rgba(0, 0, 0, 0.7)'} style={stylesLogin.inputIcon} />
                    <TextInput 
                        placeholder={'Password'}
                        placeholderTextColor={'#344644'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPassword}
                        style={stylesLogin.input}
                        onChangeText={(password) => this.onChangePassword(password)}
                    />
                    <TouchableOpacity style={stylesLogin.ctaTogglePassword} onPress={this.showPassword.bind(this)}>
                        <Icon name={this.state.press === false ? 'eye' : 'eye-off'} color={'rgba(0, 0, 0, 0.7)'} size={26} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={stylesLogin.ctaLogin} onPress={() => this.signIn()}>
                    <Text style={stylesLogin.textLogin}>Sign in</Text>
                </TouchableOpacity>
                {this.errorConnection()}
                {this.validConnection()}
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
};

/**
 * Connect the reducers with the component.
 */
export default connect(mapStateToProps)(Login);