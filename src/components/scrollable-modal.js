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

    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => this.state.panEnabled,
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
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
    if (gestureState.dx === 0 && gestureState.dy ===  0 || gestureState.dy >= this.state.modalHeight - 30) {
      this.handlePress();
    } else {
      Animated.timing(this.pan, {
        toValue: -this.state.modalHeight,
      }).start();
    }
  }

	handleLayout = (e) => {
		this.setState({
      modalHeight: e.nativeEvent.layout.height
    });

    this.interpolatedOpacity = this.pan.interpolate({
      inputRange: [-e.nativeEvent.layout.height, 0],
      outputRange: [OPACITY_MAX, 0],
      extrapolate: 'clamp'
    })
	}

	handlePress = () => {
    this.setState({
      panEnabled: false,
    })

		Animated.parallel([
			Animated.timing(this.pan, {
				toValue: 0,
			}),
		]).start(() => {
      this.props.onModalHidden();
    });
	}

  handleModalShow = () => {
    Animated.parallel([
			Animated.timing(this.pan, {
				toValue: -this.state.modalHeight,
			}),
		]).start(() => {
      // this.props.onModalVisible();
      this.setState({
        panEnabled: true,
      })
    }); 
  }

  render() {
    return (
      <Modal style={styles.container} transparent={true} visible={this.props.visible} onShow={this.handleModalShow}>
        <View {...this._panResponder.panHandlers}>
          <TouchableWithoutFeedback>
            <Animated.View style={{ height: '100%', width: '100%', backgroundColor: '#000', opacity: this.interpolatedOpacity }}></Animated.View>
          </TouchableWithoutFeedback>
          <Animated.View style={[styles.modal, { top: height }, { transform: [{ translateY: this.pan }]}]}>
            <View style={{ height: 100, backgroundColor: '#000'}} onLayout={this.handleLayout}></View>
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
	}

})

export default ScrollableModal;