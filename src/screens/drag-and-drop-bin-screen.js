import React, { Component } from "react";
import { Animated, SafeAreaView, View } from "react-native";

import pokemon from "../data/pokemon";
import pokemon_stats from "../data/pokemon-stats";

import Header from "../components/Header";
import CardList from "../components/CardList2";
import AnimatedModal from "../components/AnimatedModal";
import BigCard from "../components/BigCard";
import { getRandomInt } from '../utils';
import { HEADER_MAX_HEIGHT } from "../settings/layout";
import AnimatedHeader from "../components/AnimatedHeader";
import DropArea from '../components/DropArea';


let updated_pokemon = pokemon.map(item => {
	item.isVisible = true;
	return item;
});
type Props = {};
export default class App extends Component<Props> {
  state = {
    isModalVisible: false,
		pokemon: updated_pokemon, // change pokemon to updated_pokemon
		isDropAreaVisible: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "", // empty because we're using the label inside the AnimatedHeader
      headerStyle: {
        elevation: 0, // only applied to Android to remove the shadow in the header
        shadowOpacity: 0, // for removing the shadow in the header
        backgroundColor: "#B4A608"
      },
      headerTitleStyle: {
        color: "#FFF"
      }
    };
  };


  constructor(props) {
    super(props);
    this.pokemon_stats = [];

    this.nativeScrollY = new Animated.Value(
      Platform.OS === "ios" ? -HEADER_MAX_HEIGHT : 0
    );
  }

  cardAction = () => {};

  viewAction = (pokemon, image) => {
    this.pokemon_stats = [];
    pokemon_stats.forEach(item => {
      this.pokemon_stats.push({
        label: item,
        value: getRandomInt(25, 150)
      });
    });

    this.setState({
      pokemon,
      image,
      stats: this.pokemon_stats,
      isModalVisible: true
    });
  };

  bookmarkAction = () => {};

  shareAction = (pokemon, image) => {
    this.props.navigation.navigate("Share"); // add this inside the existing shareAction function
  };

	toggleDropArea = (isVisible, item) => {
		if (item) {
			let pokemon_data = [...this.state.pokemon];
			let new_pokemon_data = pokemon_data.map(item => {
				item.isVisible = !isVisible;
				return item;
			});
			let index = new_pokemon_data.findIndex(itm => itm.name == item.name);

			if (isVisible) {
				new_pokemon_data[index].isVisible = true;
			}

			this.setState({
				isDropAreaVisible: isVisible,
				pokemon: new_pokemon_data
			});
		}
	};
	setDropAreaLayout = event => {
		this.setState({
			dropAreaLayout: event.nativeEvent.layout
		});
	};
	isDropArea = gesture => {
		let dropbox = this.state.dropAreaLayout;
		const DROPAREA_MARGIN = 20;
		return (
			gesture.moveY > dropbox.y + DROPAREA_MARGIN &&
			gesture.moveY < dropbox.y + dropbox.height + DROPAREA_MARGIN &&
			gesture.moveX > dropbox.x + DROPAREA_MARGIN &&
			gesture.moveX < dropbox.x + dropbox.width + DROPAREA_MARGIN
		);
	};
	targetDropArea = isTargeted => {
		this.setState({
			isDropAreaTargeted: isTargeted
		});
	};
	removePokemon = item => {
		let pokemon_data = [...this.state.pokemon];
		let index = pokemon_data.findIndex(itm => itm.name == item.name);
		pokemon_data.splice(index, 1);

		LayoutAnimation.configureNext(animationConfig);

		this.setState({
			pokemon: pokemon_data,
		});
	};
  render() {
    let nativeScrollY = Animated.add(
      this.nativeScrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );
    return (
      <View style={styles.container}>
				<DropArea
          dropAreaIsVisible={this.state.isDropAreaVisible}
          setDropAreaLayout={this.setDropAreaLayout}
          isTargeted={this.state.isDropAreaTargeted}
        />
        <CardList
          data={updated_pokemon}
          cardAction={this.cardAction}
          viewAction={this.viewAction}
          bookmarkAction={this.bookmarkAction}
          shareAction={this.shareAction}
          onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { y: this.nativeScrollY } } }]
					)}

					scrollEnabled={!this.state.isDropAreaVisible}
					toggleDropArea={this.toggleDropArea}
					dropAreaIsVisible={this.state.isDropAreaVisible}
					isDropArea={this.isDropArea}
					targetDropArea={this.targetDropArea}
					removePokemon={this.removePokemon}
        />
        <AnimatedModal
          title={"View Pokemon"}
          visible={this.state.isModalVisible}
          onClose={() => {
            this.setState({
              isModalVisible: false
            });
          }}
        >
        </AnimatedModal>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
};
