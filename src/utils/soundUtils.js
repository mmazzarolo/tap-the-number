/* @flow */
import Sound from 'react-native-sound'

const tap = new Sound('tap.wav', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.warn('failed to load the sound', error)
  }
})

const playTapSound = () => {
  tap.getCurrentTime((currentTime) => {
    if (currentTime === 0) {
      tap.play()
    } else {
      tap.stop()
      tap.play()
    }
  })
}

export default {
  playTapSound
}
