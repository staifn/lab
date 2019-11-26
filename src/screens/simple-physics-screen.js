import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";


const {
 event,
 Value,
 cond,
 eq,
 set,
 add
} = Animated;

class SimplePhysicsScreen extends React.Component {
  constructor(props) {
    super(props);

    const gestureX = new Value(0);
    const gestureY = new Value(0);
    const state = new Value(-1);

    this._onGestureEvent = event([
      {
        nativeEvent: {
          translationX: gestureX,
          translationY: gestureY,
          state: state,
        },
      },
    ]);

    function interaction(gestureTranslation, gestureState) {
      const start = new Value(0);
      const dragging = new Value(0);
      const position = new Value(0);

      return cond(
        eq(gestureState, State.ACTIVE),
        [
          cond(eq(dragging, 0), [set(dragging, 1), set(start, position)]),
          set(position, add(start, gestureTranslation)),
        ],
        [set(dragging, 0), position]
      );
    }

    this._transX = interaction(gestureX, state);
    this._transY = interaction(gestureY, state);
  }
  render() {
    return (
      <PanGestureHandler
        onGestureEvent={this._onGestureEvent}
        onHandlerStateChange={this._onGestureEvent}>
        <Animated.View
          style={[
            styles.box,
            {
              transform: [{ translateX: this._transX }, { translateY: this._transY }],
            },
          ]}
        />
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'green',
  }
})

export default SimplePhysicsScreen;
