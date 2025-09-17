import { View, Text, Button } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

type Props = {};

const AboutScreen = (props: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView edges={['top', 'left']}>
      <Text>AboutScreen</Text>
      <Button
        title='Go back'
        onPress={() => {
          navigation.goBack();
        }}
      />
    </SafeAreaView>
  );
};

export default AboutScreen;
