/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStore,combineReducers } from 'redux';
//import MainNavigator from './src/screens/LoginScreen';
import {createAppContainer } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { reducerName } from './src/store/reducers/user.reducer';
import { Provider } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification from 'react-native-push-notification';

const store = createStore(combineReducers({ userReducer: reducerName }));

const MainNavigator = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
            header : null
        }
    },
    Login: {
        screen: LoginScreen,
        navigationOptions: {
            header: null,
        }
    },
}, { initialRouteName: 'Welcome' });
const NavigetionStack = createAppContainer(MainNavigator);

function App() {
  BackgroundTimer.runBackgroundTimer(() => {
    console.log('background');
    PushNotification.localNotification({
      message: 'Hello',
      vibrate: false,
      
    });
  }, 5000);
  // const [myMacAddress, setMyMacAddress] = React.useState(0);
  // const press = () => {
  //   getMacAddress()
  //     .then(macAddress => {
  //       setMyMacAddress(macAddress);
  //     })
  //     .catch(err => {
  //       alert(err.message);
  //     });
  // };
  // eslint-disable-next-line prettier/prettier
  return (
    <Provider store={store}>
          <NavigetionStack/>
    </Provider>
  );
}

export default App;
