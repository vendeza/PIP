import React, {useRef} from 'react';
import {
  View,
  Button,
  StyleSheet,
  NativeModules,
  Platform,
  Text,
} from 'react-native';
import MainScreen from './MainScreen';
import VideoScreen from './VideoScreen';
import {enableScreens} from 'react-native-screens';
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

enableScreens(); // Включение оптимизации экранов

const Stack = createStackNavigator();
const App = () => {
  return (

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          {/*<Stack.Screen name="VideoScreen" component={VideoScreen} />*/}
        </Stack.Navigator>
      </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#dedede',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '90%',
    height: '90%',
    backgroundColor: 'red',
  },
});

export default App;
