/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { SafeAreaView, TouchableWithoutFeedback, View , Text , StyleSheet , Keyboard, Dimensions , Animated } from 'react-native';
import StyledLogo from '../components/StyledLogo';
import MainStyleSheet ,{dynamicHeight} from '../styles/MainStyleSheet';
import { PrimaryColor, AppFontSize } from '../constants/Values';
import StyledTextInput from '../components/StyledTextInput';
import SecondaryButton from '../components/SecondaryButton';
import Imei from 'react-native-imei';
import Toast from 'react-native-simple-toast';
import { signUp } from '../services/user.service';
class SignupScreen extends Component{
    state={isKeyboardShow:false,email:null,studentId:null,password:null,imei:null}
    constructor(props) {
        super(props);
        this.keyboardShowEventHandler = Keyboard.addListener('keyboardDidShow', this.keyboardShowEventHandler);
        this.keyboardHideEventHandler = Keyboard.addListener('keyboardDidHide', this.keyboardHideEventHandler);
        this.logoOpacityAnimation = new Animated.Value(0);
        this.studentIdOnchangeHandler = this.studentIdOnchangeHandler.bind(this);
        this.passwordOnchangeHandler = this.passwordOnchangeHandler.bind(this);
        this.emailOnchangeHandler = this.emailOnchangeHandler.bind(this);
    }
    componentDidMount() {
        Imei.getImei().then(imei => this.setState({ imei: imei[0] })).catch(_ => Toast.show('We Can not get your device Imei Number Please Give Permissions',4000));
    }
    keyboardHideEventHandler = () => { this.setState({ isKeyboardShow: false }); this.logoOpacityAnimation = new Animated.Value(0);}
    keyboardShowEventHandler = () => { this.setState({ isKeyboardShow: true }); this.animationStart();}
    componentWillUnmount() {
        this.keyboardHideEventHandler.remove();
        this.keyboardShowEventHandler.remove();
    }
    animationStart = () => {
        Animated.timing(this.logoOpacityAnimation, { toValue: 1, duration: 3000 }).start();
    }
    emailOnchangeHandler(input) {
        this.setState({ email: input });
    }
    passwordOnchangeHandler(input) {
        this.setState({ password: input });
    }
    studentIdOnchangeHandler(input) {
        this.setState({ studentId: input });
    }
    signupButtonHandler = () => {
        if (this.state.email !== null && this.state.password !== null && this.state.imei !== null && this.state.studentId !== null) {
            signUp(this.state.studentId, this.state.email, this.state.password, this.state.imei).then(_ => {
                this.props.navigation.goBack();
            }).catch(err => {
                Toast.show(err.message, 5000);
            })
        }
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={[MainStyleSheet.fullSizeContainer,MainStyleSheet.flexBox1]}>
                    {!this.state.isKeyboardShow &&
                        <View style={[MainStyleSheet.height25,MainStyleSheet.alignItemsCenter,MainStyleSheet.justifyContentCenter]}>
                            <StyledLogo color={PrimaryColor}/>
                        </View>
                    }
                    <View style={[dynamicHeight(MainStyleSheet.height25.height), MainStyleSheet.alignItemsCenter]}>
                        {this.state.isKeyboardShow &&
                            <Animated.View style={[{ opacity: this.logoOpacityAnimation},signupScreenStyles.fadingAnimatedLogoArea]}>
                                <StyledLogo color={PrimaryColor}/>
                            </Animated.View>
                        }
                        <View style={signupScreenStyles.titleArea}>
                            <Text style={signupScreenStyles.titleStyles}>Let's Get Started</Text>
                        </View>
                        <View style={signupScreenStyles.loginTextFieldsArea}>
                            <StyledTextInput
                                isRounded={true}
                                email
                                KeyboardType={'email-address'}
                                placeholder={'Type Your Email Address'}
                                transparent={true}
                                onChangeText={this.emailOnchangeHandler}
                            />
                            <StyledTextInput
                                isRounded={true}
                                KeyboardType={'email-address'}
                                placeholder={'Type Your Student ID Number'}
                                transparent
                                onChangeText={this.studentIdOnchangeHandler}
                            />
                            <StyledTextInput
                                isRounded={true}
                                isPassword
                                KeyboardType={'email-address'}
                                placeholder={'Type Your Password'}
                                transparent
                                onChangeText={this.passwordOnchangeHandler}
                            />
                        </View>
                        <View style={signupScreenStyles.loginButtonArea}>
                            <SecondaryButton
                                text={'Signup'}
                                marginTop={Dimensions.get('screen').height / 100}
                                onPress={this.signupButtonHandler}
                            />
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }
}
const signupScreenStyles = StyleSheet.create({
    titleStyles: {
        fontSize: AppFontSize,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 15,
        textAlignVertical:'center'
    },
    titleArea: {
        height: Dimensions.get('screen').height / 6,
        justifyContent: 'flex-end',
        width: Dimensions.get('screen').width,
        alignItems: 'center'
    },
    loginTextFieldsArea: {
        height: '30%',
        justifyContent: 'center'
    },
    loginButtonArea: {
        height: '40%'
    },
    fadingAnimatedLogoArea: {
        height: '10%',
        justifyContent: 'flex-start'
    }
})
export default SignupScreen;