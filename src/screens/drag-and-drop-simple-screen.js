import React, { Component } from 'react';
import {
	Animated,
	StyleSheet,
  Text,
  View,
  Image, // we want to use an image
	PanResponder,
	Switch
} from 'react-native';

class DragAndDropScreen extends Component {
	constructor(props) {
		super(props);

		this.pan = new Animated.ValueXY()
		this._value = {x: 0, y: 0};
		this.pan.addListener(value => this._value = value);
		this.state = {
			resetIconPosition: false,
		}
	}
componentWillMount() {
  this._panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: (e, gestureState) => {
			console.log('this.state.pan', this.pan);
			this.pan.setOffset({x: this._value.x, y: this._value.y});
			console.log('this.state.pan', this.pan);
    },

    onPanResponderMove: (e, gesture) => {
			console.log('this.state.pan', this.pan);
			console.log('gestureState', gesture);
				Animated.event([
				null, {dx: this.pan.x, dy: this.pan.y},
			])(e, gesture);
		},

    onPanResponderRelease: (e, {vx, vy}) => {
			if (this.state.resetIconPosition) {
				Animated.spring(this.pan, {
					toValue: { x: 0, y: 0 },
				}).start();
			} else {
				this.pan.flattenOffset();
			}
    }
  });
}
toggleResetIconPosition = () => {
	this.setState({
		resetIconPosition: !this.state.resetIconPosition,
	})
}

	render() {
  // Destructure the value of pan from the state

  // Calculate the x and y transform from the pan value
  let [translateX, translateY] = [this.pan.x, this.pan.y];

  // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
  let imageStyle = { transform: [{ translateX }, { translateY }] };
		return (
			<>
				<View style={{ alignSelf: 'flex-end'}}>
					<Switch value={this.state.resetIconPosition} onValueChange={this.toggleResetIconPosition} />
				</View>
				<View style={styles.container}>
					<Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
						<Image style={{ width: 100, resizeMode: 'contain'}} source={require('../assets/panresponder.png')} />
					</Animated.View>
				</View>
			</>
		)
	}
}

// export default () => null

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})

export default DragAndDropScreen;