import React from "react";
import { Animated, Platform, ScrollView, View, FlatList } from "react-native";
import Card from "./Card";
import { HEADER_MAX_HEIGHT } from "../settings/layout";

const CardList = ({
  data,
  cardAction,
  viewAction,
  bookmarkAction,
  shareAction,
  animateStatBars,
  onScroll
}) => {

  return (
    <ScrollView
      scrollEventThrottle={1}
      style={styles.scroll}
      onScroll={onScroll}
      contentInset={{
        top: HEADER_MAX_HEIGHT
      }}
      contentOffset={{
        y: -HEADER_MAX_HEIGHT
      }}
    >
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <Card
              item={item}
              cardAction={cardAction}
              viewAction={viewAction}
              bookmarkAction={bookmarkAction}
              shareAction={shareAction}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Card
                item={item}
                cardAction={cardAction}
                viewAction={viewAction}
                bookmarkAction={bookmarkAction}
                shareAction={shareAction}
              />
            )}
            keyExtractor={item => item.id}
            numColumns={2}
          />
      </View>
    </ScrollView>
  );
};

const styles = {
  scroll: {
    flex: 1
  },
  scroll_container: {
    alignItems: "center",
    paddingTop: Platform.OS == "android" ? HEADER_MAX_HEIGHT : 0
  }
};

export default CardList;
