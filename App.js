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
import { createDrawerNavigator , DrawerItems} from 'react-navigation-drawer';
import { userReducer } from './src/store/reducers/user.reducer';
import { Provider } from 'react-redux';
import SignupScreen from './src/screens/SignupScreen';
import thunk from 'redux-thunk';
import ProfileScreen from './src/screens/ProfileScreen';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { PrimaryColor, AppFontSize } from './src/constants/Values';
import { Dimensions } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { lectureReducer } from './src/store/reducers/lecture.reducer';
import { SafeAreaView, ScrollView } from 'react-native';
import StyledLogo from './src/components/StyledLogo';

const store = createStore(combineReducers({ userReducer: userReducer , lectureReducer: lectureReducer }),applyMiddleware(thunk));

const DrawerNavigator = createDrawerNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon:()=><SimpleLineIcon name={'emotsmile'} color={PrimaryColor} size={AppFontSize}/>
    }
  }
}, {
    drawerWidth: Dimensions.get('screen').width - 100,
    drawerType: 'front',
    contentOptions: {
      iconStyle: {
        width: '80%'
      },
      labelStyle: {
        fontSize: AppFontSize,
        width: '30%'
      }
    },
    contentComponent: props => (
      <SafeAreaView>
        <StyledLogo color={'black'} />
        <ScrollView>
          <DrawerItems {...props} />
        </ScrollView>
      </SafeAreaView>
    )
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
