import React, { useState } from 'react';
import { Button, FlatList, Modal, StyleSheet, Text, View } from 'react-native';
import ScrollableModal from '../components/scrollable-modal';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const ScrollableModalScreen = () => {
	const [visible, setVisible] = useState(false);
	const [panEnabled, setPanEnabled] = useState(false);

	const handleShowModal = () => {
		setVisible(true);
	}

  const handleModalVisible = () => {
    setPanEnabled(true);
  }

	const handleModalHidden = () => {
		setVisible(false);
	}


  function Item({ title }) {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
      </View>
    );
  }

	return (
		<>
			<Button title='Show modal' onPress={handleShowModal} />
			<ScrollableModal visible={visible} onModalHidden={handleModalHidden} onModalVisible={handleModalVisible} panEnabled={panEnabled}>
      <View style={styles.list}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={item => item.id}
        />
      </View>
      </ScrollableModal>
		</>
	)
}


const styles = StyleSheet.create({
  list: {
    paddingVertical: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default ScrollableModalScreen;