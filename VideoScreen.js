import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  NativeModules,
} from 'react-native';
import pip from './modules/PIPModule';

// Получаем параметры из props
const VideoScreen = (params) => {
  console.log(params);
  const {consultationId, to, username} = params || {};
  const enterPIPMode = () => {
    if (Platform.OS === 'android') {
      pip.enterPIPModeDirectly(); // Вызов нативного метода для PIP
    } else {
      console.warn('PIP mode доступен только на Android API 26+');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Text style={styles.videoText}>Это Видео компонент</Text>
        <Text style={styles.videoText}>consultationId: {consultationId}</Text>
        <Text style={styles.videoText}>to: {to}</Text>
        <Text style={styles.videoText}>username: {username}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Перейти в режим PIP" onPress={enterPIPMode} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Выйти" onPress={() => console.log('Закрыть PIP')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  videoContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});

export default VideoScreen;
