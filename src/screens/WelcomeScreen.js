/* eslint-disable prettier/prettier */
import React from 'react'
import { SafeAreaView, Text , Animated, Dimensions , View } from 'react-native';
import MainStyleSheet,{dynamicHeight} from '../styles/MainStyleSheet';
import StyledLogo from '../components/StyledLogo';
import PrimaryButton from '../components/PrimaryButton';
import { PrimaryColor } from '../constants/Values';
import SecondaryButton from '../components/SecondaryButton';
let fadeInAnimate = new Animated.Value(0);
let movingAnimation = new Animated.ValueXY({ x: Dimensions.get('screen').width /2, y: Dimensions.get('screen').height / 2 });
const WelcomeScreen = props => {
    const [test, setTest] = React.useState('first state');
    setTimeout(() => {
        setTest('test Value Set');
    }, 5000);
    Animated.timing(fadeInAnimate, { toValue: 1, duration: 6000 }).start();
    Animated.spring(movingAnimation, { toValue: { x: Dimensions.get('screen').width/ 250, y: Dimensions.get('screen').height/ 100 } }).start();
    return (
        <SafeAreaView style={[MainStyleSheet.flexBox1, MainStyleSheet.fullSizeContainer, MainStyleSheet.bgWhite]}>
            <Animated.View style={[dynamicHeight(MainStyleSheet.height25.height),MainStyleSheet.justifyContentCenter, MainStyleSheet.alignItemsCenter, { opacity: fadeInAnimate }]}>
                <StyledLogo color={PrimaryColor}/>
            </Animated.View>
            <View style={[MainStyleSheet.alignItemsCenter,MainStyleSheet.justifyContentCenter]}>
                <PrimaryButton onPress={()=> props.navigation.navigate('Login')} marginTop={Dimensions.get('screen').height / 50} text={'Login'} />
                <SecondaryButton marginTop={Dimensions.get('screen').height / 90} text={'Signup'}/>
            </View>
        </SafeAreaView>
    );
}
export default WelcomeScreen;