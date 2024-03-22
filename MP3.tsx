import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import TrackPlayer, { TrackPlayerEvents, STATE_PLAYING, STATE_PAUSED, STATE_STOPPED } from 'react-native-track-player';

const MP3 = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const setupPlayer = async () => {
      await TrackPlayer.setupPlayer();
      TrackPlayer.addEventListener(TrackPlayerEvents.PLAYBACK_STATE, ({ state }) => {
        if (state === STATE_PLAYING) setIsPlaying(true);
        else setIsPlaying(false);
      });
    };
    setupPlayer();
  }, []);

  const start = async () => {
    await TrackPlayer.add({
      id: 'trackID',
      url: require('./MP3/PhaKen.mp3')
    });
    await TrackPlayer.play();
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  const stop = async () => {
    await TrackPlayer.stop();
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Button title={'Play'} onPress={start}  />
      <Button title={'Pause'} onPress={pause}  />
      <Button title={'Stop'} onPress={stop}  />
    </View>
  );
};

export default MP3;

const styles = StyleSheet.create({});