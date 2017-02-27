/* @flow */
/**
 * Simple wrapper on react-native-sound that exposes the sound effects used in the game.
 */
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
const buttonSound = initializeSound('button.wav');
const failureSound = initializeSound('failure.wav');

export default {
  playSuccessSound: () => playSound(successSound),
  playButtonSound: () => playSound(buttonSound),
  playFailureSound: () => playSound(failureSound),
};
