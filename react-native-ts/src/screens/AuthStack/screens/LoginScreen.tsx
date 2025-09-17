import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

type Props = {};

const LoginScreen = (props: Props) => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>LoginScreen</Text>

      <Button
        title='Login OK'
        onPress={() => {
          // Login Screen is child of AuthStack, AuthStack and Tabs are children of RootStack

          navigation.navigate('Tabs' as never); // Type 'never' is not assignable to type 'undefined'. because Tabs has children
        }}
      />
    </View>
  );
};

export default LoginScreen;
