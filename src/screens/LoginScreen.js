/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text , SafeAreaView ,PermissionsAndroid , StyleSheet , Keyboard , TextInput } from 'react-native';
import Imei from 'react-native-imei';
import { getMacAddress } from 'react-native-device-info';
import PrimaryButton from '../components/PrimaryButton';
import mainStyles,{dynamicHeight} from '../styles/MainStyleSheet';
class LoginScreen extends Component {
  state = {
    imei: '',
    keyBoardShow:false
  }
  constructor(props) {
    super(props);
    this.checkDevicePermissions();
    this._keyboardShowEventListner = Keyboard.addListener('keyboardDidShow', this._keyboardShowEventListner);
    this._keyboardHideEventListner = Keyboard.addListener('keyboardDidHide', this._keyboardHideEventListner);
  }
  _keyboardShowEventListner = () => { this.setState({ keyBoardShow: true }); }
  _keyboardHideEventListner = () => this.setState({ keyBoardShow: false });
  getImeiNumber = () => {
    Imei.getImei().then(imei => {
      console.log(imei);
    }).catch(err => {
      console.log(err);
    });
    getMacAddress().then(mac => console.log(mac)).catch(e => console.log(e));
  }
  checkDevicePermissions = () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE).then(give => {
      if (!give)
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE);
    }).catch(e => {
      console.log(e);
    })
  }
    render() {
      return (
        <SafeAreaView style={[mainStyles.fullSizeContainer,mainStyles.flexBox1,mainStyles.bgPrimary]}>
          {!this.state.keyBoardShow &&
            <View style={mainStyles.height25}>
              <Text>fjdh</Text>
            </View>
          }
          <View style={[dynamicHeight(mainStyles.height25.height), loginScreenStyles.loginArea]}>
            
          </View>
        </SafeAreaView>
      );
    }
}
const loginScreenStyles = StyleSheet.create({
  loginArea: {
    //borderTopEndRadius: 30,
    backgroundColor: 'white',
    //borderTopRightRadius: 50,
    borderTopStartRadius: 500,
    //borderTopLeftRadius:300
    
  }
})

export default LoginScreen;
