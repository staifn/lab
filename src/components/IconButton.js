import React, { Component } from "react";
import { Animated, Easing, View, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const icon_color = "#586069";
const icon_size = 15;

export default ({ icon, onPress, data }) => {
  let rotateValue = new Animated.Value(0);
  const iconRotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
  const transformStyle = { transform: [{ rotate: iconRotate }] }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress(data);
      }}
      onPressIn={() => {
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true
        }).start()
      }}
      onPressOut={() => {
        Animated.timing(rotateValue, {
          toValue: 0,
          duration: 250,
          easing: Easing.linear,
          useNativeDriver: true
        }).start()
      }}
    >
      <Animated.View style={transformStyle}>
        <Icon
          name={icon}
          style={styles.icon}
          size={icon_size}
          color={icon_color}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = {
  icon: {
    paddingLeft: 5,
    paddingRight: 5
  }
};
