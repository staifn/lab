import React, {Component} from 'react';
import {LayoutAnimation, View, Text, TouchableOpacity, Platform, UIManager} from 'react-native';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
class AnimatedCollapsible extends React.Component {
  state = {expanded: false};
  render() {
    return (
      <View style={{overflow: 'hidden'}}>
        <TouchableOpacity
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.create(
                200,
                LayoutAnimation.Types.linear,
                LayoutAnimation.Properties.scaleXY,
              ),
            );
            this.setState({expanded: !this.state.expanded});
          }}>
          <Text>
            Press me to {this.state.expanded ? 'collapse' : 'expand'}!
          </Text>
        </TouchableOpacity>
        {this.state.expanded && <Text>I disappear sometimes!</Text>}
      </View>
    );
  }
}

export default AnimatedCollapsible;
