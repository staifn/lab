import React, { useState } from 'react';
import { Button } from 'react-native';
import ScrollableModal from '../components/scrollable-modal';

const ScrollableModalScreen = () => {
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => {
		setShowModal(true);
	}

	const handleModalHidden = () => {
		setShowModal(false);
	}
	return !showModal
	? <Button title='Show modal' onPress={handleShowModal} />
	:<ScrollableModal onModalHidden={handleModalHidden} />
}

export default ScrollableModalScreen;