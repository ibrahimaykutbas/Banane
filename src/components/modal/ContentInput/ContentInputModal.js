import React, {useState} from 'react';
import {View, TextInput} from 'react-native';

import Modal from 'react-native-modal';

import styles from './ContentInputModal.style';

import Button from '../../Button/Button';

const ContentInputModal = ({visible, onClose, onSend}) => {
  const [text, setText] = useState(null);

  const handleSend = () => {
    if (!text) {
      return;
    }
    onSend(text);
    setText(null);
  };
  return (
    <Modal
      style={styles.modal}
      isVisible={visible}
      swipeDirection="left"
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Darla hadi milleti.."
            placeholderTextColor="#808e95"
            color="black"
            onChangeText={setText}
            multiline
          />
        </View>
        <Button text="Gönder" onPress={handleSend} />
      </View>
    </Modal>
  );
};

export default ContentInputModal;
