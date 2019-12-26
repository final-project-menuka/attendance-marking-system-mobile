/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createStore } from 'redux';
import MainNavigator from './src/screens/LoginScreen';

function App() {
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
    <MainNavigator/>
  );
}

export default App;
