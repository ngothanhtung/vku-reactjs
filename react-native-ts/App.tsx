import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Login from './src/components/Login';
import Products from './src/components/Products';

const URL = 'https://server.aptech.io/online-shop/products';

export default function App() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* <Products /> */}
      <Login />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
