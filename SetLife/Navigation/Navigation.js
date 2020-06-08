// Navigation/Navigation.js

import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Opening from '../Components/Opening';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Home from '../Components/Home';
import Calendar from '../Components/Calendar';
import Tasks from '../Components/Tasks';
import Settings from '../Components/Settings';
import TaskForm from "../Components/TaskForm";

const TasksStackNavigator = createStackNavigator({
    Tasks: {
        screen: Tasks,
        navigationOptions: {
            title: 'Tasks',
            headerShown: false,
        },
    },
    NewTask: {
        screen: TaskForm,
        navigationOptions: {
            title: 'New task',
        },
    }
});

const Tab = createBottomTabNavigator({
        Home: {
            screen: Home,
            navigationOptions: {
                title: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={30} />
                )
            },
        },
        Calendar: {
            screen: Calendar,
            navigationOptions: {
                title: 'Calendar',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="calendar-month" color={color} size={30} />
                )
            }
        },
        Tasks: {
            screen: TasksStackNavigator,
            navigationOptions: {
                title: 'Tasks',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="format-list-bulleted" color={color} size={30} />
                )
            }
        },
        Settings: {
            screen: Settings,
            navigationOptions: {
                title: 'Settings',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="settings" color={color} size={30} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeBackgroundColor: '#F2F2F2',
            inactiveBackgroundColor: '#F2F2F2',
            activeTintColor: '#1B5044',
            inactiveTintColor: '#ABB0B4'
        }
});

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
    screen: Tab,
    navigationOptions: {
      title: 'Home',
      headerShown: false,
    },
  },
});

export default createAppContainer(HomeStackNavigator);
