import React, { useState, useEffect } from 'react';
import { Animated, Button, View, Text, Easing } from 'react-native';
import MaskedView from '@react-native-community/masked-view';

import Test from '../test';

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
      title="Go to Reanimated Tuto 2 Screen"
      onPress={() => props.navigation.navigate('ReanimatedTuto2')}
    />
  <Button
    title="Go to Reanimated Tuto 1 Screen"
    onPress={() => props.navigation.navigate('ReanimatedTuto1')}
  />
  <Button
    title="Go to Image Zoom Screen"
    onPress={() => props.navigation.navigate('ImageZoom')}
  />
  <Button
    title="Go to draggable list"
    onPress={() => props.navigation.navigate('DraggableList')}
  />
  <Button
    title="Go to scrollable modal"
    onPress={() => props.navigation.navigate('ScrollableModal')}
  />
    <Button
      title="Go to Pan drag and drop simple"
      onPress={() => props.navigation.navigate('DragAndDropSimple')}
    />
    <Button
      title="Go to Pan drag and drop bin"
      onPress={() => props.navigation.navigate('DragAndDropBin')}
    />
    <Button
      title="Go to Pan drag and drop 2"
      onPress={() => props.navigation.navigate('DragAndDrop2')}
    />
    <Button
      title="Go to simple layout animation"
      onPress={() => props.navigation.navigate('SimpleLayoutAnimation')}
    />
  <Button
    title="Go to Pan drag and drop"
    onPress={() => props.navigation.navigate('DragAndDropTag')}
  />
  <Button
    title="Go to Pan Responder"
    onPress={() => props.navigation.navigate('PanResponder')}
  />
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
