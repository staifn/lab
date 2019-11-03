import React, { Component, useEffect, useState } from "react";
import { Animated, Easing, View, Text, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Header as navigationHeader } from 'react-navigation-stack';
import * as utils from '../utils'

import Header from "./Header";
const { height, width } = Dimensions.get("window");
const statusBarHeight = utils.getNavigationHeader();

export default ({ title, image, children, onClose, visible }) => {
  const [yTranslate] = useState(new Animated.Value(0));
  const negativeHeight = -height + statusBarHeight;
  const yPosition = yTranslate.interpolate({
    inputRange: [0, 1],
    outputRange: [0, negativeHeight],
  })

  useEffect(() => {
    if (visible) {
      Animated.spring(yTranslate, {
        toValue: 1,
        friction: 6,
     }).start();
   } else {
     Animated.timing(yTranslate, {
       toValue: 0,
       duration: 500,
     }).start();
   }
  }, [visible])

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: yPosition }] }]}>
      <Header title={title}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </Header>
      <ScrollView style={styles.modalContent}>{children}</ScrollView>
    </Animated.View>
  );
}

const styles = {
  container: {
    position: "absolute",
    zIndex: 2,
    height: height,
    width: width,
    bottom: -height,
    backgroundColor: "#fff"
  },
  modalContent: {
    flex: 1,
    marginBottom: statusBarHeight
  },
  closeText: {
    fontSize: 17,
    color: "#fff"
  }
};
