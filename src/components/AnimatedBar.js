import React, { Component, useState, useEffect } from "react";
import { Animated, View } from "react-native";

type Props = {};
export default ({ value, animate }) => {
  const [width] = useState(new Animated.Value(0))
  let interpolatedWidth = width.interpolate({
    inputRange: [0, 1],
    outputRange: [0, value],
  })

  useEffect(() => {
    if (animate) {
      width.setValue(0);
      Animated.timing(width, {
        toValue: 1,
        duration: 500,
        delay: 100
      }).start()
    }
  }, [animate]);

  let widthStyle = { width: interpolatedWidth };
  return <Animated.View style={[styles.bar, widthStyle]} />;
}

const styles = {
  bar: {
    height: 15,
    borderWidth: 1,
    borderColor: "#c72f06",
    backgroundColor: "#e75832"
  }
};
