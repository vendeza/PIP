import React from 'react';
import {View, Text, Button, StyleSheet, NativeModules} from 'react-native';
import pip from './modules/PIPModule';

const MainScreen = () => {
  const startVideoActivity = () => {
    pip.startVideoActivity({
      consultationId: '12345',
      to: 'John Doe',
      username: 'doctor_user',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Это основной экран</Text>
      <Button title="Перейти к Видео" onPress={startVideoActivity} />
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
});

export default MainScreen;
