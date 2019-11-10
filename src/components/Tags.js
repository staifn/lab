// @flow

import React, { PureComponent, useEffect, useState, useRef } from 'react';
import {
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Tag from './Tag';
import type { TagObject, GestureState } from '../types';
import { isPointWithinArea, moveArrayElement } from '../helpers';

type Props = {
  // Array of tag titles
  tags: string[],
  // Tag swapping animation duration in ms
  animationDuration: number,
  // Passes onPressAddNewTag callback down to TagsArea component
  onPressAddNewTag: () => void,
};

type State = {
  tags: TagObject[],
  // Used to temporarily disable tag swapping while moving tag to the new position
  // to avoid unwanted tag swaps while the animation is happening
  dndEnabled: boolean,
};

export default (props) => {
  const animationDuration = 100;

  // static defaultProps = {
  //   animationDuration: 200
  // };
  const [tags, setTags] = useState([...new Set(props.tags)]       // remove duplicates
    .map((title: string) => ({ title })));
    const [dndEnabled, setDndEnabled] = useState(true);
  const [tagBeingDragged, setTagBeingDragged] = useState();
  const tagBeingDraggedRef = useRef('');
  const panResponder = PanResponder.create({
    // Handle drag gesture
    onMoveShouldSetPanResponder: (_, gestureState: GestureState) => onMoveShouldSetPanResponder(gestureState),
    onPanResponderGrant: (_, gestureState: GestureState) => onPanResponderGrant(),
    onPanResponderMove: (_, gestureState: GestureState) => onPanResponderMove(gestureState),
    // Handle drop gesture
    onPanResponderRelease: (_, gestureState: GestureState) => onPanResponderEnd(),
    onPanResponderTerminate: (_, gestureState: GestureState) => onPanResponderEnd(),
  });
  useEffect(() => {
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: animationDuration
    });
  })
  useEffect(() => {
    tagBeingDraggedRef.current = tagBeingDragged;
  }, [tagBeingDragged])
  // Find out if we need to start handling tag dragging gesture
const onMoveShouldSetPanResponder = (gestureState: GestureState): boolean => {
  const { dx, dy, moveX, moveY, numberActiveTouches } = gestureState;

  // Do not set pan responder if a multi touch gesture is occurring
  if (numberActiveTouches !== 1) {
    return false;
  }

  // or if there was no movement since the gesture started
  if (dx === 0 && dy === 0) {
    return false;
  }

  // Find the tag below user's finger at given coordinates
  const tag = findTagAtCoordinates(moveX, moveY);
  if (tag) {
    // assign it to `tagBeingDragged` while dragging
    tagBeingDraggedRef.current = tag;
    // and tell PanResponder to start handling the gesture by calling `onPanResponderMove`
    return true;
  }

  return false;
};

// Called when gesture is granted
const onPanResponderGrant = (): void => {
  updateTagState(tagBeingDraggedRef.current, { isBeingDragged: true });
};

// Handle drag gesture
const onPanResponderMove = (gestureState: GestureState): void => {
  const { moveX, moveY } = gestureState;
  // Do nothing if dnd is disabled
  if (!dndEnabled) {
    return;
  }
  // Find the tag we're dragging the current tag over
  const draggedOverTag = findTagAtCoordinates(moveX, moveY, tagBeingDraggedRef.current);
  if (draggedOverTag) {
    swapTags(tagBeingDraggedRef.current, draggedOverTag);
  }
};

// Called after gesture ends
const onPanResponderEnd = (): void => {
  updateTagState(tagBeingDraggedRef.current, { isBeingDragged: false });
  setTagBeingDragged(undefined);
};

// Enable dnd back after the animation is over
const enableDndAfterAnimating = (): void => {
  setTimeout(enableDnd, animationDuration)
};

const enableDnd = (): void => {
  setDndEnabled(true);
};

// Find the tag at given coordinates
const findTagAtCoordinates = (x: number, y: number, exceptTag?: TagObject): ?TagObject => {
  return tags.find((tag) =>
    tag.tlX && tag.tlY && tag.brX && tag.brY
    && isPointWithinArea(x, y, tag.tlX, tag.tlY, tag.brX, tag.brY)
    && (!exceptTag || exceptTag.title !== tag.title)
  );
};

  const removeTag = (tag: TagObject): void => {
    const index = tags.findIndex(({ title }) => title === tag.title);
    setTags([
      // Remove the tag
      ...tags.slice(0, index),
      ...tags.slice(index + 1),
    ])
  };
  // Swap two tags
const swapTags = (draggedTag: TagObject, anotherTag: TagObject): void => {
  const draggedTagIndex = tags.findIndex(({ title }) => title === draggedTag.title);
  const anotherTagIndex = tags.findIndex(({ title }) => title === anotherTag.title);
  setTags( moveArrayElement(
    tags,
    draggedTagIndex,
    anotherTagIndex,
  ));
  setDndEnabled(false);
  enableDndAfterAnimating();
};

  // Update the tag in the state with given props
const updateTagState = (tag: TagObject, props: Object): void => {
  const index = tags.findIndex(({ title }) => title === tag.title);
  setTags([
    ...tags.slice(0, index),
    {
      ...tags[index],
      ...props,
    },
    ...tags.slice(index + 1),
  ]);
};

// Update tag coordinates in the state
const onRenderTag = (tag: TagObject,
               screenX: number,
               screenY: number,
               width: number,
               height: number): void => {
  updateTagState(tag, {
    tlX: screenX,
    tlY: screenY,
    brX: screenX + width,
    brY: screenY + height,
  });
};
    return (
      <View
        style={styles.container}
        {...panResponder.panHandlers}

      >
      <View style={styles.tags}>

        {tags.map(tag =>
          <Tag
            key={tag.title}
            tag={tag}
            onPress={(removeTag)}
            onRender={onRenderTag}
          />
        )}

        <Text
          style={styles.add}
          onPress={props.onPressAddNewTag}
        >
          Add new
        </Text>

      </View>

      </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: 'rgba(255,255,255,0.5)',
    borderRadius: 5,
    borderWidth: 2,
    paddingBottom: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  add: {
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    paddingHorizontal: 5,
    paddingVertical: 5,
    textDecorationLine: 'underline',
  },
});
