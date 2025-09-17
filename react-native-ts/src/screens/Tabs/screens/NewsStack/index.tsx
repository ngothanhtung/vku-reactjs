import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewsDetailsScreen from './screens/NewsDetailsScreen';
import ListScreen from './screens/ListScreen';

const Stack = createNativeStackNavigator();

type Props = {};

const NewsStack = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='List'
        component={ListScreen}
        options={{
          title: 'Tin tức',
        }}
      />
      <Stack.Screen
        name='Details'
        component={NewsDetailsScreen}
        options={{
          title: 'Chi tiết tin tức',
        }}
      />
    </Stack.Navigator>
  );
};

export default NewsStack;
