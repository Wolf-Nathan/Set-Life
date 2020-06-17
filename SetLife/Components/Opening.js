// Navigation/Opening.js

import React from 'react';
import {Text, View, Image, TouchableOpacity} from "react-native";
import logoGreen from '../assets/images/logo_green_500.png';

import { stylesOpening } from '../assets/style/stylesheet';

class Login extends React.Component {

    openLoginPage() {
        this.props.navigation.navigate('Login');
    }

    openRegisterPage() {
        this.props.navigation.navigate('Register');
    }

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