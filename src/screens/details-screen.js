import React from 'react';
import { Button, View, Text } from 'react-native';

export default (props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Details Screen</Text>
    <Button
      title="Go to Home"
      onPress={() => props.navigation.navigate('Home')}
    />
  </View>
);
