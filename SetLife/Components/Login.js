// Components/Login.js

import React from 'react';
import {Text, View, ImageBackground, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity} from "react-native";
import backgroundImage from '../assets/images/background-login.png';
import logo from '../assets/images/react.png';
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

    render() {
        return(
            <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.logoText}>7 Life</Text>
                </View>

                <View style={styles.formContainer}>
                    <Icon name={'ios-person'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
                    <TextInput 
                        placeholder={'Utilisateur'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        style={styles.input}
                    />
                </View>

                <View style={styles.formContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(255, 255, 255, 0.7)'} style={styles.inputIcon} />
                    <TextInput 
                        placeholder={'Mot de passe'}
                        placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        underlineColorAndroid='transparent'
                        secureTextEntry={this.state.showPassword}
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.ctaTogglePassword} onPress={this.showPassword.bind(this)}>
                        <Icon name={this.state.press === false ? 'ios-eye' : 'ios-eye-off'} color={'rgba(255, 255, 255, 0.7)'} size={26} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.ctaLogin}>
                    <Text style={styles.textLogin}>Connexion</Text>
                </TouchableOpacity>
            </ImageBackground>
        )
    }
}

export default Login;

const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null
    },
    logoContainer: {
        alignItems: 'center'
    },
    logo: {
        width: 150,
        height: 150
    },
    logoText: {
        fontSize: 25,
        color: '#FFFFFF',
        fontWeight: '500',
        marginTop: 10,
        opacity: 0.8,
        textTransform: 'uppercase'
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
        borderRadius: 45,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        color: 'rgba(255, 255, 255, 0.7)',
        marginHorizontal: 25
    },
    ctaTogglePassword: {
        position: 'absolute',
        top: 10,
        right: 37
    },
    ctaLogin: {
        width: WIDTH - 55,
        height: 45,
        borderRadius: 45,
        backgroundColor: 'rgba(25, 118, 200, 0.7)',
        justifyContent: 'center',
        marginTop: 20
    },
    textLogin: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 18,
        textAlign: 'center'
    }
})