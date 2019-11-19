import React from 'react';
import { Animated, Button, Dimensions, Modal, PanResponder, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const OPACITY_MAX = 0.2;
const { height } = Dimensions.get('window');

class ScrollableModal extends React.Component {
  state = {
    modalHeight: 0,
    panEnabled: false
  }

  constructor(props) {
    super(props);

    this.pan = new Animated.Value(0);
    this.opacity = new Animated.Value(0);
    this.panValue = this.pan.addListener(({ value }) => this.panValue = value);

    this.modalPosition = this.pan.interpolate({
      inputRange: [- height, height - 150],
      outputRange: [- height, height - 150],
      extrapolate: 'clamp'
    })

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => this.state.panEnabled,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        console.log('pan')
        this.pan.setOffset(this.panValue)
      },
      onPanResponderMove: (e, gestureState) => {
        Animated.event([
          null, { dy: this.pan }
        ])(e, gestureState)
      },
      onPanResponderRelease: this.onPanResponderRelease,
    });
  }


  onPanResponderRelease = (e, gestureState) => {
    this.pan.flattenOffset();
    if (
      gestureState.dx === 0
      && gestureState.dy ===  0
      && gestureState.y0 < height - this.state.modalHeight
      || gestureState.dy >= this.state.modalHeight - 50
    ) {
      this.handlePress();
    } else {
      Animated.spring(this.pan, {
        toValue: 0,
      }).start();
    }
  }

	handleLayout = (e) => {
		this.setState({
      modalHeight: e.nativeEvent.layout.height
    });

    this.interpolatedOpacity = this.pan.interpolate({
      inputRange: [0, e.nativeEvent.layout.height],
      outputRange: [OPACITY_MAX, 0],
      extrapolate: 'clamp'
    })

    this.modalPosition = this.pan.interpolate({
      inputRange: [e.nativeEvent.layout.height + 150 - height, e.nativeEvent.layout.height],
      outputRange: [e.nativeEvent.layout.height + 150 - height, e.nativeEvent.layout.height],
      extrapolate: 'clamp'
    })

    this.pan.setValue(e.nativeEvent.layout.height);
    setTimeout(() => {
      this.setState({
        panEnabled: true,
      })
    }, 500)
    Animated.spring(this.pan, {
      toValue: 0,
    }).start();
	}

	handlePress = () => {
    if (!this.state.panEnabled) {
      return;
    }
    this.setState({
      panEnabled: false,
    })

    Animated.timing(this.pan, {
      toValue: this.state.modalHeight,
    }).start(() => {
      this.props.onModalHidden();
    });
	}

  render() {
    return (
      <Modal style={styles.container} transparent={true} visible={this.props.visible} onShow={this.handleModalShow}>
        <View {...this._panResponder.panHandlers}>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Animated.View style={{ height: '100%', width: '100%', backgroundColor: '#000', opacity: this.interpolatedOpacity }}></Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.modal, { top: height - this.state.modalHeight }, { transform: [{ translateY: this.modalPosition }]}]}>
            <View style={{height: 5, width: 50, backgroundColor: '#fff', position: 'absolute', marginTop: -15, alignSelf: 'center', borderRadius: 5 }} />
            <View onLayout={this.handleLayout}>
              {this.props.children}
            </View>
          </Animated.View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	modal: {
		height: '200%',
		width: '100%',
		backgroundColor: '#ffffff',
		position: 'absolute',
    borderRadius: 10
	}

})

export default ScrollableModal;
