import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, NativeModules} from 'react-native';
import pip from './modules/PIPModule';
import {useNavigation} from '@react-navigation/native';
import {Portal} from "@gorhom/portal";
import DraggableCard from "./DraggableCard";


const MainScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const startVideoActivity = () => {
    navigation.navigate('VideoScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Это основной экран</Text>
      <Button title="Перейти к Видео" onPress={startVideoActivity} />

      <Button title="Показать модальное окно" onPress={showModal} />
      <Button
        title="Перейти на экран Профиль"
        onPress={() => navigation.navigate('Profile')}
      />

      {isModalVisible && (
        <Portal>
          <View style={styles.modalOverlay} pointerEvents="box-none">
            <DraggableCard />
          </View>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },

  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default MainScreen;
