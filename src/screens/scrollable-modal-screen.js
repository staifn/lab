import React, { useState } from 'react';
import { Button, Modal, View } from 'react-native';
import ScrollableModal from '../components/scrollable-modal';

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
	return (
		<>
			<Button title='Show modal' onPress={handleShowModal} />
			<ScrollableModal visible={visible} onModalHidden={handleModalHidden} onModalVisible={handleModalVisible} panEnabled={panEnabled} />
		</>
	)
}

export default ScrollableModalScreen;