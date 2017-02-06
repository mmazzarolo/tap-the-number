/* @flow */
import ReactNativeSound from 'react-native-sound';

const initializeSound = (name: string) => {
  return new ReactNativeSound(name, ReactNativeSound.MAIN_BUNDLE, err => {
    if (err) {
      console.warn('failed to load the sound', err);
    }
  });
};

const playSound = sound => {
  sound.getCurrentTime(currentTime => {
    if (currentTime === 0) {
      sound.play();
    } else {
      sound.stop();
      sound.play();
    }
  });
};

const successSound = initializeSound('success.wav');
const failureSound = initializeSound('failure.wav');

export default {
  playSuccessSound: () => playSound(successSound),
  playFailureSound: () => playSound(failureSound),
};
