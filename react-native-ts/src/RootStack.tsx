import React from 'react';
import { Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthStack from './screens/AuthStack';
import RootTab from './screens/Tabs';
import RootDrawer from './screens/RootDrawer';

const Stack = createNativeStackNavigator();

type Props = {};

const RootStack = (props: Props) => {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  return (
    <Stack.Navigator>
      {/* {!loggedInUser && <Stack.Screen name='Auth' component={AuthStack} />}
      {loggedInUser && <Stack.Screen name='Tabs' component={RootTab} />} */}
      <Stack.Screen name='Auth' component={AuthStack} />
      {/* <Stack.Screen name='Drawer' component={RootDrawer} /> */}
      <Stack.Screen name='Tabs' component={RootTab} />
    </Stack.Navigator>
  );
};

export default RootStack;
