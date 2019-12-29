/* eslint-disable prettier/prettier */
import { PixelRatio } from 'react-native';
export const AppFontSize = PixelRatio.get() > 2 ? 15 : 25; 
export const PrimaryColor = '#008000';
export const SecondaryColor = '#002db3';
export const AppIconSize_Md = PixelRatio.get() > 2 ? 20 : 30;
export const BASE_URL = 'http://10.0.3.2:8000/api/';