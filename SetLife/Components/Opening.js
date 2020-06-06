// Navigation/Opening.js

import React from 'react';
import {Text, View, StyleSheet, Image, Dimensions, TouchableOpacity} from "react-native";
import logoGreen from '../assets/images/logo_green_500.png';

const { width: WIDTH} = Dimensions.get('window');

class Login extends React.Component {

    openLoginPage() {
        this.props.navigation.navigate('Login');
    }

    openRegisterPage() {
        this.props.navigation.navigate('Register');
    }

    render() {
        return(
            <View style={styles.ViewContainer}>
                <View>
                    <Image source={logoGreen} style={styles.logo} />
                    <Text style={styles.logoText}>Welcome</Text>
                </View>

                <View>
                    <TouchableOpacity style={styles.ctaLogin} onPress={() => this.openLoginPage()}>
                        <Text style={styles.textLogin}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.ctaLogin} onPress={() => this.openRegisterPage()}>
                        <Text style={styles.textLogin}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    ViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#F2F2F2'
    },
    logo: {
        width: 200,
        height: 200
    },
    logoText: {
        fontSize: 30,
        color: '#77897F',
        fontWeight: '500',
        fontFamily: 'Montserrat',
        textAlign: 'center'
    },
    ctaLogin: {
        width: WIDTH - 55,
        height: 60,
        borderRadius: 10,
        backgroundColor: '#1B5044',
        justifyContent: 'center',
        margin: 10
    },
    textLogin: {
        color: '#fff',
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Montserrat'
    }
})

export default Login;