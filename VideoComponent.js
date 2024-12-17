import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
  Platform,
  Button,
} from 'react-native';
import React from 'react';
const {PIPModule} = NativeModules; // Импортируем нативный модуль

export default function VideoComponent() {
  const startPIP = () => {
    if (Platform.OS === 'android' && PIPModule) {
      PIPModule.startPIPMode(); // Вызов нативного метода
    } else {
      console.warn('PIP mode is only supported on Android API 26+');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Видео компонент
      </Text>
      <Button title="Включить режим PIP" onPress={startPIP} />
    </View>
  );
}

const styles = StyleSheet.create({});
