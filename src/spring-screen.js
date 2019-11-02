import React, { useState, useEffect } from 'react';
import { Animated, Button, View, Text, Easing } from 'react-native';

import Test from './test';

export default (props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Spring Screen</Text>
    <Test />
    <Button
      title="Go back to home"
      onPress={() => props.navigation.goBack()}
    />
  </View>
);
