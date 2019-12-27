/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text , SafeAreaView ,PermissionsAndroid , StyleSheet , Keyboard , Animated, Dimensions,TouchableWithoutFeedback } from 'react-native';
import Imei from 'react-native-imei';
import { getMacAddress } from 'react-native-device-info';
import PrimaryButton from '../components/PrimaryButton';
import StyledTextInput from '../components/StyledTextInput';
import mainStyles, { dynamicHeight } from '../styles/MainStyleSheet';
import StyledLogo from '../components/StyledLogo';
import { withNavigation } from 'react-navigation';
class LoginScreen extends Component {
  state = {
    imei: '',
    keyBoardShow: false,
    fadeInAnim : new Animated.Value(0)
  }
  constructor(props) {
    super(props);
    this.checkDevicePermissions();
    this._keyboardShowEventListner = Keyboard.addListener('keyboardDidShow', this._keyboardShowEventListner);
    this._keyboardHideEventListner = Keyboard.addListener('keyboardDidHide', this._keyboardHideEventListner);
    this.test = new Animated.ValueXY({ x: -1, y: 450 });
    console.log(this.props);
  }
  _keyboardShowEventListner = () => { this.setState({ keyBoardShow: true }); this.animateStart();}
  _keyboardHideEventListner = () => { this.setState({ keyBoardShow: false }); this.test = new Animated.ValueXY({x: -1 ,y: 450})}
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
  animateStart = () => {
    Animated.spring(this.test,{toValue : {x:Dimensions.get('screen').width / 50 ,y: Dimensions.get('screen').height / 60},speed: 1,bounciness: 8 }).start()
  }
  componentWillUnmount() {
    this._keyboardHideEventListner.remove();
    this._keyboardShowEventListner.remove();
  }
  render() {
    console.log(this.props);
      return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={[mainStyles.fullSizeContainer,mainStyles.flexBox1,mainStyles.bgPrimary]}>
            {!this.state.keyBoardShow &&
              <View style={[mainStyles.height25, mainStyles.alignItemsCenter, mainStyles.justifyContentCenter]}>
                <StyledLogo color={'white'}/>
              </View>
            }
            <View style={[dynamicHeight(mainStyles.height25.height), !this.state.keyBoardShow ? loginScreenStyles.loginArea : { backgroundColor: 'white' }, mainStyles.alignItemsCenter, mainStyles.justifyContentCenter]}>
              <View style={loginScreenStyles.titleArea}>
                {this.state.keyBoardShow &&
                   <Animated.View style={this.test.getLayout()}>
                    <StyledLogo color={'black'} />
                  </Animated.View>
                }
                <Text style={[mainStyles.textPrimary, loginScreenStyles.titleText]}>Login</Text>
              </View>
              <StyledTextInput
                //onTouchStart={this.animateStart()}
                isPassword={false}
                isRounded
                placeholder={'Type Email Address'}
              />
              <StyledTextInput
                isPassword={false}
                isRounded
                placeholder={'Type Email Address'}
              />
              <View style={loginScreenStyles.loginButtonContainer}>
                <PrimaryButton onPress={()=> this.props.navigation.replace('Welcome')} text={'Login'} marginTop={Dimensions.get('screen').height / 40} />
              </View>
            </View>
            </SafeAreaView>
          </TouchableWithoutFeedback>
      );
    }
}
const loginScreenStyles = StyleSheet.create({
  loginArea: {
    backgroundColor: 'white',
    borderTopStartRadius: Dimensions.get('screen').width / 1.2,  
  },
  titleText: {
    textAlign: 'center',
    fontSize: Dimensions.get('screen').height / 20
  },
  titleArea: {
    height: '30%',
  },
  loginButtonContainer: {
    height: '30%',
    justifyContent: 'flex-start',
  }
})

export default LoginScreen;
