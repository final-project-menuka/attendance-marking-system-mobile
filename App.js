/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStore,combineReducers, applyMiddleware } from 'redux';
//import MainNavigator from './src/screens/LoginScreen';
import {createAppContainer } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { userReducer } from './src/store/reducers/user.reducer';
import { Provider } from 'react-redux';
import SignupScreen from './src/screens/SignupScreen';
import thunk from 'redux-thunk';
import ProfileScreen from './src/screens/ProfileScreen';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { AppIconSize_Md, PrimaryColor } from './src/constants/Values';
import { Dimensions } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { lectureReducer } from './src/store/reducers/lecture.reducer';

const store = createStore(combineReducers({ userReducer: userReducer , lectureReducer: lectureReducer }),applyMiddleware(thunk));

const DrawerNavigator = createDrawerNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon:()=><SimpleLineIcon name={'emotsmile'} color={PrimaryColor} size={AppIconSize_Md}/>
    }
  }
}, {
    drawerWidth: Dimensions.get('screen').width - 100,
    drawerType: 'front',
})

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
  Signup: {
    screen: SignupScreen,
    navigationOptions: {
      header:null
    }
  },
  Profile: {
    screen: DrawerNavigator,
    navigationOptions: {
      header: null
    }
  }
}, { initialRouteName: 'Welcome' });
const NavigetionStack = createAppContainer(MainNavigator);

function App() {
  // BackgroundTimer.runBackgroundTimer(() => {
  //   console.log('background');
  //   PushNotification.localNotification({
  //     message: 'Hello',
  //     vibrate: false,
      
  //   });
  // }, 5000);
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

export default gestureHandlerRootHOC(App);
