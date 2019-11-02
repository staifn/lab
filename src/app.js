import React from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './home-screen';
import DetailsScreen from './details-screen';
import SpringScreen from './spring-screen';
import GoogleChromeTabsScreen from './google-chrome-tabs-screen';
import RealWorldAnimationsScreen from './real-world-animations-screen';


const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Spring: SpringScreen,
    GoogleChromeTabs: GoogleChromeTabsScreen,
    RealWorldAnimations: RealWorldAnimationsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
