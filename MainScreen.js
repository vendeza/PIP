import React, {useState} from 'react';
import {Modal, Button, View, Text} from 'react-native';
import PIPModule from './PIPModule';

const MainScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
    PIPModule.setModalActive(true); // Уведомляем нативный код
  };

  const closeModal = () => {
    setModalVisible(false);
    PIPModule.setModalActive(false); // Уведомляем нативный код
  };

  return (
    <View>
      <Button title="Open Modal" onPress={openModal} />
      <Modal visible={isModalVisible} animationType="slide">
        <View>
          <Text>This is a modal!</Text>
          <Button title="Close Modal" onPress={closeModal} />
        </View>
      </Modal>
    </View>
  );
};

export default MainScreen;
