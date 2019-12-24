/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, Text} from 'react-native';

import {getMacAddress} from 'react-native-device-info';

function App() {
  const [myMacAddress, setMyMacAddress] = React.useState(0);
  const press = () => {
    getMacAddress()
      .then(macAddress => {
        setMyMacAddress(macAddress);
      })
      .catch(err => {
        alert(err.message);
      });
  };
  return (
    <SafeAreaView>
      <Text onPress={press}>{myMacAddress}</Text>
    </SafeAreaView>
  );
}

export default App;
