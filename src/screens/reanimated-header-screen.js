import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
const {
  event,
  Value,
  interpolate,
  extrapolate,
  diffClamp,
} = Animated;

const images = [
  {id: 1, uri: require('../assets/beach.jpeg')},
  {id: 2, uri: require('../assets/beach2.jpeg')},
  {id: 3, uri: require('../assets/beach3.jpeg')},
  {id: 4, uri: require('../assets/beach4.jpeg')},
  {id: 5, uri: require('../assets/beach5.jpeg')},
]
const HEADER_HEIGHT = 70;
class App extends React.PureComponent {
  componentWillMount() {
    this.setState({
      hello: true
    })
  }
  render() {
    const scrollY = new Value(0);
    const headerDiffClamp = diffClamp(scrollY, 0, HEADER_HEIGHT);
    const headerY = interpolate(headerDiffClamp, {
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp'

    })
    console.log('scrollY', scrollY)
    return (
      <View style={{ flex: 1 }}>
        <Animated.View style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: HEADER_HEIGHT,
          backgroundColor: 'grey',
          zIndex: 1,
          elevation: 1000,
          transform: [
            { translateY: headerY }
          ]
        }} />
        <Animated.ScrollView
        bounces={false}
          scrollEventThrottle={16}
          onScroll={event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY
                }
              }
            }
          ])}
        >
          {images.map(image => (
            <View
              style={{ height: 400, margin: 20 }}
              key={image.id}>
              <Image
                source={image.uri}
                style={{ flex: 1, height: null, width: null }}
              />
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    )
  }
}

export default App;
