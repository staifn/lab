import React, { useState, useEffect } from 'react';
import { Animated, Button, Dimensions, PanResponder, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

const { height } = Dimensions.get('window');
const ScrollableModal = ({ onModalHidden }) => {
	const [modalHeight, setModalHeight] = useState(0);
	const [showModal, toggleModal] = useState(false);
	const pan = new Animated.ValueXY(0);
	const opacity = new Animated.Value(0);
	const modalPosition = new Animated.Value(0);
	let panValue = pan.addListener(value => panValue = value);

	_panResponder = PanResponder.create({
		onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
		onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
		onPanResponderGrant: (e, gestureState) => {
			pan.setOffset({ x: panValue.x, y: panValue.y})
		},
		onPanResponderMove: (e, gestureState) => {
			Animated.event([
				null, { dy: pan.y }
			])(e, gestureState)
		}, // Creates a function to handle the movement and set offsets
		onPanResponderRelease: (e, gestureState) => {
			pan.flattenOffset();
			if (gestureState.dx === 0 && gestureState.dy === 0) {
				handlePress();
			} else {
				Animated.timing(pan, {
					toValue: {x: 0, y: -modalHeight}
				}).start();
			}
			 // Flatten the offset so it resets the default positioning
			
		}
	});

	handleLayout = (e) => {
		setModalHeight(e.nativeEvent.layout.height);
	}

	handlePress = () => {
		Animated.parallel([
			Animated.timing(pan, {
				toValue: { x: 0, y: modalHeight }
			}),
			Animated.timing(opacity, {
				toValue: 0,
			})
		]).start(onModalHidden);
	}

	useEffect(() => {
		Animated.parallel([
			Animated.timing(pan, {
				toValue: {x: 0, y: -modalHeight}
			}),
			Animated.timing(opacity, {
				toValue: 0.5,
			})
		]).start();
	})
	
	return (
		<View style={styles.container} {..._panResponder.panHandlers}>
			<TouchableWithoutFeedback>
				<Animated.View style={{ height: '100%', width: '100%', backgroundColor: '#000', opacity }}></Animated.View>
			</TouchableWithoutFeedback>
			<Animated.View style={[styles.modal, { top: height}, { transform: [{ translateY: pan.y }]}]}>
				<View style={{ height: 100, backgroundColor: '#000'}} onLayout={handleLayout}></View>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		position: 'absolute',
		zIndex: 1,
		height: '100%',
		width: '100%',
	},
	modal: {
		height: '200%',
		width: '100%',
		backgroundColor: '#ffffff',
		position: 'absolute',
	}

})

export default ScrollableModal;