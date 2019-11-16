import React, { Component } from "react";
import { Animated, Easing, View, Text, Image, TouchableWithoutFeedback, PanResponder } from "react-native";
import IconButton from "./IconButton";

class Card extends Component {
  constructor(props) {
    super(props);

    this.pan = new Animated.ValueXY(); // for animating the card's X and Y position
    this.scaleValue = new Animated.Value(0); // for scaling the card while the user drags it
    this.opacityValue = new Animated.Value(2); // for making the card translucent while the user drags it

    this.cardScale = this.scaleValue.interpolate({
      inputRange: [0, 0.5, 1], // animate to 0.5 while user is dragging, then to 1 or 0 once they let go
      outputRange: [1, 0.5, 1]
    });

    this.cardOpacity = this.opacityValue.interpolate({
      inputRange: [0, 1, 2], // default value is 2, so we'll animate backwards
      outputRange: [0, 0.5, 1]
    });
  }
  componentWillMount() {
    const {
      toggleDropArea,
      isDropArea,
      targetDropArea,
      removePokemon
    } = this.props;

    // add the following:
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        Animated.parallel([
          Animated.timing(this.scaleValue, {
            toValue: 0.5, // scale it down to half its original size
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true
          }),
          Animated.timing(this.opacityValue, {
            toValue: 1,
            duration: 250,
            easing: Easing.linear,
            useNativeDriver: true
          })
        ]).start();

        toggleDropArea(true, item); // supplied from the src/screens/Main.js down to src/components/CardList and then here. Accepts the drop area's visibility and the item to exclude from being hidden
      },
      onPanResponderMove: (e, gesture) => {
        Animated.event([null, { dx: this.pan.x, dy: this.pan.y }])(e, gesture);
        if (isDropArea(gesture)) {
          targetDropArea(true);
        } else {
          targetDropArea(false);
        }
      },
      onPanResponderRelease: (e, gesture) => {
        toggleDropArea(false, item); // hide the drop area and show the hidden cards

        if (isDropArea(gesture)) {
          Animated.timing(this.opacityValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }).start(() => {});

          removePokemon(item); // remove the pokemon from the state
        } else {
          // next: add code for animating the card back to its original position
          Animated.parallel([
            Animated.timing(this.scaleValue, {
              toValue: 1,
              duration: 250,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.timing(this.opacityValue, {
              toValue: 2,
              duration: 250,
              easing: Easing.linear,
              useNativeDriver: true
            }),
            Animated.spring(this.pan, {
              toValue: { x: 0, y: 0 },
              friction: 5,
              useNativeDriver: true
            })
          ]).start();
        }
      }
    });
  }

render() {
  const {
    item,
    cardAction,
    viewAction,
    bookmarkAction,
    shareAction
  } = this.props;
    let [translateX, translateY] = [this.pan.x, this.pan.y];
    let transformStyle = { 
      ...styles.card,
      opacity: item.isVisible ? this.cardOpacity : 0, 
      transform: [{ translateX }, { translateY }, { scale: this.cardScale }] };

    return (
      <TouchableWithoutFeedback
        onPress={() => console.log('press')}
      >
        <Animated.View style={transformStyle}  {...this.panResponder.panHandlers}>
          <Image source={item.pic} style={styles.thumbnail} />
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.icons}>
            <IconButton
              icon="search"
              onPress={() => {
                viewAction(item.name, item.full_pic);
              }}
              data={item}
            />
            <IconButton icon="bookmark" onPress={bookmarkAction} data={item} />
            <IconButton icon="share" onPress={shareAction} data={item} />
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
};

const styles = {
  card: {
    width: 120,
    height: 140,
    backgroundColor: "#fafbfc",
    padding: 10,
    margin: 10,
    alignItems: "center"
  },
  name: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold"
  },
  thumbnail: {
    width: 75,
    height: 75
  },
  icons: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between"
  }
};

export default Card;
