import React from 'react';
import {View, Text, Button, StyleSheet, NativeModules} from 'react-native';

const {PIPModule} = NativeModules;

const MainScreen = () => {
  const startVideoActivity = () => {
    if (PIPModule) {
      PIPModule.startVideoActivity();
    }
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
