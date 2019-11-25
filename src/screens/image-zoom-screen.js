import React, { useEffect, useState } from 'react';
import { Animated, Button, Image, View, LayoutAnimation } from 'react-native';

function ImageZoomScreen() {
  const scaleTransition = new Animated.Value(1);
  const positionYTransition = new Animated.Value(0);
  const positionXTransition = new Animated.Value(0);
  const animation = new Animated.Value(0);
  const [justifyContent, setJustifyContent] = useState('flex-start');
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleTransition, {
        toValue: 8,
      }),
      Animated.timing(positionYTransition, {
        toValue: 41,
      }),
      Animated.timing(positionXTransition, {
        toValue: 22.7,
      })
    ]).start();
  }, [])


  return (
    <View>
      <Animated.Image
        style={{
          width: 50,
          resizeMode: 'contain',
          height: 30,
          transform: [
            { scale: scaleTransition },
            { translateY: positionYTransition },
            { translateX: positionXTransition }
          ]
        }}
        source={require('../img/team-instinct.jpg')}/>
    </View>
)
}

export default ImageZoomScreen;
