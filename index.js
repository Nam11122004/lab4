/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PhotoCapture from './PhotoCapture';
import MP3 from './MP3';
import TrackPlayer from 'react-native-track-player';
AppRegistry.registerComponent(appName, () => MP3);

TrackPlayer.registerPlaybackService(() => require('./service.js'));
export async function playbackService() {
    TrackPlayer.addEventListener(Event.RemotePause,() => {
        TrackPlayer.pause();
    })
}