import { Dimensions, Platform, StatusBar } from 'react-native';
import { Header } from 'react-navigation-stack';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');

let isIPhoneX = false;

if (Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS) {
    isIPhoneX = W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT || W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT;
}

export function getStatusBarHeight(skipAndroid) {
  return Platform.select({
      ios: isIPhoneX ? 44 : 20,
      android: skipAndroid ? 0 : StatusBar.currentHeight,
      default: 0
  })
}

export function getNavigationHeader() {
  return Platform.select({
    default: Header.HEIGHT,
    ios: isIPhoneX ? Header.HEIGHT + 24 : Header.HEIGHT,
  })
}

export const getRandomInt = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};
