import React from 'react'
import {View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BlogScreen from '../screens/BlogScreen';
import Home from '../screens/Home';
import TopStories from '../screens/TopStoriesScreen';
import BusinessNews from '../screens/BusinessNews';
import AllTopStories from '../screens/AllTopStories';
import AllBusinessNews from '../screens/AllBusinessNews';
import Entertainment from '../screens/Entertainment';
import AllEntertainment from '../screens/AllEntertainment';
import Sports from '../screens/Sports';
import AllSports from '../screens/AllSports';
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="For You" component={Home} />
      <Tab.Screen name="Business" component={AllBusinessNews} />
      <Tab.Screen name="Entertainment" component={AllEntertainment} />
      <Tab.Screen name="Sport" component={AllSports} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
