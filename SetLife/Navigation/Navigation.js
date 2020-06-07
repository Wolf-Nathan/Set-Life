// Navigation/Navigation.js

import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Opening from '../Components/Opening';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Home from '../Components/Home';
import Calendar from '../Components/Calendar';
import Tasks from '../Components/Tasks';
import Settings from '../Components/Settings';

const Tab = createBottomTabNavigator();

function HomePage() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName = 'Home'
        tabBarOptions = {{
          showIcon: true,
          showLabel: false,
          activeBackgroundColor: '#F2F2F2',
          inactiveBackgroundColor: '#F2F2F2',
          activeTintColor: '#1B5044',
          inactiveTintColor: '#ABB0B4'          
        }}>
        <Tab.Screen 
          name="Home" 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={30} />
              ),
          }}>
          {props => <Home {...props} />}
        </Tab.Screen>
        <Tab.Screen 
          name="Calendar" 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="calendar-month" color={color} size={30} />
              ),
            }}>
          {props => <Calendar {...props} />}
        </Tab.Screen>
        <Tab.Screen 
          name="Tasks" 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="format-list-bulleted" color={color} size={30} />
              ),
            }}>
          {props => <Tasks {...props} />}
        </Tab.Screen>
        <Tab.Screen 
          name="Settings" 
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="settings" color={color} size={30} />
              ),
            }}>
          {props => <Settings {...props} />}
        </Tab.Screen>
      </Tab.Navigator>          
    </NavigationContainer>
  );
}

const HomeStackNavigator = createStackNavigator({
  Opening: {
    screen: Opening,
    navigationOptions: {
      title: 'Opening',
      headerShown: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'Login',
      headerShown: false,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: 'Register',
      headerShown: false,
    },
  },
  Home: {
    screen: HomePage,
    navigationOptions: {
      title: 'Home',
      headerShown: false,
    },
  },
});

export default createAppContainer(HomeStackNavigator);
