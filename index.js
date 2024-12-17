/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import VideoComponent from './VideoComponent';
import VideoScreen from "./VideoScreen";

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('VideoScreen', () => VideoScreen);
