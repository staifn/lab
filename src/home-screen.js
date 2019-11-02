import React, { useState, useEffect } from 'react';
import { Animated, Button, View, Text, Easing } from 'react-native';
import MaskedView from '@react-native-community/masked-view';

import Test from './test';

export default (props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <MaskedView
        style={{flex: 1, flexDirection: 'row', height: '100%'}}
        maskElement={
          <View
            style={{
              // Transparent background because mask is based off alpha channel.
              backgroundColor: 'transparent',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 60,
                color: 'black',
                fontWeight: 'bold',
              }}>
              Basic Mask
            </Text>
          </View>
        }>
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <View style={{flex: 1, height: '50%', backgroundColor: '#324376'}} />
        <View style={{flex: 1, height: '100%', backgroundColor: '#F5DD90'}} />
        <View style={{flex: 1, height: '100%', backgroundColor: '#F76C5E'}} />
        <View style={{flex: 1, height: '100%', backgroundColor: '#e1e1e1'}} />
      </MaskedView>
    <Button
      title="Go to Real world animations"
      onPress={() => props.navigation.navigate('RealWorldAnimations')}
    />
  <Button
    title="Go to Google Chrome Tabs"
    onPress={() => props.navigation.navigate('GoogleChromeTabs')}
  />
    <Button
      title="Go to Details"
      onPress={() => props.navigation.navigate('Details')}
    />
    <Button
      title="Go to Spring"
      onPress={() => props.navigation.navigate('Spring')}
    />
  </View>
);
