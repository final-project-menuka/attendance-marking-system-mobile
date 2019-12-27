/* eslint-disable prettier/prettier */
import { StyleSheet, Dimensions } from 'react-native';
import { PrimaryColor } from '../constants/Values';

const styles = StyleSheet.create({
    fullSizeContainer: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
    },
    bgPrimary: {
        backgroundColor: PrimaryColor
    },
    height50: {
        minHeight: Dimensions.get('screen').height / 2
    },
    flexBox1: {
        flex: 1
    },
    alignItemsCenter: {
        alignItems:'center'
    },
    justifyContentCenter: {
        justifyContent:'center'
    },
    height25: {
        height:Dimensions.get('screen').height /4
    },
    logoImage: {
        height: Dimensions.get('screen').height / 10,
        width: Dimensions.get('screen').height /10
    },
    textPrimary: {
        color: PrimaryColor
    },
    bgWhite: {
        backgroundColor:'white'
    }
});

export const dynamicHeight = (style) =>{
    return {
        height: Dimensions.get('screen').height - style
    }
}
export default styles;