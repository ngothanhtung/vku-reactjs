import React from 'react';
import { Text, View } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AboutScreen from './screens/AboutScreen';
import AccountScreen from './screens/AccountScreen';
import HomeScreen from './screens/HomeScreen';
import NewsStack from './screens/NewsStack';
import NotificationsScreen from './screens/NotificationsScreen';

const Tab = createBottomTabNavigator();
type Props = {};

const RootTab = (props: Props) => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'blue',
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='home' size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name='About'
        component={AboutScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='info' size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name='Notifications'
        component={NotificationsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='bell' size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name='News'
        component={NewsStack}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='globe' size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name='Account'
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name='user' size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default RootTab;
