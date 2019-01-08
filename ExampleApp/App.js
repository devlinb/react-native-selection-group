/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { 
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation';
import SimpleScreen from './screens/SimpleScreen';
import MultiselectScreen from './screens/MultiselectScreen';
import RadioButtonsScreen from './screens/RadioButtonsScreen';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const tabBarOptions = {
  activeTintColor: 'rgba(78,142,255,1)',
  showLabel: true,
  style: {
      backgroundColor: 'rgba(255,255,255,1)',
  },
};


const SimpleScreenTabConfiguration = {
  screen: SimpleScreen,
  navigationOptions: {
      title: 'Simple',
      backgroundColor: 'rgba(108,48,237,1)'
  },
};

const MultiselectScreenTabConfiguration = {
  screen: MultiselectScreen,
  navigationOptions: {
      title: 'Multi-select',
      backgroundColor: 'rgba(108,48,237,1)'
  },
};

const RadioButtonsScreenTabConfiguration = {
  screen: RadioButtonsScreen,
  navigationOptions: {
      title: 'Radio Buttons',
      backgroundColor: 'rgba(108,48,237,1)'
  },
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    SimpleScreenTabConfiguration,
    MultiselectScreenTabConfiguration,
    RadioButtonsScreenTabConfiguration
  },
  {
    tabBarOptions,
    defaultNavigationOptions: {
      backgroundColor: 'rgba(108,48,237,1)'
    }
  },
  
);

const AppContainer = createAppContainer(BottomTabNavigator);

export default AppContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(108,48,237,1)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
