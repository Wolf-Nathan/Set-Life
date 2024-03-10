// Navigation/Navigation.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Opening from '../Components/Opening';
import Login from '../Components/Login';
import Register from '../Components/Register';
import Home from '../Components/Home';
import Calendar from '../Components/CustomCalendar';
import Tasks from '../Components/Tasks';
import Settings from '../Components/Settings';
import TaskForm from "../Components/TaskForm";
import NewsDetails from "../Components/NewsDetails";

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomepageStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName= "Opening"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="TaskForm" component={TaskForm} />
            <Stack.Screen name="NewsDetails" component={NewsDetails}/>
        </Stack.Navigator>
    );
}

function TasksStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName= "Opening"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Tasks" component={Tasks} />
            <Stack.Screen name="TaskForm" component={TaskForm} />
        </Stack.Navigator>
      );
}

function TabNavigator() {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#1B5044"
        inactiveColor="#ABB0B4"
        barStyle={{ 
            backgroundColor: '#F2F2F2',
            maxHeight: 70
        }}
    >
        <Tab.Screen 
            name="Home" 
            component={HomepageStackNavigator}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen 
            name="Calendar" 
            component={Calendar}
            options={{
                tabBarLabel: 'Calendar',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="calendar-month" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen 
            name="Tasks" 
            component={TasksStackNavigator}
            options={{
                tabBarLabel: 'Tasks',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen 
            name="Settings" 
            component={Settings}
            options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="cog" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
  );
}

function HomeStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName= "Opening"
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Opening" component={Opening} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
      );
}

export default HomeStackNavigator
