import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import RootStack from './src/RootStack';
import RootTab from './src/screens/Tabs';

export default function App() {
  return (
    <NavigationContainer>
      {/* <RootTab /> */}
      <RootStack />
    </NavigationContainer>
  );
}
