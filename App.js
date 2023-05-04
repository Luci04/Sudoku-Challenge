/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SudokuBox from './components/SudokuBox';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import GameScreen from './screens/GameScreen';
import CalenderScreen from './screens/CalenderScreen';
import SettingScreen from './screens/SettingScreen';
import IoniCons from 'react-native-vector-icons/Ionicons'
import CustomTabBarButton from './components/CustomTabBarButton';
import PushNotification from "react-native-push-notification";
import HomeScreen from './screens/HomeScreen';
import StackNavigator from './components/StackNavigator';


const Tab = createBottomTabNavigator();

function App() {

  PushNotification.createChannel(
    {
      channelId: "test-Channel",
      channelName: "Test Channel"
    }
  )

  return (
    <NavigationContainer>
      <Provider store={store} >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: styles.tabBarStyle,
            tabBarActiveTintColor: "#509abd",
            tabBarInactiveTintColor: 'grey',
            tabBarIcon: ({ color, size, focused }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'ios-home-sharp' : 'ios-home-outline'
              } else if (route.name === 'Calender') {
                iconName = focused ? 'ios-calendar-sharp' : 'ios-calendar-outline'
              } else if (route.name === 'Setting') {
                iconName = focused ? 'ios-settings-sharp' : 'ios-settings-outline'
              }

              return <IoniCons name={iconName} color={color} size={22} />
            }
          })}
        >
          <Tab.Screen name='Home' component={StackNavigator}
            options={{
              tabBarButton: props => <CustomTabBarButton {...props} />
            }}
          />
          <Tab.Screen name='Calender' component={CalenderScreen}
            options={{
              tabBarButton: props => <CustomTabBarButton {...props} />
            }} />
          <Tab.Screen name='Setting' component={SettingScreen}
            options={{
              tabBarButton: props => <CustomTabBarButton {...props} />
            }}
          />
        </Tab.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: 'transparent',
    elevation: 0,
    borderTopWidth: 0,
    bottom: 15,
    left: 10,
    right: 10,
    height: 58,
    borderRadius: 15,
  }
});

export default App;
