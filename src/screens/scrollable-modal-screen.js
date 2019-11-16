import React, { useState } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Header } from 'react-navigation-stack';

console.log('Header', Header.HEIGHT)
const { height } = Dimensions.get('window');
const ScrollableModal = () => {
	const [modalHeight, setModalHeight] = useState(0);
	const [showModal, toggleModal] = useState(true);
	const panY = new Animated.Value(0);
	const opacity = new Animated.Value(0.5);
	let panValue = panY.addListener(value => panValue = value);

	_panResponder = PanResponder.create({
		onMoveShouldSetResponderCapture: () => true, //Tell iOS that we are allowing the movement
		onMoveShouldSetPanResponderCapture: () => true, // Same here, tell iOS that we allow dragging
		onPanResponderGrant: (e, gestureState) => {
		},
		onPanResponderMove: (e, gestureState) => {
			Animated.event([
				null, { dy: panY }
			])(e, gestureState)
		}, // Creates a function to handle the movement and set offsets
		onPanResponderRelease: (e, gestureState) => {
			console.log('gestureState', gestureState)
			if (gestureState.dx === 0 && gestureState.dy === 0) {
				handlePress();
			} else {
				Animated.timing(panY, {
					toValue: 0
				}).start();
			}
			// this._animatedValue.flattenOffset(); // Flatten the offset so it resets the default positioning
			
		}
	});

	handleLayout = (e) => {
		setModalHeight(e.nativeEvent.layout.height)
	}

	handlePress = () => {
		Animated.parallel([
			Animated.timing(panY, {
				toValue: (modalHeight)
			}),
			Animated.timing(opacity, {
				toValue: 0,
			})
		]).start();
	}
	
	return (
		<View style={styles.container} {..._panResponder.panHandlers}>
			<TouchableWithoutFeedback>
				<Animated.View style={{ height: '100%', width: '100%', backgroundColor: '#000', opacity }}></Animated.View>
			</TouchableWithoutFeedback>
			<Animated.View style={[styles.modal, { top: height - modalHeight - 24 - Header.HEIGHT}, { transform: [{ translateY: panY }]}]}>
				<View style={{ height: 100, backgroundColor: '#000'}} onLayout={handleLayout}></View>
			</Animated.View>
		</View>
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