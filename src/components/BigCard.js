import React, { Component, useState, useEffect } from "react";
import { Animated, View, Text, Image } from "react-native";
import DataRow from "./DataRow";

type Props = {};
export default ({ image, title, data, animate }) => {
  const [opacity] = useState(new Animated.Value(0))
  const [titlePosition] = useState(new Animated.Value(0))
  const interpolatedOpacity = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  })
  const interpolatedTitlePosition = titlePosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 160],
  })
  const renderDataRows = data => {
    return data.map((item, index) => {
      return (
        <DataRow
          label={item.label}
          value={item.value}
          index={index}
          key={item.label}
          animateStatBars={animate}
        />
      );
    });
  };

  useEffect(() => {
    if (animate) {
      opacity.setValue(0);
      titlePosition.setValue(0);

      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          delay: 200
        }),
        Animated.spring(titlePosition, {
          toValue: 1,
          friction: 5,
          tension: 15
        })
      ]).start();
    }
  }, [animate])

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Animated.Image source={image} style={[styles.image, { opacity: interpolatedOpacity }]} resizeMode={"contain"} />
        <Animated.View style={{ position: 'absolute', transform: [{ translateY: interpolatedTitlePosition }] }}>
          <Text style={[styles.title, ]}>{title}</Text>
        </Animated.View>
      </View>
      {data && (
        <View style={styles.dataContainer}>{renderDataRows(data)}</View>
      )}
    </View>
  );
}



const styles = {
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold"
  },
  mainContainer: {
    flex: 2,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  image: {
    width: 200,
    height: 150
  },
  dataContainer: {
    flex: 2,
    flexDirection: "column",
    padding: 20
  }
};
