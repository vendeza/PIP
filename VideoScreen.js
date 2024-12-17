import React from 'react';
import { View, Text, Button, StyleSheet, Platform, NativeModules } from 'react-native';

const { PIPModule } = NativeModules; // Импортируем нативный модуль

const VideoScreen = () => {
  const enterPIPMode = () => {
    if (Platform.OS === 'android' && PIPModule) {
      PIPModule.enterPIPModeDirectly(); // Вызов нативного метода для PIP
    } else {
      console.warn('PIP mode доступен только на Android API 26+');
    }
  };

  return (
      <View style={styles.container}>
        {/* Видео контейнер */}
        <View style={styles.videoContainer}>
          <Text style={styles.videoText}>Это Видео компонент</Text>
        </View>

        {/* Кнопка для PIP */}
        <View style={styles.buttonContainer}>
          <Button
              title="Перейти в режим PIP"
              onPress={enterPIPMode}
          />
        </View>

        {/* Вторая кнопка для выхода */}
        <View style={styles.buttonContainer}>
          <Button
              title="Выйти"
              onPress={() => console.log('Закрыть PIP')}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Убедитесь, что контейнер занимает весь экран
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d2d072', // Фон черный
  },
  videoContainer: {
    width: '100%', // Занимает 100% ширины экрана
    height: 250, // Высота 250 пикселей
    backgroundColor: '#fa5656', // Серый фон для визуализации контейнера
    justifyContent: 'center', // Центровка текста по вертикали
    alignItems: 'center', // Центровка текста по горизонтали
  },
  videoText: {
    color: 'white', // Белый текст
    fontSize: 16,  // Размер текста
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%', // Ширина кнопки 80% от ширины экрана
  }
});

export default VideoScreen;
