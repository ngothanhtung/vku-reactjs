import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import RootTab from '../Tabs';
import { Linking } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

const Drawer = createDrawerNavigator();

function RootDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name='Tabs' component={RootTab} options={{ title: 'Trang chủ' }} />
      <Drawer.Screen name='Home' component={HomeScreen} />
      <Drawer.Screen name='Profile' component={ProfileScreen} />
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label='Help' onPress={() => Linking.openURL('https://mywebsite.com/help')} />

      <DrawerItem
        icon={({ size, color }) => <Feather name='globe' size={16} color='black' />}
        label='News'
        onPress={() => {
          props.navigation.navigate('Tabs', { screen: 'News' });
        }}
      />
      <DrawerItem
        icon={({ size, color }) => <Feather name='user' size={16} color='black' />}
        label='Account'
        onPress={() => {
          props.navigation.navigate('Tabs', { screen: 'Account' });
        }}
      />
    </DrawerContentScrollView>
  );
}

export default RootDrawer;
