// Components/Test.js

import React, { useState, useEffect } from 'react'
import { Animated, StyleSheet, View, Easing } from 'react-native'

const Test = () => {

  const [topPosition] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.spring(topPosition, {
      toValue: 100,
      speed: 1,
      bounciness: 19
    }).start()
  }, [])
  return (
    <View style={styles.main_container}>
      <Animated.View style={[styles.animation_view, { top: topPosition }]} />
    </View>
  )
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  animation_view: {
    backgroundColor: 'red',
    width: 100,
    height: 100
  }
})

export default Test
