import React, { useState } from 'react';
import { Button, View } from 'react-native';
import ScrollableModal from '../components/scrollable-modal';

const ScrollableModalScreen = () => {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => {
		setShowModal(true);
	}

	const handleModalHidden = () => {
		setShowModal(false);
	}
	return (
		<>
			<Button title='Show modal' onPress={handleShowModal} />
			{showModal && <ScrollableModal onModalHidden={handleModalHidden} />}
		</>
	)
}

export default ScrollableModalScreen;