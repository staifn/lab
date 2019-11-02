import React, { useState, useEffect } from 'react';
import { Animated, Button, View, Text, Easing } from 'react-native';

import Test from './test';

export default (props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home Screen</Text>
    <Test />
    <Button
      title="Go to Details"
      onPress={() => props.navigation.navigate('Details')}
    />
  </View>
);
