import { View, Text, Button } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {};

const HomeScreen = (props: Props) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['top', 'left']}>
      <Text>HomeScreen</Text>
      <Button
        title='Go to About'
        onPress={() => {
          navigation.navigate('About' as never);
        }}
      />

      <Button
        title='Go to Product details'
        onPress={() => {
          navigation.navigate(
            'ProductDetails' as never,
            {
              product_id: 98,
            } as never,
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
