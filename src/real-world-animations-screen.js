import React, { Component } from "react";
import { Animated, SafeAreaView, View } from "react-native";

import pokemon from "./data/pokemon";
import pokemon_stats from "./data/pokemon-stats";

import Header from "./components/Header";
import CardList from "./components/CardList";
import AnimatedModal from "./components/AnimatedModal";
import BigCard from "./components/BigCard";
import { getRandomInt } from './utils';
import { HEADER_MAX_HEIGHT } from "./settings/layout";
import AnimatedHeader from "./components/AnimatedHeader";

type Props = {};
export default class App extends Component<Props> {
  state = {
    isModalVisible: false
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

  render() {
    let nativeScrollY = Animated.add(
      this.nativeScrollY,
      Platform.OS === "ios" ? HEADER_MAX_HEIGHT : 0
    );
    return (
      <View style={styles.container}>
      <AnimatedHeader
        title={"Poke-Gallery"}
        nativeScrollY={nativeScrollY}
        />
        <CardList
          data={pokemon}
          cardAction={this.cardAction}
          viewAction={this.viewAction}
          bookmarkAction={this.bookmarkAction}
          shareAction={this.shareAction}
          onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.nativeScrollY } } }]
        )}
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
          <BigCard
            title={this.state.pokemon}
            image={this.state.image}
            data={this.state.stats}
            animate={this.state.isModalVisible}
          />
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
