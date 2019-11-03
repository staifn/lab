import React from "react";
import { View, Text, Animated, Platform } from "react-native";
import { HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT, HEADER_SCROLL_DISTANCE } from "../settings/layout";

const AnimatedHeader = ({ title, nativeScrollY }) => {
  if (nativeScrollY) {
    const headerTranslate = nativeScrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: "clamp" // so it wont go over the output range
    });
    const headerHeight = nativeScrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0]
    })
    const BGImageOpacity = nativeScrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.3, 0],
      extrapolate: "clamp"
    });

    // for animating the Y position
    const BGImageTranslate = nativeScrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp"
    });

    const titleScale = nativeScrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 0.8, 0.7],
      extrapolate: "clamp"
    });

    // for animating the Y position
    const titleTranslateY = nativeScrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [25, 35, 15],
      extrapolate: "clamp"
    });
    // const headerStyles = { transform: [{ scaleY:  headerHeight }] };
    const headerStyles = { transform: [{ translateY: headerTranslate }] };

    const headerBarStyles = {
      transform: [{ scale: titleScale }, { translateY: titleTranslateY }]
    };

    const BGImageStyles = {
      opacity: BGImageOpacity,
      transform: [{ translateY: BGImageTranslate }]
    };

    return (
      <View style={styles.header_container}>
        <Animated.View
          pointerEvents="none"
          style={[styles.header, headerStyles]}
        >
          <Animated.Image
            style={[styles.header_bg, BGImageStyles]}
            resizeMode={"cover"}
            source={require("../img/team-instinct.jpg")}
          />
        </Animated.View>

        <Animated.View style={[styles.header_bar, headerBarStyles]}>
          <Text style={styles.header_text}>{title}</Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.header_text}>{title}</Text>
      </View>
    </View>
  );
}

const styles = {
  header_container: {
    ...Platform.select({
      ios: {
        zIndex: 1 // only applied to iOS, for some reason the cards is laid on top of the header when scrolling
      }
    })
  },
  header: {
    position: "absolute",
    top: 0, // so it's at the very top of its container
    left: 0, // for 100% width
    right: 0, // for 100% width
    backgroundColor: "#B4A608",
    overflow: "hidden", // for containing the background image because this container is absolutely positioned
    height: HEADER_MAX_HEIGHT, // needed for absolutely positioned elements
    zIndex: 1 // so the header will be laid on top of the list
  },
  header_bar: {
    backgroundColor: "transparent",
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
  header_bg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: null, // important so we can apply resizeMode=cover
    height: HEADER_MAX_HEIGHT
  },
  header_text: {
    color: "#FFF",
    fontSize: 25,
    fontWeight: "bold"
  }
};

export default AnimatedHeader;
