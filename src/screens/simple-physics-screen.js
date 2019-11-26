import React, { Component } from 'react';
import { StyleSheet, View, NativeModules, Text } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Animated from 'react-native-reanimated';

const { UIManager } = NativeModules;

const {
  event,
  Value,
  Clock,
  lessThan,
  greaterThan,
  divide,
  diff,
  abs,
  startClock,
  stopClock,
  cond,
  add,
  multiply,
  eq,
  set,
} = Animated;

const VELOCITY_THRESHOLD = 0.5;
const POSITION_THRESHOLD = 0.5;
const VELOCITY = 50;

function force(dt, position, velocity) {
  return set(
    velocity,
    cond(
      lessThan(position, -POSITION_THRESHOLD),
      VELOCITY,
      cond(greaterThan(position, POSITION_THRESHOLD), -VELOCITY, 0)
    )
  );
}

function interaction(gestureTranslation, gestureState) {
  const dragging = new Value(0);
  const start = new Value(0);
  const position = new Value(0);
  const velocity = new Value(0);

  const clock = new Clock();
  const dt = divide(diff(clock), 1000);

  return cond(
    eq(gestureState, State.ACTIVE),
    [
      cond(dragging, 0, [set(dragging, 1), set(start, position)]),
      stopClock(clock),
      dt,
      set(position, add(start, gestureTranslation)),
    ],
    [
      set(dragging, 0),
      startClock(clock),
      force(dt, position, velocity),
      cond(lessThan(abs(velocity), VELOCITY_THRESHOLD), stopClock(clock)),
      set(position, add(position, multiply(velocity, dt))),
    ]
  );
}

class Box extends Component {
  constructor(props) {
    super(props);

    const gestureX = new Value(0);
    const state = new Value(-1);

    this._onGestureEvent = event([
      {
        nativeEvent: {
          translationX: gestureX,
          state: state,
        },
      },
    ]);

    this._transX = interaction(gestureX, state);
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
              transform: [{ translateX: this._transX }],
            },
          ]}
        />
      </PanGestureHandler>
    );
  }
}

export default class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Box />
      </View>
    );
  }
}

const BOX_SIZE = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    alignSelf: 'center',
    backgroundColor: 'teal',
    margin: BOX_SIZE / 2,
  },
});
