import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createNativeStackNavigator();

type Props = {};

const AuthStack = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{
          title: 'Đăng nhập',
        }}
      />
      <Stack.Screen
        name='ForgotPassword'
        component={ForgotPasswordScreen}
        options={{
          title: 'Quên mật khẩu',
        }}
      />

      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{
          title: 'Đăng ký',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
