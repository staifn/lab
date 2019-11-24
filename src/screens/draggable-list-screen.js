import React from 'react';
import { Animated, Button, View, PanResponder, Text,ScrollView, InteractionManager } from 'react-native';
const myArray = new Array(4);
const headerHeight = 44 + 40;
 class DraggableList extends React.Component {
   blueCardPosition = {
     x: 0,
     y: 0,
     width: 0,
     height: 0,
   }
   constructor(props) {
     super(props);
     this.scrollY =  new Animated.Value(0);
     this.position = new Animated.Value(0);
     this.blueCardTransition = new Animated.Value(0);

     this.blueCardTransitionValue = 0;
     this.blueCardTransition.addListener(({ value }) => this.blueCardTransitionValue = value)

     this.currentPosition = 0;
     this.positionValue = this.position.addListener(({ value }) => this.positionValue = value);
     this.scrollYValue = this.scrollY.addListener(({ value }) => {
       this.scrollYValue = value});
     this.scrollView = React.createRef();
     this.cardPosition = new Animated.Value(0);
     this.cardPositionValue = 0;
     this.cardPosition.addListener(({ value }) => {
       this.cardPositionValue = value
     });

     this._panResponder = PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.currentPosition = parseInt(this.scrollYValue);
        // alert()
        // this.scrollView.current.scrollTo({ y: 1, animated: true })
        // Animated.timing(this.position, {
        //   toValue: this.currentPosition + 500,
        //   duration: 5000
        // }).start();
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {

        if (gestureState.y0 < 200) {
          this.currentPosition -= 20;
          this.scrollView.current.scrollTo({ y: this.currentPosition, animated: false })
        }


        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        // this.position.stopAnimation(({value}) => console.log("Final Value: " + value));
        // this.currentPosition = this.positionValue;

      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    });


    this._panResponderCard = PanResponder.create({
     // Ask to be the responder:
     onStartShouldSetPanResponder: (evt, gestureState) => true,
     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
     onMoveShouldSetPanResponder: (evt, gestureState) => true,
     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

     onPanResponderGrant: (evt, gestureState) => {
      this.cardPosition.setOffset(gestureState.y0 - headerHeight -25)
      console.log('this.state.blueCardPosition', this.blueCardPosition);
      console.log('gestureState', gestureState);
     },
     onPanResponderMove: (evt, gestureState) => {
       const panPosition = this.cardPositionValue + 25;
         console.log('panPosition', panPosition)
         console.log('this.blueCardTransitionValue',this.blueCardTransitionValue)
       if (panPosition > this.blueCardPosition.y + this.blueCardPosition.height/2 - 10
          && panPosition < this.blueCardPosition.y + this.blueCardPosition.height/2
        ) {
          console.log('up')
          this.blueCardTransition.setValue(this.blueCardTransitionValue-this.blueCardPosition.height);
          this.blueCardPosition = {
            ...this.blueCardPosition,
            y: this.blueCardPosition.y - this.blueCardPosition.height,
          }
        } else if (panPosition > this.blueCardPosition.y + this.blueCardPosition.height/2
          && panPosition < this.blueCardPosition.y + this.blueCardPosition.height/2 + 10
        ) {
          console.log('down')
          this.blueCardTransition.setValue(this.blueCardTransitionValue+this.blueCardPosition.height);
          this.blueCardPosition = {
            ...this.blueCardPosition,
            y: this.blueCardPosition.y + this.blueCardPosition.height,
          }
        }
      Animated.event([
        null, { dy: this.cardPosition }
      ])(evt, gestureState)
     },
     onPanResponderTerminationRequest: (evt, gestureState) => true,
     onPanResponderRelease: (evt, gestureState) => {
       this.cardPosition.flattenOffset();

     },
     onPanResponderTerminate: (evt, gestureState) => {
       // Another component has become the responder, so this gesture
       // should be cancelled
       // return true;
     },
     onShouldBlockNativeResponder: (evt, gestureState) => {
       // Returns whether this component should block native components from becoming the JS
       // responder. Returns true by default. Is currently only supported on android.
       return true;
     },
   });
   }

   handleLayout = (evt) => {
     console.log('evt', evt.nativeEvent.layout)
     const position = evt.nativeEvent.layout;
     this.setState({
       position
     });


   }

   handleLayoutBlueCard = (evt) => {
     const position = evt.nativeEvent.layout;
     this.blueCardPosition = position;
   }

   render() {
    return (
      <View style={{ height: '100%', width: '100%'}}>
        {/*<ScrollView ref={this.scrollView}
          onScroll={Animated.event(
           // scrollX = e.nativeEvent.contentOffset.x
           [{ nativeEvent: {
                contentOffset: {
                  y: this.scrollY
                }
              }
            }]
         )}
        >*/}
          <View style={{ height: 5000, width: '100%'}} {...this._panResponderCard.panHandlers}>
            <Animated.View
              onLayout={this.handleLayout}
              style={[
                { height: 50, width: 300, backgroundColor: 'red'},
                { transform: [{ translateY: this.cardPosition }] }]}
              />

              <Animated.View style={{ height: 60, width: '100%', backgroundColor: 'blue', transform: [{ translateY: this.blueCardTransition }] }} onLayout={this.handleLayoutBlueCard} />
          </View>
            <View style={{ height: 5000, width: '100%', backgroundColor: 'yellow'}}>
              <Text>hello</Text>
            </View>
        {/*</ScrollView>*/}
      </View>
    )
  }
};

export default DraggableList
