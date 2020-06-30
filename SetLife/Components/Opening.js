// Navigation/Opening.js

import React from 'react';
import {Text, View, Image, TouchableOpacity} from "react-native";
import logoGreen from '../assets/images/logo_green_500.png';

import { stylesOpening } from '../assets/style/stylesheet';

/**
 * Component for Opening view.
 * @class Login
 * @extends {Component}
 */
class Login extends React.Component {

    /**
     * Function to open login view.
     */
    openLoginPage() {
        this.props.navigation.navigate('Login');
    }

    /**
     * Function to open register view.
     */
    openRegisterPage() {
        this.props.navigation.navigate('Register');
    }

    /**
     * Render the Opening view.
     * @returns {View}
     */
    render() {
        return(
            <View style={stylesOpening.viewContainer}>
                <View>
                    <Image source={logoGreen} style={stylesOpening.logo} />
                    <Text style={stylesOpening.logoText}>Welcome</Text>
                </View>

                <View>
                    <TouchableOpacity style={stylesOpening.ctaLogin} onPress={() => this.openLoginPage()}>
                        <Text style={stylesOpening.textLogin}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={stylesOpening.ctaLogin} onPress={() => this.openRegisterPage()}>
                        <Text style={stylesOpening.textLogin}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Login;