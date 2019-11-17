import React, { useState, useEffect } from 'react';
import { Animated, Button, Dimensions, Modal, PanResponder, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const OPACITY_MAX = 0.2;
const { height } = Dimensions.get('window');
const ScrollableModal = ({ onModalHidden, visible }) => {
	const [modalHeight, setModalHeight] = useState(0);
	const [showModal, toggleModal] = useState(false);
	const pan = new Animated.Value(0);
	const opacity = new Animated.Value(0);
	const interpolatedOpacity = pan.interpolate({
		inputRange: [-modalHeight, 0],
		outputRange: [OPACITY_MAX, 0],
		extrapolate: 'clamp'
	})
	let panValue = pan.addListener(({ value }) => panValue = value);

	_panResponder = PanResponder.create({
		onMoveShouldSetResponderCapture: () => true,
		onMoveShouldSetPanResponderCapture: () => true,
    onStartShouldSetPanResponder: () => true,
		onPanResponderGrant: (e, gestureState) => {
			pan.setOffset(panValue)
		},
		onPanResponderMove: (e, gestureState) => {
			Animated.event([
				null, { dy: pan }
			])(e, gestureState)
		},
		onPanResponderRelease: onPanResponderRelease,
	});

  function onPanResponderRelease(e, gestureState) {
    pan.flattenOffset();
    if (gestureState.dx === 0 && gestureState.dy ===  0 || gestureState.dy >= modalHeight - 30) {
      handlePress();
    } else {
      Animated.timing(pan, {
        toValue: -modalHeight,
      }).start();
    }
  }

	handleLayout = (e) => {
		setModalHeight(e.nativeEvent.layout.height);
	}

	handlePress = () => {
		Animated.parallel([
			Animated.timing(pan, {
				toValue: 0,
			}),
			Animated.timing(opacity, {
				toValue: 0,
			})
		]).start(() => {
      onModalHidden();
    });
	}

  handleModalShow = () => {
    Animated.parallel([
			Animated.timing(pan, {
				toValue: -modalHeight,
			}),
			Animated.timing(opacity, {
				toValue: OPACITY_MAX,
			})
		]).start(); 
  }


	return (
		<Modal style={styles.container} transparent={true} visible={visible} onShow={handleModalShow}>
			<View {..._panResponder.panHandlers}>
				<TouchableWithoutFeedback>
					<Animated.View style={{ height: '100%', width: '100%', backgroundColor: '#000', opacity: interpolatedOpacity }}></Animated.View>
				</TouchableWithoutFeedback>
				<Animated.View style={[styles.modal, { top: height }, { transform: [{ translateY: pan }]}]}>
					<View style={{ height: 300, backgroundColor: '#000'}} onLayout={handleLayout}></View>
				</Animated.View>
			</View>
		</Modal>
	)
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