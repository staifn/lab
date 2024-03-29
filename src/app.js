import React from 'react';
import { Animated, Easing, Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeScreen from './screens/home-screen';
import DetailsScreen from './screens/details-screen';
import SpringScreen from './screens/spring-screen';
import GoogleChromeTabsScreen from './screens/google-chrome-tabs-screen';
import RealWorldAnimationsScreen from './screens/real-world-animations-screen';
import PanResponderScreen from './screens/pan-responder-screen';
import ShareScreen from './screens/share-screen';
import DragAndDropTagScreen from './screens/drag-and-drop-tag-screen';
import DragAndDrop2Screen from './screens/drag-and-drop-2-screen';
import SimpleLayoutAnimationScreen from './screens/simple-layout-animation-screen';
import DragAndDropBinScreen from './screens/drag-and-drop-bin-screen';
import DragAndDropSimpleScreen from './screens/drag-and-drop-simple-screen';
import ScrollableModalScreen from './screens/scrollable-modal-screen';
import DraggableListScreen from './screens/draggable-list-screen';
import ImageZoomScreen from './screens/image-zoom-screen';
import ReanimatedTuto1Screen from './screens/reanimated-tuto1-screen';
import ReanimatedTuto2Screen from './screens/reanimated-tuto2-screen';
import SimplePhysicsScreen from './screens/simple-physics-screen';
import ReanimatedHeaderScreen from './screens/reanimated-header-screen';

const transitionConfig = () => {
      return {
        transitionSpec: {
          duration: 200, // how long the transition will take
          // easing: Easing.bounce, // easing function to use (https://facebook.github.io/react-native/docs/easing.html)
          timing: Animated.timing, // the type of animation to use (timing, spring, decay)
          useNativeDriver: true // delegate all the animation related work to the native layer
        },
        screenInterpolator: sceneProps => {
          const { layout, position, scene } = sceneProps;
          const thisSceneIndex = scene.index; // the index of the current screen
          const width = layout.initWidth; // the width of the current screen
          const height = layout.initHeight; // the width of the current screen
          console.log('position', position)
          const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex],
            outputRange: [width, 0],
            extrapolate: "clamp" // clamp so it doesn't go beyond the outputRange. Without this, you'll see a few black portions in the screen while navigating
          });
          const translateY = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex],
            outputRange: [height, 0],
            extrapolate: "clamp" // clamp so it doesn't go beyond the outputRange. Without this, you'll see a few black portions in the screen while navigating
          });
          const scale = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex],
            outputRange: [0, 1],
            extrapolate: "clamp" // clamp so it doesn't go beyond the outputRange. Without this, you'll see a few black portions in the screen while navigating
          });

          const opacity = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
            outputRange: [0, 0.2, 1],
            extrapolate: "clamp"
          });
          return { transform: [{ translateX }, { scale }, { translateY }] }; // return the animated styles to be applied to the current view upon navigation
        }
      };
    };

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
    Spring: SpringScreen,
    GoogleChromeTabs: GoogleChromeTabsScreen,
    RealWorldAnimations: RealWorldAnimationsScreen,
    PanResponder: PanResponderScreen,
    Share: ShareScreen,
    DragAndDropTag: DragAndDropTagScreen,
    SimpleLayoutAnimation: SimpleLayoutAnimationScreen,
    DragAndDrop2: DragAndDrop2Screen,
    DragAndDropBin: DragAndDropBinScreen,
    DragAndDropSimple: DragAndDropSimpleScreen,
    ScrollableModal: ScrollableModalScreen,
    DraggableList: DraggableListScreen,
    ImageZoom: ImageZoomScreen,
    ReanimatedTuto1: ReanimatedTuto1Screen,
    ReanimatedTuto2: ReanimatedTuto2Screen,
    SimplePhysics: SimplePhysicsScreen,
    ReanimatedHeader: ReanimatedHeaderScreen,
  },
  {
    initialRouteName: 'ReanimatedHeader',
    transitionConfig
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
